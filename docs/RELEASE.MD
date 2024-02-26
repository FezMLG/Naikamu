# RELEASES HOW-TO

## iOS

1. Open your project on Xcode.
2. Click on "automatically manage singing" on your targets section, under Signing & Capabilities.
3. On top of the screen where you have selected which simulator will run, change it to the option: Any iOS Device (arm64). 
4. Now click on the menu PRODUCT>Archive.
5. After creation open archive in finder
6. Click right on archive and check archive content, go to Products -> Applications
7. Create a empty folder called Payload
8. Place the .app folder inside of that
9. Zip up the Payload folder using normal compression
10. Rename the file with a .ipa extension
