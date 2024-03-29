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

const setOptionsOpacity = (enabled) => {
  const allOptionsContainer = document.querySelector('#allOptionsContainer')
  if (enabled) {
    allOptionsContainer.style.opacity = 1;
    allOptionsContainer.style.pointerEvents = 'initial'
  } else {
    allOptionsContainer.style.opacity = 0.5
    allOptionsContainer.style.pointerEvents = 'none'
  }
}

const setMasterSwitchSkin = () => {
  chrome.storage.local.get('focusedYouTubeMaster', (result) => {
    // alert(result.focusedYouTubeMaster)
    if (!result) {
      chrome.storage.local.set({ focusedYouTubeMaster: true })
      document.querySelector('#masterStateTooltip').innerHTML = 'Enabled'
      setOptionsOpacity(true)
      // alert('null')
    } else {
      const masterSwitch = document.querySelector('#masterSwitch')
      if (result.focusedYouTubeMaster) {
        masterSwitch.src = 'svgPause.svg'
        // alert('svgPause.svg')
        setOptionsOpacity(true)
        chrome.action.setIcon({
          path: {
            16: '/icons/icon16.png',
            48: '/icons/icon48.png',
            128: '/icons/icon128.png',
          },
        })
        document.querySelector('#masterStateTooltip').innerHTML = 'Enabled'
      } else {
        masterSwitch.src = 'svgPlay.svg'
        // alert('svgPlay.svg')
        setOptionsOpacity(false)
        chrome.action.setIcon({
          path: {
            16: '/icons/iconPlay16.png',
            48: '/icons/iconPlay48.png',
            128: '/icons/iconPlay128.png',
          },
        })
        document.querySelector('#masterStateTooltip').innerHTML = 'Disabled'
      }
    }
  })
}

setMasterSwitchSkin()

const setMasterSwitchSkinManual = (value) => {
  const masterSwitch = document.querySelector('#masterSwitch')
  if (value) {
    masterSwitch.src = 'svgPause.svg'
    setOptionsOpacity(true)
    chrome.action.setIcon({
      path: {
        16: '/icons/icon16.png',
        48: '/icons/icon48.png',
        128: '/icons/icon128.png',
      },
    })
    document.querySelector('#masterStateTooltip').innerHTML = 'Enabled'
  } else {
    masterSwitch.src = 'svgPlay.svg'
    setOptionsOpacity(false)
    chrome.action.setIcon({
      path: {
        16: '/icons/iconPlay16.png',
        48: '/icons/iconPlay48.png',
        128: '/icons/iconPlay128.png',
      },
    })
    document.querySelector('#masterStateTooltip').innerHTML = 'Disabled'
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

document.querySelector('#masterSwitch').addEventListener('mouseover', () => {
  document.querySelector('#masterStateTooltip').classList.add('active')
})
document.querySelector('#masterSwitch').addEventListener('mouseout', () => {
  document.querySelector('#masterStateTooltip').classList.remove('active')
})
document
  .querySelector('#masterSwitch')
  .addEventListener('mousemove', (event) => {
    const mouseX = event.clientX
    const mouseY = event.clientY
    const tooltip = document.querySelector('#masterStateTooltip')
    tooltip.style.left = `${mouseX - 50}px`
    tooltip.style.top = `${mouseY + 25}px`
  })

const setSwitches = (id, primarySwitch) => {
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

    chrome.storage.local.get('focusedYouTubeEHHideMenu', (result) => {
      if (!result) {
        chrome.storage.local.set({ focusedYouTubeEHHideMenu: true })
        alert('null and set')
      }
      if (result.focusedYouTubeEHHideMenu) {
        document
          .getElementsByClassName('toggleSwitch')[3]
          .classList.add('active')
      } else {
        document
          .getElementsByClassName('toggleSwitch')[3]
          .classList.remove('active')
      }
    })
  }
  // handle changes
  else if (id === 0) {
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
    // turn off hide menu when turning off EH
    chrome.storage.local.get('focusedYouTubeEHHideMenu', (hideMenuResult) => {
      chrome.storage.local.get('focusedYouTubeEnhancedHome', (enhancedHomeResult) => {
        if (primarySwitch && !(enhancedHomeResult.focusedYouTubeEnhancedHome) && hideMenuResult.focusedYouTubeEHHideMenu)
          setSwitches(3, false)
      })
    })
  } else if (id === 3) {
    chrome.storage.local.get('focusedYouTubeEHHideMenu', (result) => {
      chrome.storage.local.get('focusedYouTubeEnhancedHome', (enhancedHomeResult) => {
        // if (enhancedHomeResult.focusedYouTubeEnhancedHome) {
        if (result.focusedYouTubeEHHideMenu) {
          document
            .getElementsByClassName('toggleSwitch')
          [id].classList.remove('active')
          chrome.storage.local.set({ focusedYouTubeEHHideMenu: false })
        } else {
          document
            .getElementsByClassName('toggleSwitch')
          [id].classList.add('active')
          chrome.storage.local.set({ focusedYouTubeEHHideMenu: true })
        }
        // }
      })
    })
    // turn on EH when turning on hide menu
    chrome.storage.local.get('focusedYouTubeEnhancedHome', (enhancedHomeResult) => {
      chrome.storage.local.get('focusedYouTubeEHHideMenu', (hideMenuResult) => {
        if (primarySwitch && !(enhancedHomeResult.focusedYouTubeEnhancedHome) && !(hideMenuResult.focusedYouTubeEHHideMenu))
          setSwitches(2, false)
      })
    })
  }
}

const options = document.getElementsByClassName('option')
for (let i = 0; i < options.length; i++) {
  options[i].addEventListener('click', () => {
    setSwitches(i, true)
  })
}

setMasterSwitchSkin()
setSwitches(-1, true)

// add switch transitions after states load
setTimeout(() => {
  document.querySelectorAll('.toggleSwitch').forEach((item) => {
    item.style.transition = 'background 0.1s ease-in-out'
  })
  document.querySelectorAll('.toggleSwitchKnob').forEach((item) => {
    item.style.transition = 'left 0.1s ease-in-out'
  })
}, 100)
