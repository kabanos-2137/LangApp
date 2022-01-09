const fs = require("fs");
const config = require("./config");
const path = require("path");
const { Menu } = require("electron");
const { app } = require("electron/main");

const menuTemplate = {
  setMenu: () => {
    var localisationConfig = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, 'localisation', config.getConfig().language + '.json')
      )
    )

    var menuTemplate = [
      {
        label: localisationConfig.menu[0].name,
        submenu: [
          {
            label: localisationConfig.menu[0].menu[0].name,
            accelerator: process.platform === 'darwin' ? 'Cmd+Shift+I' : 'Ctrl+Shift+I',
            click(item, focusedWindow) {
              focusedWindow.toggleDevTools();
            }
          },
          {
            label: localisationConfig.menu[0].menu[1].name,
            accelerator: process.platform === 'darwin' ? 'Cmd+F5' : 'Ctrl+F5',
            click(item, focusedWindow) {
              focusedWindow.reload();
            }
          },
          {
            label: localisationConfig.menu[0].menu[2].name,
            accelerator: 'Alt+F4',
            click() {
              app.quit();
            }
          }
        ]
      }
    ]

    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate)) // Set menu in the window
  }
}

module.exports = menuTemplate