import { getInput, setFailed, setOutput } from '@actions/core';
import { context } from '@actions/github';
import { GithubApi } from './api/github';

const run = async (): Promise<void> => {
  try {
    //gathering facts
    //todo improve something
    const todoKeyword = getInput('todo-keyword');
    const commentStyle = getInput('comment-style');
    const token = getInput('github-token');
    const repository = context.repo.repo;

    console.log(
      `Starting todo action with todo-keyword: ${todoKeyword} and comment-style: ${commentStyle} in repository: ${repository}`,
    );

    //fetching data from github
    const githubApi = new GithubApi(token);

    const searchResults = await githubApi.searchTodoInRepository(repository);

    console.log('searchResults', searchResults);

    setOutput('code-snippets', 'hello world');
  } catch (error: unknown) {
    setFailed('something went wrong');
  }
};

run();
