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
  if (document.title[0] !== '(' || attempts > 30) {  // 30 sec of attempts
    clearInterval(forceTitleInterval)
  }
  
  attempts++
}, 1000)
