// chrome.tabs.onActivated.addListener((tab) => {
//   console.log(tab)
//   chrome.tabs.get(tab.tabId, (currentTabData) => {
//     console.log(currentTabData)
//   })
// })

// stopped following video at 17:17


console.log('working')

// document.querySelector('#sendMessage').addEventListener('click', () => {
//   chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
//     let activeTab = tabs[0]
//     chrome.tabs.sendMessage(activeTab.id, {command: "do ssomething"})
//   })
// })

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  console.log('hi')
  response({text: 'This is a response'})
  return true
})
