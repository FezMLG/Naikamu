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

# Required Local Files

These files contain secrets and are **not tracked in git** (see root `.gitignore`).
Get them from a maintainer and place them at the paths below before building.

## Development

| File | Purpose |
|------|---------|
| `android/app/google-services.json` | Firebase config for Android (all flavors) |
| `ios/Dev/GoogleService-Info.plist` | Firebase config for the `NaikamuDev` iOS target |
| `ios/GoogleService-Info.plist` | Firebase config for the `NaikamuStg` iOS target |
| `ios/Prod/GoogleService-Info.plist` | Firebase config for the `Naikamu` (production) iOS target |

`.env`, `.env.development`, `.env.staging`, `.env.production` are tracked and hold non-secret config
(`ENV`, `API_URL`, `SENTRY_DSN`). Put local overrides in `.env*.local` files, which are ignored.

## Release

Everything from [Development](#development), plus:

| File | Purpose |
|------|---------|
| `android/sentry.properties` | Sentry source map / debug symbol upload for Android (`defaults.url`, `defaults.org`, `defaults.project`, `auth.token`) |
| `ios/sentry.properties` | Same as above, used by the Xcode dSYM upload build phase |
| `android/app/gradle.properties` | Release signing: `MYAPP_UPLOAD_STORE_FILE`, `MYAPP_UPLOAD_KEY_ALIAS`, `MYAPP_UPLOAD_STORE_PASSWORD`, `MYAPP_UPLOAD_KEY_PASSWORD` |
| `android/app/<name>.keystore` | Upload keystore referenced by `MYAPP_UPLOAD_STORE_FILE` |
| Google Play service account JSON | Path set in `json_key_file` in `android/fastlane/Appfile`, needed for fastlane uploads |

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