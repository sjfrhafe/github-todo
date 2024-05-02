export type TargetFile = {
  file: string;
  path: string;
  url: string;
  html_url: string;
  name: string;
};

export type DownloadedFile = TargetFile & {
  content: string;
  lines: string[];
};
