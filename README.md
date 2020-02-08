# webpack_basics

### Setup default package.json file:
`npm init -y`

### Install to local project directory and save to dev devDependencies:
`npm install webpack --save-dev`

### Before running the webpack command you might have to install webpack-cli
> Note: run webpack command and it'll prompt you to do so or do it manually.

### Windows issue with not finding './src' directory fix:
> create the 'src' directory containing the index.js, also create the 'dist'
> directory containing the main.js file to fix the issue.

### Run webpack command try one of the following (use path slash based on you OS):
- `webpack`
- `node_modules/.bin/webpack`

### Modules(simply just js files) using ES .vs common js
- ES export/import
`export default function(message) {
  alert(message);
}`
`import notify from './Notification';`
- ES multi-function exports, import must specify each within {...}
`import {notify} from './Notification';`

- Common js export/import
`module.exports = function(message) {
  alert(message);
}`
`var notify = require('./Notification');`
