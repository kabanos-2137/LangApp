const fs = require('fs');
const path = require('path');

const config = {
  default: {
    language: "en-GB",
    theme: "light",
  },
  getConfig: () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')).toString());
  },
  resetConfig: () => {
    fs.writeFileSync(path.join(__dirname, 'config.json'), JSON.stringify(this.default, null, 2));
  },
  setConfig: (config) => {
    fs.writeFileSync(path.join(__dirname, 'config.json'), JSON.stringify(config, null, 2));
  }
}

module.exports = config;