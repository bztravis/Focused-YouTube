let masterHome = true
let enhancedHome = true
let eHHideMenu = false

const relevantValuesHome = [
  'focusedYouTubeMaster',
  'focusedYouTubeEnhancedHome',
  'focusedYouTubeEHHideMenu',
]

const getValuesHome = () => {
  chrome.storage.local.get('focusedYouTubeMaster', (result) => {
    masterHome = result.focusedYouTubeMaster
  })
  chrome.storage.local.get('focusedYouTubeEnhancedHome', (result) => {
    enhancedHome = result.focusedYouTubeEnhancedHome
  })
  chrome.storage.local.get('focusedYouTubeEHHideMenu', (result) => {
    eHHideMenu = result.focusedYouTubeEHHideMenu
  })
}

const setCssHome = () => {
  if (masterHome) {
    let homeGeneral = document.createElement('style')
    homeGeneral.id = 'homeGeneral'
    homeGeneral.innerHTML = `/* home categories */
    .style-scope.ytd-feed-filter-chip-bar-renderer {
      opacity: 0;
      pointer-events: none;
    }`
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
    #contents {
      opacity: 0;
      pointer-events: none;
    }`
    document.head.appendChild(style)
    // console.log('appending')
  }
  // DISABLE EH *****************************************************
  else if (!enhancedHome || !masterHome) {
    console.log('disabling EH')
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
    console.log('disabling EHHSM')
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

document.querySelector('body').addEventListener('click', () => {
  // alert('clicked')
  setCssHome()
})

window.addEventListener('load', (event) => {
  // alert('loaded')
  setCssHome()
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
    document.querySelector('#contents').remove()
    clearInterval(showLogoAndSearch)
  }
}, 100)

document.querySelectorAll('#search')[2].addEventListener('keydown', (e) => {
  if (
    e.key === 'Enter' &&
    document.querySelectorAll('#search')[2].value !== ''
  ) {
    // alert('enter')
    document.querySelector('#center').style.cssText = ''
    document.querySelector('#logo-icon').style.cssText = ''
  }
})