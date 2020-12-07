# SKO Play

## Code Structure

```
ProjectCode/
    App.js    # The first file to be executed when launching the app.
    assets/
        ...     # This directory contains all the images used in the app
    src/
        styles/    # This directory contains .js files that specify the style and format of some pages
            global.js
            mainFeed.js
        utility/   # This directory contains .js files used for the app's backend purposes
            database.js
            events.js
            navigation.js
        views/     # This directory contains all the individual pages used in the app.
            EditProfile.js
            Login.js
            MainFeed.js
            Profile.js
            SingUp.js
            StartPage.js
            createEvent.js
            eventDetails.js
```

## How to run the app

### Running the app for development purposes

Steps to setup the app:
1. Download NodeJS at https://nodejs.org/en/download/
2. In a terminal, run `npm install -g expo-cli`
3. Download/clone a local version of this repository and navigate to the `ProjectCode` directory in a terminal
4. Run `npm install`

Steps to run the app in development mode:
1. In a terminal, navigate to the `ProjectCode` directory
2. Run `expo start`

### Running the production version

The app is currently under review for submission on the Google Play Store. In the mean time, visit https://expo.io/@paca3302/projects/skoplay. Open the app by either using the online Android emulator, or by using the Expo app on an actual Android device (or local Android emulator).
