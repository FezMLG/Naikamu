# Naikamu Mobile

## Build Naming

```
naikamu-{env}-{version}
```

Ex.

```
naikamu-stg-1.0.0-beta.4.1.0
```

For `.env` file:

```bash
# To untracked file:
git update-index --assume-unchanged [<file> ...]

# To undo and start tracking again:
git update-index --no-assume-unchanged [<file> ...]
```

# Development Environment

## iOS 


## iOS Issues 
### Using node with nvm or asdf

Error: `env: node: No such file or directory`

Xcode has trouble locating the default node binary if you're using nvm or asdf.

#### How to fix?

In the console run:
```shell
ln -s $(which node) /usr/local/bin/node
```

Cause of the issue: Sentry

Documentation: https://docs.sentry.io/platforms/react-native/troubleshooting/#using-node-with-nvm-or-volta