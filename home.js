let attempts = 0

const forceTitleInterval = setInterval(() => {
  // console.log('attempting')
  const originalTitle = document.title

  let firstUsefulLetter = 0

  if (originalTitle[0] === '(') {
    // alert('working')
    for (; firstUsefulLetter < originalTitle.length; firstUsefulLetter++) {
      if (originalTitle[firstUsefulLetter] === ')') {
        firstUsefulLetter += 2
        break
      }
    }
  }

  document.title = originalTitle.slice(firstUsefulLetter)
  if (document.title[0] !== '(' || attempts > 30) {
    // 30 sec of attempts
    clearInterval(forceTitleInterval)
  }

  attempts++
}, 1000)

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
