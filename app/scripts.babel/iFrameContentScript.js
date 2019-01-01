setTimeout(() => {
  console.log(
    document.getElementById(
      "ctl00_ContentPlaceHolderContent_tbWorkSheetDataList_23"
    )
  );

  document
    .getElementById("ctl00_ContentPlaceHolderContent_tbWorkSheetDataList_23")
    .click();

  setTimeout(() => {
    document.getElementById("STARTDATE_txtDate").value = date;

    document.getElementById("STARTTIME_txtTime").value = "0830";

    document.getElementById("ENDDATE_txtDate").value = date;

    document.getElementById("ENDTIME_txtTime").value = "1730";
  }, 3000);
}, 3000);
