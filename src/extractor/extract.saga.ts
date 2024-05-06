import { DownloadedFile } from '../github/file.model';
import { Comment } from './commentedFile';

const checkIfComment = (line: string, commentStyle: string) => {
  const commentStyles = commentStyle.split(',').map((style) => style.trim());

  return commentStyles.some((style) => line.includes(style));
};

const checkIfTodo = (line: string, todoKeyword: string) => {
  return line.toUpperCase().includes(todoKeyword.toUpperCase());
};

const getTodoLineIndexes = (
  content: string,
  todoKeyword: string,
  commentStyle: string,
) => {
  const lines = content.split('\n');

  return lines.reduce<number[]>((acc, line, index) => {
    if (checkIfComment(line, commentStyle) && checkIfTodo(line, todoKeyword)) {
      acc.push(index);
    }
    return acc;
  }, []);
};

const getBoundaries = (index: number, radius: number, length: number) => {
  const start = Math.max(0, index - radius);
  const end = Math.min(length, index + radius + 1);

  return {
    start,
    end,
  };
};

export const todoExtractSaga = (
  file: DownloadedFile,
  radius: number,
  todoKeyword: string,
  commentStyle: string,
) => {
  const todoLineIndexes = getTodoLineIndexes(
    file.content,
    todoKeyword,
    commentStyle,
  );

  const comments: Comment[] = [];

  for (const index of todoLineIndexes) {
    const { start, end } = getBoundaries(index, radius, file.lines.length);

    const collision = comments.find((comment) => comment.end >= start);

    if (collision) {
      collision.end = end;
      continue;
    }

    comments.push({
      start,
      end,
    });
  }

  return {
    ...file,
    comments,
  };
};
