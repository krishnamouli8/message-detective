# Message Detective

A small TypeScript tool to scan and detect suspicious or sensitive content in messages (chat logs, emails, support tickets, etc.). Use it as a library in your app or run simple scans from the command line.

## Quick start

Clone and install:
```bash
git clone https://github.com/krishnamouli8/message-detective.git
cd message-detective
npm install
```

Build and run (example):
```bash
npm run build
npm start
# or, if there's a CLI:
# npx message-detective scan path/to/file.txt
```

## Config

Add or edit configuration to enable/disable detectors, add custom regex rules, or change output formats (json/text). Typical config file: config.yml or config.json.

## Development

- Run the TypeScript watcher: npm run dev
- Run tests: npm test
- Lint: npm run lint

## Contributing

Fork, create a branch, add code/tests, and open a pull request. Keep changes small and include tests for new features.

## License & Contact

MIT — see LICENSE.  
Maintainer: @krishnamouli8
