const fs = require("fs");
const config = require("./config");
const path = require("path");
const electron = require("electron");
const Menu = electron.Menu;
const app = electron.app;

const menuTemplate = {
  setMenu: () => {
    var localisationConfig = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, 'localisation', config.getConfig().language + '.json')
      )
    )

    var menuTemplateObject = [
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
      },
      {
        label: localisationConfig.menu[1].name,
        submenu: [
          {
            label: localisationConfig.menu[1].menu[0].name,
            submenu: [
              {
                label: localisationConfig.menu[1].menu[0].menu[0].name,
                click(item, focusedWindow) {
                  var languageConfig = config.getConfig();
                  languageConfig['language'] = "en-GB";
                  config.setConfig(languageConfig)
                  focusedWindow.reload();
                  menuTemplate.setMenu()
                }
              },
              {
                label: localisationConfig.menu[1].menu[0].menu[1].name,
                click(item, focusedWindow) {
                  var languageConfig = config.getConfig();
                  languageConfig['language'] = "pl-PL";
                  config.setConfig(languageConfig)
                  focusedWindow.reload();
                  menuTemplate.setMenu()
                }
              },
            ]
          },
          {
            label: localisationConfig.menu[1].menu[1].name,
            submenu: [
              {
                label: localisationConfig.menu[1].menu[1].menu[0].name,
                click(item, focusedWindow) {
                  var themeConfig = config.getConfig();
                  themeConfig['theme'] = "Light";
                  config.setConfig(themeConfig)
                  focusedWindow.webContents.send('theme_set_light')
                }
              },
              {
                label: localisationConfig.menu[1].menu[1].menu[1].name,
                click(item, focusedWindow) {
                  var themeConfig = config.getConfig();
                  themeConfig['theme'] = "Dark";
                  config.setConfig(themeConfig)
                  focusedWindow.webContents.send('theme_set_dark')
                }
              }
            ]
          }
        ]
      }
    ]

    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplateObject)) // Set menu in the window
  }
}

module.exports = menuTemplate