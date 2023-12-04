<!-- PROJECT -->
<div align="center">
  <h3 align="center">Stellasonos-v3</h3>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#Android Emulator">Android Emulator</a></li>
        <li><a href="#React Native Environment">React Native Environment</a></li>
      </ul>
    </li>
    <li><a href="#Features">Features</a></li>
    <li><a href="#Todos">Todos</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About

Sonification of astronomical data version 3. In collaboration with scientists from the Smithsonian Observatory and NASA, Brwon University is developing a visualization application for phones and tablets for looking at distant stellar objects with sounds and haptic feedback, for Blind and Visually Impaired (BVI) users, as well as everyone else.

<p align="right"><a href="#readme-top">back to top</a></p>


### Built With
[React Native](https://reactnative.dev/)

<p align="right"><a href="#readme-top">back to top</a></p>


<!-- GETTING STARTED -->
## Getting Started

### Android Emulator 
To install Android Emulator, download the Android Studio suite:
1. Ensure that Homebrew is installed:
  ```sh
    brew -v
  ```
2. Install the Azul Zulu OpenJDK distribution using Homebrew: 
  ```sh
    brew tap homebrew/cask-versions
    brew install --cask zulu11
  ```
3. Download and install [Android Studio](https://developer.android.com/studio)
4. While on Android Studio installation wizard, make sure the boxes next to the following items are checked: 
    - [x] Android SDK
    - [x] Android SDK Platform
    - [x] Android Virtual Device
5. Click "Next" to install these components.
6. Once setup has finalized and you are presented with the Welcome screen, proceed to the next step.
7. Android Studio installs the latest Android SDK by default. Building a React Native app with native code, however, requires the Android 13 (Tiramisu) SDK in particular. Additional Android SDKs can be installed through the SDK Manager in Android Studio. To do so, open Android Studio, click on the "More Actions" button and select "SDK Manager".
8. Select the "SDK Platforms" tab from within the SDK Manager and check the box next to "Show Package Details" in the bottom right corner. Look for and expand the Android 13 (Tiramisu) entry and make sure the following items are checked:
    - [x] `Android SDK Platform 33`
    - [x] `Intel x86 Atom_64 System Image` or `Google APIs Intel x86 Atom System Image` or `Google APIs ARM 64 v8a System Image` (for Apple M1 Silicon)
9. Select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the "Android SDK Build-Tools" entry, then make sure that 33.0.0 is selected.
10. Click "Apply" to download and install the Android SDK and related build tools.
11. Add the following lines to your `~/.zprofile` or `~/.zshrc` (if you are using bash, then `~/.bash_profile or ~/.bashrc`) config file:
  ```sh
    export ANDROID_HOME=$HOME/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/emulator
    export PATH=$PATH:$ANDROID_HOME/platform-tools
  ```
12. Load the config into your current shell:
  ```sh
  source ~/.zprofile
  ```
  or for bash:
  ```sh
  source ~/.bash_profile
  ```
13. Verify that `ANDROID_HOME` has been set:
  ```sh
    echo $ANDROID_HOME
  ```
  and the appropriate directories have been added to your path:
  ```sh
    echo $PATH
  ```
14. You will need an Android device to run your React Native Android app. This can be either a physical Android device, or more commonly, you can use an Android Virtual Device which allows you to emulate an Android device on your computer.
15. From the Android Studio Welcome screen, select the “More Actions” button > “Virtual Device Manager”.
16. Pick any phone from the list (Pixel 6 is the latest at time of writing) and click "Next". 
17. Select the Tiramisu API Level 33 image. 
18. Click "Next" then "Finish" to create your AVD.

### React Native Environment
The following instructions have been adapted from [React Native’s documentation](https://reactnative.dev/docs/environment-setup):

1. Install the following two packages using Homebrew: 
  ```sh
  brew install node
  brew install watchman
  ```
2. Clone the repo
   ```sh
   git clone https://github.com/tsgouros/stellasonos-v3.git
   ```
3. Note the separate branches currently used:
  * `de-expo`: serves as the primary branch that will pull from the ohter necessary branches. This branch will be set to the main branch in the future. 
  * `sound`: where sound dragging is being worked on 
  * `feature/haptics`: where haptics are being worked on 
4. Install NPM packages
   ```sh
   npm install --legacy-peer-deps to install the packages.
   ```
4. Start the server 
   ```js
   npx react-native start 
   ```
5. Open a new terminal and ccd into the project folder
6. Run the Android Emulator: 
   ```js
   npx react-native run-android --no-jetifier
   ```

<p align="right"><a href="#readme-top">back to top</a></p>

<!-- Features -->
## Features 

### Pages
- `Home.js`: displays images as swipeable cards
- `imagePage.js`: features an interactive image display where users can move a dot across the screen and view detailed information about the image in a pop-up window overlay
- `Intro.js`: serves as a placeholder introductory screen, offering buttons to navigate to different pages like Home, Vibration, and Sound within the app.
- `Placeholder.js`: shows the title of an image passed via navigation parameters and includes a button that allows the user to return to the previous screen in the app's navigation stack
- `SoundConfig.json`: configuration settings for playing an audio file: it sets the initial volume to 0.5 (indicating a medium volume level) and provides a URL link to an MP3 audio file, pointing to a bassoon sound sample
- `SoundHome.js`: Same as `Home.js` but for the sound section
- `SoundPage.js`: displays an image and uses touch interactions to control audio playback, with functionality for playing, looping, and adjusting the volume of a sound file, as well as the same draggable dot for interaction as in `imagePage.js`.
- `VibrationPage.js`: experimenting with different vibration patterns but is still a work in progres

### Utils 
#### data_processing
- `Constants.js`: exports a Constants object which contains configuration settings for audio playback, such as note durations and volumes, parameters for edge detection in image processing, definitions of musical instruments and their mappings to specific image layers, user interface instructions, and device-specific settings based on the user's operating system
- `EdgeDetection.js`: perform edge detection on images using the OpenCV library, storing and providing access to the resulting edge data.
- `FuseSearch.js`: implements a text search feature for a collection of images. It utilizes the Fuse.js library to search through image titles and descriptions based on user input. If the input is empty, it returns all images. Otherwise, it returns a list of images that match the search query.
- `Images.json`: This is how it's set up.
    1. src: The URL of the image.
    2. title: The title of the image.
    3. description: A brief description of the image.
    4. url: A URL with more information about the image.
    5. id: A unique identifier for the image.
    6. layers: An array of objects representing different layers or aspects of the image, each with its own source URL, identifier, and layer type.
    7. soundEffects: An object containing different sound effect configurations for the image, detailing various audio processing settings like pitch shift, distortion, tremolo, and reverb, as well as haptic feedback settings for different image layers.
- `Images_test.json`: same setup as `Images.json` but for testing. 
- `ImageSegmentation.js`: provides utility functions for manipulating OpenCV image processing results like converting output arrays to binary indices representing black and white pixels, and computing weighted averages of RGB values

<p align="right"><a href="#readme-top">back to top</a></p>

<!-- Todos -->
## Todos
Create an multiobject that manages an "image" made up of several different images.
- [ ] `loadImages( URLs )` where URLs is a collection of image URLs:
   - [ ] Loads a bunch of images from a bunch of URLs
   - [ ] URLs: A collection of images, specified by key {visible and xray}
   - [ ] Asynchronous image loading + error Handling perhpas?
- [ ] `showImage( key )` Displays the specified image on the screen.
- [ ] `segmentImage( key )` Segments the image, adds the segmented image to the collection of images.
- [ ] `returnImageData( key )` Returns a binary version of the given image, to be used by the sound and haptic generation functions.

Some other things to consider 
- Image should be resized accordingly if needed
- The segmented image output should be displayed onto the canvas directly
- Test with a similar set up as the images.json
  
- May also need to look at how React Native handles canvases (me)

" I imagine this MultiImage object would work best as managing a collection of comparable SingleImage objects with similar methods that don't require the 'key' argument." - Sure

<p align="right"><a href="#readme-top">back to top</a></p>

