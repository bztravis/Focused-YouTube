const setDarkMode = () => {
  document.querySelector('#titleHeader').src = '/Focused YouTube Dark.svg'
}

const setLightMode = () => {
  document.querySelector('#titleHeader').src = '/Focused YouTube.svg'
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  // alert(event.matches ? "dark" : "light")

  if (event.matches) {
    setDarkMode()
  } else {
    setLightMode()
  }
});

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // dark mode

  setDarkMode()
}