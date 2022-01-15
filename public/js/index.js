window.addEventListener('load', () => {
  ipcRenderer.send('localisation_get_index')
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