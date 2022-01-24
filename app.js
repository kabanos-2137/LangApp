//Import
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const config = require('./utils/config');
const CreateLangWindow = require('./utils/clw')
const menuTemplate = require('./utils/menuTemplate')
const fs = require('fs');

var mainWindow; //Main Window
var createLangWindow; //Create Language Window

app.on('ready', () => { //"When app's ready, create window and shit" callback
  mainWindow = new BrowserWindow({ //Initialize window and configure it
    webPreferences: { //Some important stuff, I don't really care about them
      nodeIntegration: true,
      contextIsolation: false
    },
    height: 900, //Height and width, they don't need any explanation (I hope so)
    width: 1600
  });
  

  mainWindow.loadURL( // Loads the HTML file for display
    url.format({ 
      pathname: path.join(__dirname, 'public', 'html', 'index.html')
    })
  );

  menuTemplate.setMenu();

  mainWindow.on('close', () => { //Closes app when "x" in top right corner clicked or ALT+F4 typed
    app.quit();
  })
  
  ipcMain.on('theme_get_onload', () => {
    switch (config.getConfig()['theme']) {
      case 'Light':
        mainWindow.webContents.send('theme_set_light')
        break;
      case 'Dark':
        mainWindow.webContents.send('theme_set_dark')
        break;
    }
  })

  ipcMain.on('localisation_get_index', () => {
    mainWindow.webContents.send('localisation_set_index', JSON.parse(
      fs.readFileSync(
        path.join(__dirname, 'utils', 'localisation', config.getConfig().language + '.json')
        )
      )
    )
  })

  ipcMain.on('new_language_open', () => {
    if(createLangWindow){
      return;
    }

    createLangWindow = new CreateLangWindow();
  })

  ipcMain.on('reload_window_all', () => {
    mainWindow.reload();
  })
});