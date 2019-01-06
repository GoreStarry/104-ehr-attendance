"use strict";

chrome.runtime.onMessage.addListener(function(
  { date, startTime, endTime, tabId },
  sender,
  sendResponse
) {
  sendResponse({ content: "來自內容腳本的回覆" });
  add(date, startTime, endTime, tabId);
});

function add(date, startTime, endTime, tabId) {
  // 點選表單申請

  try {
    document.querySelectorAll(".items .item")[1].click();
  } catch (error) {
    console.log(error);
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

    iframeWindow.document.getElementById("STARTTIME_txtTime").value = startTime;

    iframeWindow.document.getElementById(
      "ENDDATE_txtDate"
    ).value = inputDateValue;

    iframeWindow.document.getElementById("ENDTIME_txtTime").value = endTime;

    iframeWindow.document.getElementById("btn_Submit").click();
  }
}
