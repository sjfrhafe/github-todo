export class GithubApiClient {
  constructor(private readonly token: string) {}

  searchTodoInRepository = (repository: string, todoKeyword: string) => {
    const url = `https://api.github.com/search/code?q=${todoKeyword}+in:file+repo:${repository}`;

    return fetch(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => data.items);
  };

  fetchFile = (url: string) => {
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => data.content)
      .then((content) => Buffer.from(content, 'base64').toString('utf-8'));
  };
}
