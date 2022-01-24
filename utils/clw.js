const { app, BrowserWindow, ipcMain } = require('electron');
const menuTemplate = require('./menuTemplate')

class CreateLangWindow {
  constructor(props){
    console.log('a')
    this.window = new BrowserWindow({ 
      webPreferences: { 
        nodeIntegration: true,
        contextIsolation: false
      },
      height: 900, 
      width: 1600
    });

    menuTemplate.setMenu();

    this.window.on('close', () => { //Closes app when "x" in top right corner clicked or ALT+F4 typed
      this.window.close();
    })
    
    ipcMain.on('theme_get_onload', () => {
      switch (config.getConfig()['theme']) {
        case 'Light':
          this.window.webContents.send('theme_set_light')
          break;
        case 'Dark':
          this.window.webContents.send('theme_set_dark')
          break;
      }
    })
  
    ipcMain.on('localisation_get_index', () => {
      this.window.webContents.send('localisation_set_index', JSON.parse(
        fs.readFileSync(
          path.join(__dirname, 'utils', 'localisation', config.getConfig().language + '.json')
          )
        )
      )
    })
    
    ipcMain.on('reload_window_all', () => {
      this.window.reload();
    })
  }
}

module.exports = CreateLangWindow