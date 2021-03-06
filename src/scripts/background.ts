import { ACTION_TYPE } from '@static/index'
console.log('Backgound init')
// Each time we open extension we generate nonce
// that will be used as temporary password after user unlocks wallet
const nonce = Math.random()
const init = async () => {
  chrome.storage.local.set({ nonce: nonce.toString() })
}
init()
const connectedTabs = new Set<number>()
const requestMap = new Map<string, { id: string; type: ACTION_TYPE; tabId: number; data: any }>()
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === ACTION_TYPE.REQUEST_NEW || request.type === ACTION_TYPE.ENABLE) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0].id) {
        connectedTabs.add(tabs[0].id)
        requestMap.set(request.id, { ...request, tabId: tabs[0].id })
        chrome.storage.local.set({ key: { ...request, tabId: tabs[0].id } }, function () {
          if (chrome.runtime.lastError) {
          }
        })
      }
    })

    chrome.windows.create({
      url: 'popup.html',
      type: 'popup',
      height: 600,
      width: 360,
      focused: true,
      left: 1000
    })
  }

  if (request.type === ACTION_TYPE.NETWORK_CHANGE) {
    for (const tab of connectedTabs) {
      chrome.tabs.sendMessage(tab, { ...request })
    }
  }
  if (request.type === ACTION_TYPE.REQUEST_RESOLVED || request.type === ACTION_TYPE.ENABLE_DONE) {
    const req = requestMap.get(request.id)
    if (req) {
      chrome.tabs.sendMessage(req.tabId, { ...request })
      requestMap.delete(request.id)
    }
  }
})
