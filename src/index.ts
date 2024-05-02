import { getInput, setFailed, setOutput } from '@actions/core';
import { context } from '@actions/github';
import { CommentedFile } from './extractor/commentedFile';
import { todoExtractSaga } from './extractor/extract.saga';
import { downloadSaga } from './github/download.saga';
import { searchSaga } from './github/search.saga';
import { markdownSaga } from './markdown/markdown.saga';

const run = async (): Promise<void> => {
  try {
    const todoKeyword = getInput('todo-keyword');
    const commentStyle = getInput('comment-style');
    const ghToken = getInput('github-token');
    const repository = `${context.repo.owner}/${context.repo.repo}`;

    console.log(
      `Starting todo action with todo-keyword: ${todoKeyword} and comment-style: ${commentStyle} in repository: ${repository}`,
    );

    const files = await searchSaga(
      ghToken,
      'sipgate/project-platypus',
      todoKeyword,
    );
    const downloadedFiles = await downloadSaga(ghToken, files);

    const commentedFiles: CommentedFile[] = downloadedFiles.map((file) =>
      todoExtractSaga(file, 3, todoKeyword, commentStyle),
    );

    const markdown = commentedFiles
      .filter((commentedFile) => commentedFile.comments.length > 0)
      .map((commentedFile) => markdownSaga(commentedFile))
      .join('\n\n');

    setOutput('code-snippets', markdown);
  } catch (error: unknown) {
    console.log(error);
    setFailed('something went wrong');
  }
};

run();
