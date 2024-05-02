import { DownloadedFile, TargetFile } from './file.model';
import { GithubApiClient } from './github.client';

export const downloadSaga = async (
  githubToken: string,
  files: TargetFile[],
): Promise<DownloadedFile[]> => {
  const githubApi = new GithubApiClient(githubToken);

  const downloadedFiles: DownloadedFile[] = await Promise.all(
    files.map(async (file) => {
      const content = await githubApi.fetchFile(file.url);
      return { ...file, content, lines: content.split('\n') };
    }),
  );

  return downloadedFiles;
};
