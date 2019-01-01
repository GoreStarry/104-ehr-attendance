"use strict";

Date.prototype.toDateInputValue = function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};

// chrome.storage.sync.get("color", function(data) {
//   let changeColor = document.getElementById("changeColor");
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute("value", data.color);
// });

document.addEventListener("DOMContentLoaded", function(dcle) {
  initDateInput();

  // var dButtonEvent = document.getElementById("button1");
  var btnSubmit = document.getElementById("btn-submit");
  var inputDate = document.getElementById("input-date");

  //點擊按鈕，向事件腳本發送訊息
  // dButtonEvent.addEventListener("click", function(ce) {
  //   chrome.runtime.sendMessage(
  //     { content: "你好，此訊息來自彈出視窗腳本" },
  //     function(response) {
  //       console.log(response);
  //     }
  //   );
  // });

  console.log(inputDate.value);
  console.log(typeof inputDate.value);

  // 點擊按鈕，向內容腳本發送訊息
  btnSubmit.addEventListener("click", function(ce) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          content: "你好，此訊息來自彈出視窗腳本",
          date: inputDate.value,
          tabId: tabs[0].id,
        },
        function(response) {
          console.log(response);
        }
      );
    });
  });
});

function initDateInput() {
  document.getElementById("input-date").value = new Date().toDateInputValue();
}
