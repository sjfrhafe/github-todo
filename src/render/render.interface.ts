import { CommentedFile } from '../extractor/commentedFile';

export type RenderMethod = (commentedFiles: CommentedFile[]) => string;
