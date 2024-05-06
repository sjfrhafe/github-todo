# Github Todo Action

This github action uses the Github api to search for todos in the current repo and converts them to markdown.

## Basic usage

```yaml
on:
  schedule:
    - cron: '0 0 * * *'
  workflow_dispatch:

jobs:
  todo-job:
    runs-on: ubuntu-latest
    name: Todo Routine
    steps:
      - name: Analyse Todos
        id: todo-action
        uses: sjfrhafe/github-todo@main
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
      - name: Do something with markdown
        run: echo ${{ steps.todo-action.outputs.code-snippets }}
```

## Configure Todo filter

You can customize the comment style and the todo keyword to adapt the search to your needs.

```yaml
on:
  schedule:
    - cron: '0 0 * * *'
  workflow_dispatch:

jobs:
  todo-job:
    runs-on: ubuntu-latest
    name: Todo Routine
    steps:
      - name: Analyse Todos
        id: todo-action
        uses: sjfrhafe/github-todo@main
        with:
          todo-keyword: 'todo'
          comment-style: '//, #, /*, *, */'
          github-token: ${{ secrets.GITHUB_TOKEN }}
      - name: Do something with markdown
        run: echo ${{ steps.todo-action.outputs.code-snippets }}
```

## Examples (Slack)

You can specify slack as a flavor. Then the output is not normal markdown but the slack markdown style wrapped in a slack block kit json.

[See Slacks block kit reference. ](https://api.slack.com/block-kit)

```yaml
on:
  schedule:
    - cron: '0 0 * * *'
  workflow_dispatch:

jobs:
  todo-job:
    runs-on: ubuntu-latest
    name: Todo Routine
    steps:
      - name: Analyse Todos
        id: todo-action
        uses: sjfrhafe/github-todo@main
        with:
          flavor: 'slack'
          github-token: ${{ secrets.GITHUB_TOKEN }}
      - name: Send Todos to Slack
        uses: slackapi/slack-github-action@v1.26.0
        with:
          payload: ${{ steps.todo-action.outputs.code-snippets }}
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
          SLACK_WEBHOOK_TYPE: INCOMING_WEBHOOK
```
