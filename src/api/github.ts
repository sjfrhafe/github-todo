export class GithubApi {
  constructor(private readonly token: string) {}

  searchTodoInRepository = (repository: string) => {
    const url = `https://api.github.com/search/code?q=todo+in:file+repo:${repository}`;

    return fetch(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then((response) => response.json());
    // .then((data) => data.items);
  };

  fetchFile = (url: string) => {
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    }).then((response) => response.json());
  };
}
