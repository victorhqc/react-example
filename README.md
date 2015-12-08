# React Training

# Requirements
In order to start using this application you'll need:

+ Node.js >= 4
+ npm
+ yo

# Startup
In order to make it easier and just start with the React coding, rather than
struggle with the configuration a [generator](https://github.com/newtriks/generator-react-webpack) is being used. Which is using [webpack](https://webpack.github.io/) as a module bundler.

```sh
# Install the generator
npm install -g yo
npm install -g generator-react-webpack
```

# Development
To start the web server just run

```sh
# Start the webapp
npm start
```

This will start the application in http://localhost:8000 every change you make to the code should immediately be updated in the browser.

# Building
When deploying to production, there's another simple command to compile the whole code into a single minified file.

```sh
# Build the code
npm run dist
```

It should create a path called `dist/` where it contains all the minified files.
