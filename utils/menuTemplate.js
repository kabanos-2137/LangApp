const fs = require("fs");
const config = require("./config");
const path = require("path");
const electron = require("electron");
const Menu = electron.Menu;
const app = electron.app;
const dialog = electron.dialog;

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
                click(item) {
                  let options = {
                    title: localisationConfig.dialogs[0].title,
                    buttons: [localisationConfig.dialogs[0].options[0], localisationConfig.dialogs[0].options[1]],
                    message: localisationConfig.dialogs[0].message
                  }
                  dialog.showMessageBox(null, options).then(({response}) => {
                    if(response == 1){
                      return
                    }
                    var languageConfig = config.getConfig();
                    languageConfig['language'] = "en-GB";
                    config.setConfig(languageConfig)
                    app.relaunch()
                    app.exit()
                    menuTemplate.setMenu()
                  })
                }
              },
              {
                label: localisationConfig.menu[1].menu[0].menu[1].name,
                click(item) {
                  let options = {
                    title: localisationConfig.dialogs[0].title,
                    buttons: [localisationConfig.dialogs[0].options[0], localisationConfig.dialogs[0].options[1]],
                    message: localisationConfig.dialogs[0].message
                  }
                  dialog.showMessageBox(null, options).then(({response}) => {
                    if(response == 1){
                      return
                    }
                    var languageConfig = config.getConfig();
                    languageConfig['language'] = "pl-PL";
                    config.setConfig(languageConfig)
                    app.relaunch()
                    app.exit()
                    menuTemplate.setMenu()
                  })
                }
              },
            ]
          },
          {
            label: localisationConfig.menu[1].menu[1].name,
            submenu: [
              {
                label: localisationConfig.menu[1].menu[1].menu[0].name,
                click(item) {
                  let options = {
                    title: localisationConfig.dialogs[1].title,
                    buttons: [localisationConfig.dialogs[1].options[0], localisationConfig.dialogs[1].options[1]],
                    message: localisationConfig.dialogs[1].message
                  }
                  dialog.showMessageBox(null, options).then(({response}) => {
                    if(response == 1){
                      return
                    }
                    var themeConfig = config.getConfig();
                    themeConfig['theme'] = "Light";
                    config.setConfig(themeConfig)
                    app.relaunch()
                    app.exit()
                  })
                }
              },
              {
                label: localisationConfig.menu[1].menu[1].menu[1].name,
                click(item, focusedWindow) {
                  let options = {
                    title: localisationConfig.dialogs[1].title,
                    buttons: [localisationConfig.dialogs[1].options[0], localisationConfig.dialogs[1].options[1]],
                    message: localisationConfig.dialogs[1].message
                  }
                  dialog.showMessageBox(null, options).then(({response}) => {
                    if(response == 1){
                      return
                    }
                    var themeConfig = config.getConfig();
                    themeConfig['theme'] = "Dark";
                    config.setConfig(themeConfig)
                    app.relaunch()
                    app.exit()
                  })
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