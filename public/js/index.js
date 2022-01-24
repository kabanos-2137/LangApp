window.addEventListener('load', () => {
  ipcRenderer.send('localisation_get_index')

  document.getElementById('create_language_button').addEventListener('click', () => {
    ipcRenderer.send('new_language_open')
  })
})

ipcRenderer.on('localisation_set_index', (event, localisationJSON) => {
  let localisable = document.getElementsByClassName('lclsbl')
  for (let item of localisable){
    for (let object of localisationJSON['index']){
      if(item.id == object.name){
        item.innerText = object.text
      }
    }
  }
})