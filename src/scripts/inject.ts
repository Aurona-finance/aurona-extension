/* eslint-disable @typescript-eslint/naming-convention */
import { ACTION_TYPE } from '../static/index'
// Gets events from webpage
// console.log(chrome.runtime.id)

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (
    request.type === ACTION_TYPE.REQUEST_RESOLVED ||
    request.type === ACTION_TYPE.ENABLE_DONE ||
    request.type === ACTION_TYPE.NETWORK_CHANGE ||
    request.type === ACTION_TYPE.WALLET_CHANGE
  ) {
    window.postMessage(request, '*')
  }
})
// proxy
// Gets events from content
// Sends event to extension background
window.addEventListener(
  'message',
  function (event) {
    if (
      event.data.type &&
      // @ts-expect-error
      ACTION_TYPE[event.data.type] &&
      event.data.type !== ACTION_TYPE.REQUEST_RESOLVED &&
      event.data.type !== ACTION_TYPE.ENABLE_DONE &&
      event.data.type !== ACTION_TYPE.NETWORK_CHANGE &&
      event.data.type !== ACTION_TYPE.WALLET_CHANGE
    ) {
      chrome.runtime.sendMessage({
        ...event.data
      })
    }
  },
  false
)
function injectScript(file_path: string, tag: string) {
  var script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  script.setAttribute('src', file_path)
  document.documentElement.appendChild(script)
}
injectScript(chrome.extension.getURL('content.js'), 'body')
