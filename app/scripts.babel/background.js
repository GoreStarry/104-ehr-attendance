"use strict";

//指定比對的url：不允許片段表達式
//例如： *://*.google.com.tw/* 作為查詢字串不被接受因為host是一個片段表達式
var urlPattern = "*://ehrms.tmnewa.com.tw/*";

//利用 tabs.query api 查找畫面上的所有tab
function queryTabsAndShowPageActions(queryObject) {
  chrome.tabs.query(queryObject, function(tabs) {
    if (tabs && tabs.length > 0) {
      for (var i = 0; i < tabs.length; i++) {
        console.log(tabs[i].status);
        //在加載完畢的tab上，使用chrome.pageAction.show 啟用按鈕
        if (tabs[i].status === "complete") chrome.pageAction.show(tabs[i].id);
      }
    }
  });
}

//第一次的初始化
chrome.runtime.onInstalled.addListener(function() {
  queryTabsAndShowPageActions({
    active: false,
    currentWindow: true,
    url: urlPattern,
  });
});

//接收
// chrome.runtime.onMessage.addListener(function(
//   { type, date, tabId },
//   sender,
//   sendResponse
// ) {
//   console.log(type, date, tabId);
//   console.log(sender);

//   const inputDateValue = date.replace(/\-/g, "/");
//   console.log(inputDateValue);

//   if (type === "redirect") {
//     chrome.tabs.executeScript(
//       tabId,
//       {
//         // frameId: frameIdToInject,
//         // file: "scripts/iFrameContentScript.js",
//         code: `

//         try {
//           document
//           .getElementById("ctl00_ContentPlaceHolderContent_tbWorkSheetDataList_23")
//           .click();

//         } catch (error) {

//         }

//         `,
//         allFrames: true,
//       },
//       function(results) {
//         //Handle any results
//         console.log(results);
//       }
//     );
//   } else if (type === "entry") {
//     console.log("in entry");
//     chrome.tabs.executeScript(
//       tabId,
//       {
//         // frameId: frameIdToInject,
//         // file: "scripts/iFrameContentScript.js",
//         code: `setTimeout(() => {

//               const iframe = document.getElementById("frmMAIN").contentWindow;

//               iframe.document.getElementById("STARTDATE_txtDate").value = "${inputDateValue}";

//               iframe.document.getElementById("STARTTIME_txtTime").value = "0830";

//               iframe.document.getElementById("ENDDATE_txtDate").value = "${inputDateValue}";

//               iframe.document.getElementById("ENDTIME_txtTime").value = "1730";

//               // iframe.document.getElementById('btn_Submit').click()

//             }, 5000)
//           `,
//         allFrames: true,
//         runAt: "document_end",
//       },
//       function(results) {
//         //Handle any results
//         console.log(results);
//       }
//     );
//   }
//   sendResponse({ content: "來自事件腳本的回覆" });
// });

//每次tab有變動，檢查現在這個current tab是否在指定的 url pattern底下
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  queryTabsAndShowPageActions({
    active: true,
    currentWindow: true,
    url: urlPattern,
  });
});

// chrome.runtime.onInstalled.addListener(details => {
//   console.log("The color is green.");
//   console.log("previousVersion", details.previousVersion);

//   chrome.storage.sync.set({ color: "#3aa757" }, function() {
//     console.log("The color is green.");
//   });

//   // chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//   //   chrome.declarativeContent.onPageChanged.addRules([
//   //     {
//   //       conditions: [
//   //         new chrome.declarativeContent.PageStateMatcher({
//   //           pageUrl: { hostEquals: "ehrms.tmnewa.com.tw" },
//   //         }),
//   //       ],
//   //       actions: [new chrome.declarativeContent.ShowPageAction()],
//   //     },
//   //   ]);
//   // });

//   chrome.tabs.query({ active: true }, function(tabs) {
//     console.log(tabs);
//     // chrome.tabs.update(tabs[0].id, { url: "www.google.com" });
//   });

//   chrome.browserAction.onClick.addListener(tab => {
//     chrome.tabs.create({
//       url: "https://ehrms.tmnewa.com.tw/ehrportal/LoginFOrginal.asp",
//     });
//   });
// });

// chrome.browserAction.setBadgeText({ text: "下班囉" });

console.log("'Allo 'Allo! Event Page for Browser Action");
