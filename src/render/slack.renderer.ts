import { Comment, CommentedFile } from '../extractor/commentedFile';
import { RenderMethod } from './render.interface';

const multilineCodeBlock = (content: string) =>
  `${'\n```\n'}${content}${'\n```\n'}`;

const concatLinesWithNumbers = (lines: string[], startLine: number): string => {
  return lines
    .map((line, index) => `${startLine + index + 1}|    ${line}`)
    .join('\n');
};

const renderOne = (commentedFile: CommentedFile) => {
  let markdown = '';

  markdown += `<${commentedFile.url}|${commentedFile.name}>`;

  markdown += multilineCodeBlock(
    commentedFile.comments
      .map((comment: Comment) =>
        concatLinesWithNumbers(
          commentedFile.lines.slice(comment.start, comment.end),
          comment.start,
        ),
      )
      .join('\n...\n'),
  );

  return {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: markdown,
    },
  };
};

export const render: RenderMethod = (
  commentedFiles: CommentedFile[],
): string => {
  const slackMessage = {
    blocks: commentedFiles.map(renderOne),
  };

  return JSON.stringify(slackMessage);
};
