import { getInput, setFailed, setOutput } from '@actions/core';
import { context } from '@actions/github';

try {
  const todoKeyword = getInput('todo-keyword');
  const commentStyle = getInput('comment-style');
  const token = getInput('github-token');
  console.log(
    `Starting todo action with todo-keyword: ${todoKeyword} and comment-style: ${commentStyle}`,
  );

  setOutput('code-snippets', 'hello world');
  //   const payload = JSON.stringify(context.payload, undefined, 2);
  //   console.log(`The event payload: ${payload}`);
} catch (error: unknown) {
  setFailed('something went wrong');
}
