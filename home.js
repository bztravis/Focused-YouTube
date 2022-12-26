let masterHome = true
let enhancedHome = true
let eHHideMenu = true

const relevantValuesHome = [
  'focusedYouTubeMaster',
  'focusedYouTubeEnhancedHome',
  'focusedYouTubeEHHideMenu',
]

const getValuesHome = () => {
  chrome.storage.local.get('focusedYouTubeMaster', (result) => {
    if (!result.focusedYouTubeMaster) {
      chrome.storage.local.set({ focusedYouTubeMaster: masterHome })
      getValues()
    }
    masterHome = result.focusedYouTubeMaster
  })
  chrome.storage.local.get('focusedYouTubeEnhancedHome', (result) => {
    if (!result.focusedYouTubeEnhancedHome) {
      chrome.storage.local.set({ focusedYouTubeHideChannelContent: enhancedHome })
      getValues()
    }
    enhancedHome = result.focusedYouTubeEnhancedHome
  })
  chrome.storage.local.get('focusedYouTubeEHHideMenu', (result) => {
    if (!result.focusedYouTubeEHHideMenu) {
      chrome.storage.local.set({ focusedYouTubeEnhancedHome: eHHideMenu })
      getValues()
    }
    eHHideMenu = result.focusedYouTubeEHHideMenu
  })
}

const setCssHome = () => {
  if (document.title !== 'YouTube') return

  if (masterHome) {
    let homeGeneral = document.createElement('style')
    homeGeneral.id = 'homeGeneral'
    homeGeneral.innerHTML = `/* home categories */
    .style-scope.ytd-feed-filter-chip-bar-renderer {
      opacity: 0;
      pointer-events: none;
    }
    /* home thumbnails */
    #page-manager {
      display: none !important;
    }
    `
    document.head.appendChild(homeGeneral)
  } else {
    document.querySelectorAll('#homeGeneral').forEach((instance) => {
      instance.innerHTML = ''
    })
    enhancedHome = false
    eHHideMenu = false
  }

  // EH *************************************************************
  if (enhancedHome) {
    let style = document.createElement('style')
    style.id = 'enhancedHome'
    style.innerHTML = `
    #center {
      display: flex !important;
      width: 60vw;
      position: fixed;
      top: 40vh;
      left: calc((100vw - 60vw - 40px) / 2);
      opacity: 0;
    }
    
    #logo-icon {
      display: flex !important;
      width: 360px;
      height: 120px;
      position: fixed;
      top: calc(40vh - 180px);
      left: calc((100vw - (360px + 30px)) / 2);
      opacity: 0;
    }
    
    
    
    @media (min-width: 1200px) {
      #center {
        width: 720px;
        left: calc((100vw - 720px - 40px) / 2);
      } 
    }
    
    `
    document.head.appendChild(style)
  }
  // DISABLE EH *****************************************************
  else if (!enhancedHome || !masterHome) {
    // console.log('disabling EH')
    document.querySelectorAll('#enhancedHome').forEach((instance) => {
      instance.innerHTML = ''
    })
  }

  // HIDE SIDEBAR MENU ***********************************************************
  if (eHHideMenu) {
    let style = document.createElement('style')
    style.id = 'eHHideMenu'
    style.innerHTML = `/* hide home sidebar menu */

    #guide-button {
      opacity: 0;
      pointer-events: none;
    }
    
    #content > ytd-mini-guide-renderer {
      opacity: 0;
      pointer-events: none;
    }
    
    #guide-inner-content {
      opacity: 0;
      pointer-events: none;
    }`
    document.head.appendChild(style)
  }
  // DISABLE HIDE SIDEBAR MENU ***************************************************
  if (!eHHideMenu || !enhancedHome || !masterHome) {
    // console.log('disabling EHHSM')
    document.querySelectorAll('#eHHideMenu').forEach((instance) => {
      instance.innerHTML = ''
    })
  }
}

const handleValuesHome = (changes) => {
  setTimeout(() => {
    // alert(
    //   `${master} ${hideNotifications} ${hideChannelContent} ${enhancedHome} ${eHHideMenu}`
    // )
    setCssHome()
  }, 100)
}

getValuesHome()
handleValuesHome()

chrome.storage.onChanged.addListener((changes, areaName) => {
  // alert('change in storage')
  // console.log(changes)
  getValuesHome()
  let needToUpdate = false
  relevantValuesHome.forEach((item) => {
    if (Object.keys(changes).includes(item)) {
      needToUpdate = true
    }
    // console.log(Object.keys(changes), item, needToUpdate)
  })
  if (needToUpdate) {
    handleValuesHome(changes)
  }
})

window.addEventListener('load', () => {
  setCssHome()
  // document.body.style.display = 'block'
  document.body.style.opacity = '1'
})

const showLogoAndSearch = setInterval(() => {
  // if pfp is displayed
  if (
    document.querySelector(
      '#buttons > ytd-topbar-menu-button-renderer:nth-child(4)'
    )
  ) {
    document.querySelector('#center').style.opacity = '1'
    document.querySelector('#logo-icon').style.opacity = '1'
    // document.querySelector('ytd-searchbox#search').setAttribute('has-focus', 'true')
    const e = new KeyboardEvent('keydown', { keyCode: 191, which: 191 })
    document.dispatchEvent(e)
    clearInterval(showLogoAndSearch)
  }
}, 100)

document.querySelectorAll('#search')[2].addEventListener('keydown', (e) => {
  if (
    e.key === 'Enter' &&
    document.querySelectorAll('#search')[2].value !== ''
  ) {
    // alert('enter')
    resetForSearch()
  }
})

const resetForSearch = () => {
  // ehHideMenu easy
  document.querySelectorAll('#eHHideMenu').forEach((instance) => {
    instance.innerHTML = ''
  })

  // remove enhancedHome easy
  document.querySelectorAll('#enhancedHome').forEach((instance) => {
    instance.innerHTML = ''
  })

  // remove page manager styling
  document.querySelectorAll('#homeGeneral').forEach((instance) => {
    instance.innerHTML = ''
  })
}

yTLogo = document.querySelector('#search-icon-legacy')
if (yTLogo) {
  yTLogo.addEventListener('click', () => {
    resetForSearch()
  })
}
