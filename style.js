// replaces elemetns of style.css and play.js

let master = true
let hideNotifications = true
let hideChannelContent = true
let enhancedHome = true
let eHHideMenu = false

relevantValues = [
  'focusedYouTubeMaster',
  'focusedYouTubeHideNotifications',
  'focusedYouTubeHideChannelContent',
  'focusedYouTubeEnhancedHome',
  'focusedYouTubeEHHideMenu',
]

const getValues = () => {
  chrome.storage.local.get('focusedYouTubeMaster', (result) => {
    master = result.focusedYouTubeMaster
  })
  chrome.storage.local.get('focusedYouTubeHideNotifications', (result) => {
    hideNotifications = result.focusedYouTubeHideNotifications
  })
  chrome.storage.local.get('focusedYouTubeHideChannelContent', (result) => {
    hideChannelContent = result.focusedYouTubeHideChannelContent
  })
  chrome.storage.local.get('focusedYouTubeEnhancedHome', (result) => {
    enhancedHome = result.focusedYouTubeEnhancedHome
  })
  chrome.storage.local.get('focusedYouTubeEHHideMenu', (result) => {
    eHHideMenu = result.focusedYouTubeEHHideMenu
  })
}

const setCSS = (changes) => {
  // alert('working')
  if (master) {
    // alert('trying to delete body')
    document.querySelector('body').remove()
  } else {
    // alert('turning off')
    console.log(changes)
    if (changes && changes.focusedYouTubeMaster && changes.focusedYouTubeMaster.oldValue) {
      document.location.reload()
    }
  }
}

const handleValues = (changes) => {
  setTimeout(() => {
    // alert(
    //   `${master} ${hideNotifications} ${hideChannelContent} ${enhancedHome} ${eHHideMenu}`
    // )
    setCSS(changes)
  }, 1)
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
    console.log(Object.keys(changes), item, needToUpdate)
  })
  if (needToUpdate) {
    handleValues(changes)
  }
})
