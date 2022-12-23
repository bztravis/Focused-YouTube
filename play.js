// import popupJS from './popup'

// alert(popupJS)

const forceTheater = setInterval(function () {
  let video = document.querySelector('.html5-video-container')
  if (video) {
    let theaterActive = video.offsetWidth == window.innerWidth

    let tBtn = document.getElementsByClassName('ytp-size-button')
    button = tBtn[0]

    if (button != null) {
      if (!theaterActive) {
        button.click()
      }

      button.remove()

      if (theaterActive) {
        clearInterval(forceTheater)
      }
    }
  }
}, 1000)

let isChecked = false

// chrome.storage.local.get('isChecked', (result) => {
//   isChecked = result.isChecked
//   // alert(isChecked)
//   // Use the value of isChecked in your content script

//   if (isChecked) {
//     const checkChecked = setInterval(() => {
//       console.log('hi there')
//       if (
//         document.querySelector(
//           'ytd-browse[page-subtype~=channels] ytd-two-column-browse-results-renderer.ytd-browse'
//         )
//       )
//         document.querySelector(
//           'ytd-browse[page-subtype~=channels] ytd-two-column-browse-results-renderer.ytd-browse'
//         ).style.display = 'none'
//       clearInterval(checkChecked)
//     }, 100)
//   }
// })



document.querySelector('#logo-icon').addEventListener('click', () => {window.open("https://www.youtube.com","_self")})
