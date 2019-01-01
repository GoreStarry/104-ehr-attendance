"use strict";

console.log("'Allo 'Allo! Content 22");

// chrome.browserAction.clicked.addListener(function(tab) {
//   chrome.tabs.executeScript({
//     code: 'document.body.style.backgroundColor="red"',
//   });
// });

var toggleBg = true;

chrome.runtime.onMessage.addListener(function(
  { date, tabId },
  sender,
  sendResponse
) {
  console.log(sender);
  sendResponse({ content: "來自內容腳本的回覆" });
  if (toggleBg) {
    document.body.style.backgroundColor = "red";
    toggleBg = !toggleBg;
  } else {
    document.body.style.backgroundColor = "black";
    toggleBg = !toggleBg;
  }
  add(date, tabId);
});

function add(date, tabId) {
  // 點選表單申請

  try {
    document.querySelectorAll(".items .item")[1].click();
  } catch (error) {
    // console.log(error);
  }

  const iframe = document.getElementById("frmMAIN");
  const iframeWindow = iframe.contentWindow;

  iframe.addEventListener("load", clickAttendanceTicket);

  // 點選出缺勤紀錄表
  function clickAttendanceTicket() {
    try {
      iframe.removeEventListener("load", clickAttendanceTicket);
      iframe.addEventListener("load", completeAttendanceForm);
      iframeWindow.document
        .getElementById(
          "ctl00_ContentPlaceHolderContent_tbWorkSheetDataList_23"
        )
        .click();
    } catch (error) {}
  }

  function completeAttendanceForm() {
    iframe.removeEventListener("load", completeAttendanceForm);
    const inputDateValue = date.replace(/\-/g, "/");

    iframeWindow.document.getElementById(
      "STARTDATE_txtDate"
    ).value = inputDateValue;

    iframeWindow.document.getElementById("STARTTIME_txtTime").value = "0830";

    iframeWindow.document.getElementById(
      "ENDDATE_txtDate"
    ).value = inputDateValue;

    iframeWindow.document.getElementById("ENDTIME_txtTime").value = "1730";

    iframeWindow.document.getElementById("btn_Submit").click();
  }

  // setTimeout(() => {
  //   const inputDateValue = date.replace(/\-/g, "/");
  //   const iframe = document.getElementById("frmMAIN").contentWindow;
  //   iframe.document.getElementById("STARTDATE_txtDate").value = inputDateValue;

  //   iframe.document.getElementById("STARTTIME_txtTime").value = "0830";

  //   iframe.document.getElementById("ENDDATE_txtDate").value = inputDateValue;

  //   iframe.document.getElementById("ENDTIME_txtTime").value = "1730";
  // }, 5000);

  // iframe.document.getElementById('btn_Submit').click()
  // console.log(date, tabId);
  // chrome.runtime.sendMessage(
  //   undefined,
  //   { type: "redirect", date, tabId },
  //   undefined,
  //   res => {
  //     console.log(res);
  //     chrome.runtime.sendMessage(
  //       undefined,
  //       { type: "entry", date, tabId },
  //       undefined,
  //       res => {
  //         console.log(res);
  //       }
  //     );
  //   }
  // );

  // document.getElementById("btn_Submit").click();
}
