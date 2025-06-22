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

# Get current date and time
DATE_FOLDER=$(date "+%Y-%m-%d")
ARCHIVE_NAME=$(date "+%m-%d-%Y, %H.%M")
BASE_DIR="$HOME/Library/Developer/Xcode/Archives"
TARGET_DIR="$BASE_DIR/$DATE_FOLDER"

# Create directory if it doesn't exist
mkdir -p "$TARGET_DIR"

if [[ "${ENVIRONMENT}" == "stg" ]]; then
  FINAL_PATH="$TARGET_DIR/NaikamuStg $ARCHIVE_NAME.xcarchive"

  xcodebuild -workspace /Users/konrad/Documents/GitHub/AniWatch/apps/mobile/ios/Naikamu.xcworkspace \
  -scheme NaikamuStg clean archive -configuration release \
  -sdk iphoneos -archivePath "$FINAL_PATH"

elif [[ "${ENVIRONMENT}" == "prod" ]]; then
  FINAL_PATH="$TARGET_DIR/Naikamu $ARCHIVE_NAME.xcarchive"

  xcodebuild -workspace /Users/konrad/Documents/GitHub/AniWatch/apps/mobile/ios/Naikamu.xcworkspace \
  -scheme Naikamu clean archive -configuration release \
  -sdk iphoneos -archivePath "$FINAL_PATH"

else

  echo "Invalid argument for -e. Allowed values are 'prod' or 'stg'."
  exit 1

fi

# Output final path
echo "$FINAL_PATH"

exit 0
