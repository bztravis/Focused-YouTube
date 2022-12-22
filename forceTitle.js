const originalTitle = document.title

let firstUsefulLetter = 0

if (originalTitle[0] === '(') {
  for (; firstUsefulLetter < originalTitle.length; firstUsefulLetter++) {
    if (originalTitle[firstUsefulLetter] === ')') {
      firstUsefulLetter += 2
      break
    }
  }
}

document.title = originalTitle.slice(firstUsefulLetter)