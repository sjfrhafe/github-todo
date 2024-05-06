import { DownloadedFile } from '../github/file.model';

export type Comment = {
  start: number;
  end: number;
};

export type CommentedFile = DownloadedFile & {
  comments: Comment[];
};
