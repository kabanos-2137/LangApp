const { ipcRenderer } = require('electron')

window.addEventListener('load', () => {
  ipcRenderer.send('theme_get_onload')
})

ipcRenderer.on('theme_set_light', () => {
  document.body.classList.add('light')
  document.body.classList.remove('dark')
})

ipcRenderer.on('theme_set_dark', () => {
  document.body.classList.remove('light')
  document.body.classList.add('dark')
})