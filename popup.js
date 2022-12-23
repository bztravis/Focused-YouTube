const setDarkMode = () => {
  document.querySelector('#titleHeader').src = '/Focused YouTube Dark.svg'
}

const setLightMode = () => {
  document.querySelector('#titleHeader').src = '/Focused YouTube.svg'
}

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (event) => {
    // alert(event.matches ? "dark" : "light")

    if (event.matches) {
      setDarkMode()
    } else {
      setLightMode()
    }
  })

if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  // dark mode

  setDarkMode()
}

const setMasterSwitchSkin = () => {
  chrome.storage.local.get('focusedYouTubeMaster', (result) => {
    // alert(result.focusedYouTubeMaster)
    if (!result) {
      chrome.storage.local.set({ focusedYouTubeMaster: true })
      // alert('null')
    } else {
      const masterSwitch = document.querySelector('#masterSwitch')
      if (result.focusedYouTubeMaster) {
        masterSwitch.src = 'svgPause.svg'
        // alert('svgPause.svg')
      } else {
        masterSwitch.src = 'svgPlay.svg'
        // alert('svgPlay.svg')
      }
    }
  })
}

setMasterSwitchSkin()

const setMasterSwitchSkinManual = (value) => {
  const masterSwitch = document.querySelector('#masterSwitch')
  if (value) {
    masterSwitch.src = 'svgPause.svg'
  } else {
    masterSwitch.src = 'svgPlay.svg'
  }
}

// add event listener on click: toggle storage and call set skin function

document.querySelector('#masterSwitch').addEventListener('click', () => {
  chrome.storage.local.get('focusedYouTubeMaster', (result) => {
    const newResult = !result.focusedYouTubeMaster
    // alert(newResult)
    chrome.storage.local.set({ focusedYouTubeMaster: newResult })
    setMasterSwitchSkinManual(newResult)
  })
})
