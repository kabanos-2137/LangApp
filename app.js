//Import
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const config = require('./utils/config');
const menuTemplate = require('./utils/menuTemplate')
const fs = require('fs');

var MainWindow; //Main Window

app.on('ready', () => { //"When app's ready, create window and shit" callback
  var localisationConfig = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, 'utils', 'localisation', config.getConfig().language + '.json')
    )
  );

  MainWindow = new BrowserWindow({ //Initialize window and configure it
    webPreferences: { //Some important stuff, I don't really care about them
      nodeIntegration: true,
      contextIsolation: false
    },
    height: 900, //Height and width, they don't need any explanation (I hope so)
    width: 1600
  });

  MainWindow.loadURL( // Loads the HTML file for display
    url.format({ 
      pathname: path.join(__dirname, 'public', 'html', 'index.html')
    })
  );

  menuTemplate.setMenu(MainWindow);

  MainWindow.on('close', () => { //Closes app when "x" in top right corner clicked or ALT+F4 typed
    app.quit();
  })
  
  ipcMain.on('theme_get_onload', () => {
    switch (config.getConfig()['theme']) {
      case 'Light':
        MainWindow.webContents.send('theme_set_light')
        break;
      case 'Dark':
        MainWindow.webContents.send('theme_set_dark')
        break;
    }
  })
});