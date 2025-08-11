# Cake Ingredient Calculator

A React and Electron desktop app that helps you calculate the cost of cake ingredients based on quantities and prices. Perfect for bakers who want to manage costs efficiently.

## Features

- Add, edit, and delete ingredients with name, unit, weight, and price
- Automatically calculates cost per unit and total cost for recipes
- Simple and intuitive UI built with React
- Electron wrapper to run as a desktop app on Windows/Mac/Linux
- Saves ingredient data locally for quick access

## Technologies Used

- React  
- Electron  
- JavaScript (ES6+)  
- HTML & CSS  

## Getting Started

### Prerequisites

- Node.js (v14 or newer recommended)  
- npm or yarn package manager  

### Building the App

To create a production build and package the app with Electron:

```bash
npm run build
npm run dist
```

## Debugging an Electron Packaging Issue

While packaging my Electron and React app, I ran into a frustrating issue. Even after removing the old `electron.js` file and cleaning out the `dist` and `build` folders, the app still failed during packaging. Everything in my project was pointing to `main.js` as the entry point, so it didn’t make sense that Electron kept looking for a file I’d already deleted.

After a lot of trial and error, and not much luck, I took a break. When I came back to it with fresh eyes, something clicked. I checked the `builder-effective-config.yaml` file and saw that `extraMetadata.main` was still set to `build/electron.js`. That explained it. Even though the file was gone and the rest of my setup was correct, `electron-builder` was still injecting the wrong path into the packaged app’s internal `package.json`.

The solution was to add an entry in my `package.json` to explicitly set:

```json
"extraMetadata": {
  "main": "main.js"
}
```

Once I did that and rebuilt everything, it worked perfectly.

This took me a while to figure out with my limited experience, but it was a good lesson in digging into the tools you're using and not assuming a clean build means a clean config. Sometimes the problem is hidden a bit deeper, and taking a step back helps spot what you were missing.


## License

This project is open source and available under the MIT License.
