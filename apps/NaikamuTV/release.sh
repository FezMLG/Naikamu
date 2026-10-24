#!/bin/bash
set -e

cd "$(dirname "$0")"

OPTSTRING=":e:"
ENVIRONMENT=""

while getopts ${OPTSTRING} opt; do
    case ${opt} in
        e)
            if [[ "${OPTARG}" == "prod" || "${OPTARG}" == "stg" ]]; then
                ENVIRONMENT=$OPTARG
                echo "Option -e was triggered, Argument: ${ENVIRONMENT}"
            else
                echo "Invalid argument for -e. Allowed values are 'prod' or 'stg'."
                exit 1
            fi
            ;;
        :)
            echo "Option -${OPTARG} requires an argument."
            exit 1
            ;;
        ?)
            echo "Invalid option: -${OPTARG}."
            exit 1
            ;;
    esac
done

if [[ "${ENVIRONMENT}" != "prod" && "${ENVIRONMENT}" != "stg" ]]; then
  echo "Invalid argument for -e. Allowed values are 'prod' or 'stg'."
  exit 1
fi

#---

for REQUIRED_FILE in google-services.json credentials/android/gradle.properties; do
  if [[ ! -f "${REQUIRED_FILE}" ]]; then
    echo "Missing ${REQUIRED_FILE}. See README.md (Required Local Files)."
    exit 1
  fi
done

# Gradle doesn't read .env files, so export local secrets for the native build
if [[ -f .env.local ]]; then
  set -a
  source .env.local
  set +a
fi

#---

VERSION=$(jq -r '.expo.version' app.json)
CODE_VERSION=$(jq -r '.expo.android.versionCode' app.json)

if [[ -z "${VERSION}" || "${VERSION}" == "null" ]]; then
  echo "Missing 'expo.version' in app.json."
  exit 1
fi

if [[ ! "${CODE_VERSION}" =~ ^[0-9]+$ ]]; then
  echo "Invalid 'expo.android.versionCode' in app.json: '${CODE_VERSION}'. It must be an integer."
  exit 1
fi

echo "Releasing NaikamuTV ${VERSION} (${CODE_VERSION}) for ${ENVIRONMENT}..."

#---

echo "Generating native project..."

yarn prebuild

echo "Native project has been generated."

#---

function build_apk() {
  echo "Building APK $1 ..."

  cd android

  ./gradlew $1

  cd ..

  echo "APK has been built successfully."
}

#---

function rename() {
  NEW_APP_NAME=naikamutv-$VERSION_SUFFIX$APP_VERSION.apk

  echo "DIR: $DIR, GENERATED_APP_NAME: $GENERATED_APP_NAME, VERSION_SUFFIX: $VERSION_SUFFIX, VERSION: $APP_VERSION, NEW_APP_NAME: $NEW_APP_NAME"

  mv $DIR/$GENERATED_APP_NAME $DIR/$NEW_APP_NAME

  echo "APK has been renamed to $NEW_APP_NAME"
}

build_apk assembleRelease

DIR='android/app/build/outputs/apk/release'
GENERATED_APP_NAME='app-release.apk'

if [[ "${ENVIRONMENT}" == "stg" ]]; then
  VERSION_SUFFIX=stg-r
  APP_VERSION=$CODE_VERSION
else
  VERSION_SUFFIX=v
  APP_VERSION=$VERSION
fi

rename

open $DIR

exit 0
