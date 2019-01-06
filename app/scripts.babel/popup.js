"use strict";

Date.prototype.toDateInputValue = function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return {
    date: local.toJSON().slice(0, 10),
    hour: local.toJSON().slice(11, 13),
    minute: local.toJSON().slice(14, 16),
  };
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var form = document.getElementById("form");
var btnSubmit = document.getElementById("btn-submit");
var inputDate = document.getElementById("input-date");
var inputTimeStart = document.getElementById("input-start");
var inputTimeEnd = document.getElementById("input-end");

document.addEventListener("DOMContentLoaded", function() {
  initDateInput();

  form.addEventListener(
    "submit",
    function(e) {
      e.preventDefault();

      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            content: "你好，此訊息來自彈出視窗腳本",
            date: inputDate.value,
            startTime: inputTimeStart.value,
            endTime: inputTimeEnd.value,
            tabId: tabs[0].id,
          },
          function(response) {
            console.log(response);
          }
        );
      });
    },
    false
  );

  // 點擊按鈕，向內容腳本發送訊息
  // btnSubmit.addEventListener("click", function() {
  //   if (form.checkValidity()) {
  //     form.submit();
  //   } else {
  //     form.querySelector('input[type="submit"]').click();
  //   }
  // });
});

function initDateInput() {
  const { date, hour, minute } = new Date().toDateInputValue();
  inputDate.value = date;
  inputTimeStart.value = "08" + `${30 - getRandom(0, 10)}`;
  inputTimeEnd.value = hour + minute;
}
