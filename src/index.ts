import { getInput, setFailed, setOutput } from '@actions/core';
import { context } from '@actions/github';
import { CommentedFile } from './extractor/commentedFile';
import { todoExtractSaga } from './extractor/extract.saga';
import { downloadSaga } from './github/download.saga';
import { searchSaga } from './github/search.saga';
import { Flavor } from './render/flavor.enum';
import { RenderMethod } from './render/render.interface';

const getRenderMethod = async (flavor: string): Promise<RenderMethod> => {
  switch (flavor) {
    case Flavor.MARKDOWN:
      return (await import('./render/markdown.renderer')).render;
    case Flavor.SLACK:
      return (await import('./render/slack.renderer')).render;
    default:
      throw new Error('Invalid flavor');
  }
};

const run = async (): Promise<void> => {
  try {
    const todoKeyword = getInput('todo-keyword');
    const commentStyle = getInput('comment-style');
    const ghToken = getInput('github-token');
    const flavor = getInput('flavor');
    const repository = `${context.repo.owner}/${context.repo.repo}`;

    if (!todoKeyword || !commentStyle || !ghToken || !flavor) {
      throw new Error('Missing required input');
    }

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

    const render = await getRenderMethod(flavor);

    const markdown = render(
      commentedFiles.filter(
        (commentedFile) => commentedFile.comments.length > 0,
      ),
    );

    setOutput('code-snippets', markdown);
  } catch (error: unknown) {
    console.log(error);
    setFailed('something went wrong');
  }
};

run();
