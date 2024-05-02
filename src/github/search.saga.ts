import { TargetFile } from './file.model';
import { GithubApiClient } from './github.client';

export const searchSaga = async (
  githubToken: string,
  repoName: string,
  todoKeyword: string,
): Promise<TargetFile[]> => {
  const githubApi = new GithubApiClient(githubToken);

  const respondedItems = (await githubApi.searchTodoInRepository(
    repoName,
    todoKeyword,
  )) satisfies TargetFile[];

  return respondedItems.map((item: TargetFile) => ({
    name: item.name,
    path: item.path,
    url: item.url,
    html_url: item.html_url,
    file: item.file,
  }));
};
