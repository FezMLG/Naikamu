#!/bin/bash
set -e

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

#---

echo "Removing assets..."

rm -rf ./android/app/build/generated/assets

echo "Assets have been removed."

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
  NEW_APP_NAME=naikamu-$VERSION_SUFFIX$VERSION.apk

  echo "DIR: $DIR, GENERATED_APP_NAME: $GENERATED_APP_NAME, VERSION_SUFFIX: $VERSION_SUFFIX, VERSION: $VERSION, NEW_APP_NAME: $NEW_APP_NAME"

  mv $DIR/$GENERATED_APP_NAME $DIR/$NEW_APP_NAME

  echo "APK has been renamed to $NEW_APP_NAME"
}

if [[ "${ENVIRONMENT}" == "stg" ]]; then

  build_apk assembleStaging

  DIR='android/app/build/outputs/apk/staging/release'
  GENERATED_APP_NAME='app-staging-release.apk'
  VERSION_SUFFIX=stg-r
  VERSION=$(jq -r '.codeVersion' package.json)

elif [[ "${ENVIRONMENT}" == "prod" ]]; then

  build_apk assembleRelease

  DIR='android/app/build/outputs/apk/production/release'
  GENERATED_APP_NAME='app-production-release.apk'
  VERSION_SUFFIX=v
  VERSION=$(jq -r '.version' package.json)

else

  echo "Invalid argument for -e. Allowed values are 'prod' or 'stg'."
  exit 1

fi

rename

open $DIR

exit 0
