# CommentBot

> A GitHub App built with [Probot](https://github.com/probot/probot)

A Simple Comment Bot that just does one thing: 
- Checks usage of @username _A or @username _a in a Issue or PR comment
- Remove existing assignees of the Issue/PR
- Assign the current Issue/PR to @username

Install from GitHub Apps: https://github.com/apps/assignee-bot

## Setup

```sh
# Install dependencies
npm install

# Run with hot reload
npm run build:watch

# Compile and run
npm run build
npm run start
```

## Contributing

If you have suggestions for how CommentBot could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[MIT](LICENSE) © 2020 Vipul A M
