document
  .getElementById("allCheckboxTrue")
  .addEventListener("click", function () {
    console.log("it works");
    console.log(document.querySelectorAll('input[type="checkbox"]'));
    const checkboxList = document.querySelectorAll('input[type="checkbox"]');
    for (let item in checkboxList) {
      console.log(checkboxList[item]);
      checkboxList[item].checked = false;
      checkboxList[item].click();
    }
    //   document.querySelectorAll('input[type="checkbox"]').checked = true;
  });

document
  .getElementById("allCheckboxFalse")
  .addEventListener("click", function () {
    console.log("it works");
    console.log(document.querySelectorAll('input[type="checkbox"]'));
    const checkboxList = document.querySelectorAll('input[type="checkbox"]');
    for (let item in checkboxList) {
      console.log(checkboxList[item]);
      checkboxList[item].checked = true;
      checkboxList[item].click();
    }
    //   document.querySelectorAll('input[type="checkbox"]').checked = true;
  });

let oldToggleList = {};

(async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  const response = await chrome.tabs.sendMessage(tab.id, {
    responseType: "i_need_the_controlers",
  });
  // do something with response here, not outside the function
  console.log(response);
  const favoritList = response.favoritList;
  const spanList = response.spanList;
  for (let span in spanList) {
    for (let key in favoritList) {
      if (key === spanList[span]) {
        insertTable(key, favoritList[key]);
        oldToggleList[key] = favoritList[key];
      }
    }
  }
})();

function insertTable(element, checkbox) {
  var table = document.getElementById("myTable");
  var row = document.createElement("tr");
  var cell1 = document.createElement("input");
  cell1.id = "checkbox_" + element;
  cell1.type = "checkbox";
  const checkboxValue = checkbox == "true" ? true : false;
  cell1.checked = checkboxValue;
  cell1.addEventListener("change", toggleFunc);
  var cell2 = document.createElement("td");
  cell2.id = element;
  cell2.innerHTML = element;
  row.appendChild(cell1);
  row.appendChild(cell2);
  table.appendChild(row);
}

function toggleFunc() {
  for (let item in oldToggleList) {
    let oldBoolOutput =
      oldToggleList[item].toLowerCase() == "true" ? true : false;
    let newBoolOutput = document.getElementById("checkbox_" + item).checked;
    if (oldBoolOutput !== newBoolOutput) {
      oldToggleList[item] = oldBoolOutput == true ? "false" : "true";
      console.log(item);
      //console.log(oldToggleList[item]);
      //console.log(document.getElementById("checkbox_" + item).checked);
    }
  }
  console.log(oldToggleList);

  (async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });

    const response = await chrome.tabs.sendMessage(tab.id, {
      responseType: "change_favorits",
      favoritList: oldToggleList,
    });
    // do something with response here, not outside the function
  })();
}
