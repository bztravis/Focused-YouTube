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

const setSwitches = (id) => {
  // alert(id)
  if (id === -1) {
    // initial call just confirm all values
    chrome.storage.local.get('focusedYouTubeHideNotifications', (result) => {
      if (!result) {
        chrome.storage.local.set({ focusedYouTubeHideNotifications: true })
      }
      if (result.focusedYouTubeHideNotifications) {
        document
          .getElementsByClassName('toggleSwitch')[0]
          .classList.add('active')
      } else {
        document
          .getElementsByClassName('toggleSwitch')[0]
          .classList.remove('active')
      }
    })

    chrome.storage.local.get('focusedYouTubeHideChannelContent', (result) => {
      if (!result) {
        chrome.storage.local.set({ focusedYouTubeHideChannelContent: true })
      }
      if (result.focusedYouTubeHideChannelContent) {
        document
          .getElementsByClassName('toggleSwitch')[1]
          .classList.add('active')
      } else {
        document
          .getElementsByClassName('toggleSwitch')[1]
          .classList.remove('active')
      }
    })

    chrome.storage.local.get('focusedYouTubeEnhancedHome', (result) => {
      if (!result) {
        chrome.storage.local.set({ focusedYouTubeEnhancedHome: true })
      }
      if (result.focusedYouTubeEnhancedHome) {
        document
          .getElementsByClassName('toggleSwitch')[2]
          .classList.add('active')
      } else {
        document
          .getElementsByClassName('toggleSwitch')[2]
          .classList.remove('active')
      }
    })
  } else if (id === 0) {
    chrome.storage.local.get('focusedYouTubeHideNotifications', (result) => {
      if (result.focusedYouTubeHideNotifications) {
        document
          .getElementsByClassName('toggleSwitch')
          [id].classList.remove('active')
        chrome.storage.local.set({ focusedYouTubeHideNotifications: false })
      } else {
        document
          .getElementsByClassName('toggleSwitch')
          [id].classList.add('active')
        chrome.storage.local.set({ focusedYouTubeHideNotifications: true })
      }
    }) 
  } else if (id === 1) {
    chrome.storage.local.get('focusedYouTubeHideChannelContent', (result) => {
      if (result.focusedYouTubeHideChannelContent) {
        document
          .getElementsByClassName('toggleSwitch')
          [id].classList.remove('active')
        chrome.storage.local.set({ focusedYouTubeHideChannelContent: false })
      } else {
        document
          .getElementsByClassName('toggleSwitch')
          [id].classList.add('active')
        chrome.storage.local.set({ focusedYouTubeHideChannelContent: true })
      }
    })
  } else if (id === 2) {
    chrome.storage.local.get('focusedYouTubeEnhancedHome', (result) => {
      if (result.focusedYouTubeEnhancedHome) {
        document
          .getElementsByClassName('toggleSwitch')
          [id].classList.remove('active')
        chrome.storage.local.set({ focusedYouTubeEnhancedHome: false })
      } else {
        document
          .getElementsByClassName('toggleSwitch')
          [id].classList.add('active')
        chrome.storage.local.set({ focusedYouTubeEnhancedHome: true })
      }
    })
  }

  // document.getElementsByClassName('toggleSwitch')[0].classList.remove('active')
  // document.getElementsByClassName('toggleSwitch')[1].classList.add('active')
}

const options = document.getElementsByClassName('option')
for (let i = 0; i < options.length; i++) {
  options[i].addEventListener('click', () => {
    setSwitches(i)
  })
}

setSwitches(-1)

// add switch transitions after states load
setTimeout(() => {
  document.querySelectorAll('.toggleSwitch').forEach((item) => {
    item.style.transition = 'background 0.1s ease-in-out'
  })
  document.querySelectorAll('.toggleSwitchKnob').forEach((item) => {
    item.style.transition = 'left 0.1s ease-in-out'
  })
}, 100)
