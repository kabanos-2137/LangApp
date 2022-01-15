const { ipcRenderer } = require('electron')

window.addEventListener('load', () => {
  ipcRenderer.send('theme_get_onload')
})

ipcRenderer.on('theme_set_light', () => {
  let themeable = document.getElementsByClassName('thmbl')
  for (let item of themeable){
    item.classList.add('light')
    item.classList.remove('dark')
  }
})

ipcRenderer.on('theme_set_dark', () => {
  let themeable = document.getElementsByClassName('thmbl')
  for (let item of themeable){
    item.classList.remove('light')
    item.classList.add('dark')
  }
})