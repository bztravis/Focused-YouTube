// replaces elemetns of style.css and play.js

let master = true
let hideNotifications = true
let hideChannelContent = true

const relevantValues = [
  'focusedYouTubeMaster',
  'focusedYouTubeHideNotifications',
  'focusedYouTubeHideChannelContent',
]

const getValues = () => {
  chrome.storage.local.get('focusedYouTubeMaster', (result) => {
    if (!result.focusedYouTubeMaster) {
      chrome.storage.local.set({ focusedYouTubeMaster: master })
      getValues()
    }
    master = result.focusedYouTubeMaster
  })
  chrome.storage.local.get('focusedYouTubeHideNotifications', (result) => {
    if (!result.focusedYouTubeHideNotifications) {
      chrome.storage.local.set({
        focusedYouTubeHideNotifications: hideNotifications,
      })
      getValues()
    }
    hideNotifications = result.focusedYouTubeHideNotifications
  })
  chrome.storage.local.get('focusedYouTubeHideChannelContent', (result) => {
    if (!result.focusedYouTubeHideChannelContent) {
      chrome.storage.local.set({ focusedYouTubeHideChannelContent: hideChannelContent })
      getValues()
    }
    hideChannelContent = result.focusedYouTubeHideChannelContent
  })
}

const setCSS = () => {
  if (master) {
    let general = document.createElement('style')
    general.id = 'general'
    general.innerHTML = `.ytp-endscreen-content {
    display: none;
  }

  /* wide screens */

  #secondary.style-scope.ytd-watch-flexy {
    display: none;
  }

  ytd-watch-flexy[flexy][is-two-columns_][is-extra-wide-video_]
    #primary.ytd-watch-flexy,
  ytd-watch-flexy[flexy][is-two-columns_][is-four-three-to-sixteen-nine-video_]
    #primary.ytd-watch-flexy {
    max-width: none !important;
  }

  /* narrow screens */

  #related {
    display: none;
  }

  /* chat */
  ytd-live-chat-frame#chat {
    display: none;
  }

  #sections > ytd-guide-section-renderer:nth-child(2) {
    display: none;
  }

  #sections > ytd-guide-section-renderer:nth-child(3) {
    display: none;
  }

  #sections > ytd-guide-section-renderer:nth-child(4) {
    display: none;
  }

  #footer {
    display: none;
  }
  `
    document.head.appendChild(general)
  } else {
    document.querySelectorAll('#general').forEach((instance) => {
      instance.innerHTML = ''
    })

    hideNotifications = false
    hideChannelContent = false
  }

  // HIDE NOTIFICATIONS *************************************************************
  if (hideNotifications) {
    let style = document.createElement('style')
    style.id = 'hideNotifications'
    style.innerHTML = `#buttons > ytd-notification-topbar-button-renderer {display: none !important;}`
    document.head.appendChild(style)
    // console.log('appending')
  }
  // DISABLE NOTIFICATIONS *****************************************************
  else {
    document.querySelectorAll('#hideNotifications').forEach((instance) => {
      instance.innerHTML = ''
    })
  }

  // HIDE CHANNEL CONTENT ***********************************************************
  if (hideChannelContent) {
    let style = document.createElement('style')
    style.id = 'hideChannelContent'
    style.innerHTML = `
    #page-manager > ytd-browse > ytd-two-column-browse-results-renderer {opacity: 0; pointer-events: none;}
    /*  categories */
.style-scope.ytd-feed-filter-chip-bar-renderer {
  opacity: 0;
  pointer-events: none;
}
    `
    document.head.appendChild(style)
  }
  // DISABLE CHANNEL CONTENT ***************************************************
  else {
    document.querySelectorAll('#hideChannelContent').forEach((instance) => {
      instance.innerHTML = ''
    })
  }
}

const handleValues = (changes) => {
  setTimeout(() => {
    // alert(
    //   `${master} ${hideNotifications} ${hideChannelContent} ${enhancedHome} ${eHHideMenu}`
    // )
    setCSS()
  }, 100)
}

getValues()
handleValues()

chrome.storage.onChanged.addListener((changes, areaName) => {
  // alert('change in storage')
  // console.log(changes)
  getValues()
  let needToUpdate = false
  relevantValues.forEach((item) => {
    if (Object.keys(changes).includes(item)) {
      needToUpdate = true
    }
    // console.log(Object.keys(changes), item, needToUpdate)
  })
  if (needToUpdate) {
    handleValues(changes)
  }
})

document.querySelector('body').addEventListener('click', () => {
  // alert('clicked')
  setCSS()
})

window.addEventListener('load', () => {
  // alert('loaded')
  setCSS()
})
