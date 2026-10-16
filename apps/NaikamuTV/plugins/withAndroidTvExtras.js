const fs = require('fs');
const path = require('path');

const { withAppBuildGradle, withDangerousMod } = require('expo/config-plugins');

const DOTENV_APPLY =
  'apply from: project(\':react-native-config\').projectDir.getPath() + "/dotenv.gradle"';

const RELEASE_SIGNING_CONFIG = `
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }`;

const replaceOrThrow = (contents, pattern, replacement, description) => {
  if (!pattern.test(contents)) {
    throw new Error(
      `withAndroidTvExtras: could not find ${description} in android/app/build.gradle`,
    );
  }

  return contents.replace(pattern, replacement);
};

// Exposes .env values to native code and BuildConfig (react-native-config).
const withDotenvGradle = config =>
  withAppBuildGradle(config, gradleConfig => {
    let contents = gradleConfig.modResults.contents;

    if (!contents.includes(DOTENV_APPLY)) {
      contents = replaceOrThrow(
        contents,
        /apply plugin: "com\.facebook\.react"\n/,
        match => `${match}\n${DOTENV_APPLY}\n`,
        'the com.facebook.react plugin',
      );
    }
    gradleConfig.modResults.contents = contents;

    return gradleConfig;
  });

// Signs release builds with the upload keystore from ~/.gradle/gradle.properties.
const withReleaseSigning = config =>
  withAppBuildGradle(config, gradleConfig => {
    let contents = gradleConfig.modResults.contents;

    if (!contents.includes('MYAPP_UPLOAD_STORE_FILE')) {
      contents = replaceOrThrow(
        contents,
        /(signingConfigs\s*\{\s*debug\s*\{[^}]*\})/,
        match => `${match}${RELEASE_SIGNING_CONFIG}`,
        'the debug signing config',
      );
      contents = replaceOrThrow(
        contents,
        /(buildTypes\s*\{[\s\S]*?release\s*\{[\s\S]*?)signingConfig signingConfigs\.debug/,
        (_match, prefix) => `${prefix}signingConfig signingConfigs.release`,
        'the release build type signing config',
      );
    }
    gradleConfig.modResults.contents = contents;

    return gradleConfig;
  });

// Copies the gitignored upload keystore and its gradle.properties from credentials/android
// into android/app, so they survive `expo prebuild --clean`.
const withSigningCredentials = config =>
  withDangerousMod(config, [
    'android',
    async modConfig => {
      const { projectRoot, platformProjectRoot } = modConfig.modRequest;
      const credentialsDirectory = path.join(projectRoot, 'credentials', 'android');

      if (fs.existsSync(credentialsDirectory)) {
        for (const file of fs.readdirSync(credentialsDirectory)) {
          fs.copyFileSync(
            path.join(credentialsDirectory, file),
            path.join(platformProjectRoot, 'app', file),
          );
        }
      }

      return modConfig;
    },
  ]);

module.exports = config =>
  withSigningCredentials(withReleaseSigning(withDotenvGradle(config)));
