NaikamuTV is an Expo (SDK 57) app built on [React Native TV](https://github.com/react-native-tvos/react-native-tvos) (`react-native-tvos@0.86`), targeting Android TV only (tvOS is not supported for now). See the [Expo TV guide](https://docs.expo.dev/guides/building-for-tv/).

The `android/` folder is **generated** (Continuous Native Generation) and not tracked in git. Native changes belong in `app.json`, config plugins (`plugins/`) or local Expo modules (`modules/`):

- `@react-native-tvos/config-tv` (`isTV: true`) retargets the native project to Android TV.
- `modules/home-screen-channel` is the Android TV home screen channel native module (receiver and EPG permission come from its manifest).
- `plugins/withAndroidTvExtras.js` wires `react-native-config` (`dotenv.gradle`) and release signing into `android/app/build.gradle`.

This app installs its own `node_modules` (no workspaces), so it uses `react-native-tvos` while `apps/mobile` keeps stock React Native.

# Required Local Files

These files contain secrets and are **not tracked in git**.
Get them from a maintainer and place them at the paths below before running `yarn prebuild`.

**Development**

| File | Purpose |
|------|---------|
| `google-services.json` | Firebase config for Android |

`.env` is tracked and holds non-secret config (`APP_ENV`, `API_URL`). Put local overrides in `.env*.local` files, which are ignored.

**Release** (in addition to the above)

| File | Purpose |
|------|---------|
| `credentials/android/gradle.properties` | Release signing: `MYAPP_UPLOAD_STORE_FILE`, `MYAPP_UPLOAD_KEY_ALIAS`, `MYAPP_UPLOAD_STORE_PASSWORD`, `MYAPP_UPLOAD_KEY_PASSWORD` |
| `credentials/android/<name>.keystore` | Upload keystore referenced by `MYAPP_UPLOAD_STORE_FILE` |

Everything in `credentials/android/` is copied into `android/app/` on prebuild. Sentry source map upload reads `SENTRY_AUTH_TOKEN` from the environment.

# Getting Started

```bash
yarn            # install dependencies
yarn prebuild   # generate android/ for TV (EXPO_TV=1 expo prebuild --clean --platform android)
yarn start      # start Metro
yarn android    # Android TV emulator (API 31+)
```

# Release

The app version lives only in `app.json`: `expo.version` (version name) and `expo.android.versionCode` (integer, bump on every release).

```bash
yarn apk:release:stg    # android/app/build/outputs/apk/release/naikamutv-stg-r<versionCode>.apk
yarn apk:release:prod   # android/app/build/outputs/apk/release/naikamutv-v<version>.apk
```

`release.sh` checks the required local files, runs `yarn prebuild`, builds a signed `assembleRelease` APK, renames it and opens the output folder. Staging and production share the same build (single `.env`); only the file name differs.
