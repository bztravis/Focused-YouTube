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



// get rid of contents and categories

// /* home categories */
// .style-scope.ytd-feed-filter-chip-bar-renderer {
//   opacity: 0;
//   pointer-events: none;
// }

// #contents {
//   opacity: 0;
//   pointer-events: none;
// }