# Web Application for Breath Bond
A full featured web application using Material-UI and React Framework

## Features
- Responsive
- Routing usign [react-router](https://github.com/ReactTraining/react-router)
- Graph capabilities
- Some sample pages
- Docker container for production builds
- Created using the template from [Material Sense](https://github.com/alexanmtz/material-sense)



## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### Docker

This project works in a docker container as well

First run:
`docker build . -t material-sense`

Then:
`docker run -p 2222:2222 material-sense`

_the 2222 port intend to make work on Azure websites as container for default, cause is the port they use to expose the server_

### Publish at Github pages
`yarn deploy`


