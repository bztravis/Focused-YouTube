// alert('hi')

// const taco = 12

// export default taco

// const sendMessageButton = document.getElementById('sendMessage')
// sendMessageButton.onclick = async function (e) {
//   let queryOptions = { active: true, currentWindow: true }
//   let tab = await chrome.tabs.query(queryOptions)

//   chrome.tabs.sendMessage(
//     tabs[0].id,
//     { color: '#00FF00' },
//     function (response) {
//       console.log(response.status)
//     }
//   )
// }

document.querySelector('#check').addEventListener('click', () => {
  chrome.storage.local.set({'isChecked': document.querySelector('#check').checked})
})