//setup when swagger finish to load
setTimeout(() => {
  let buttonShow = document.createElement("button");
  buttonShow.id = "buttonShow";
  buttonShow.textContent = "Show everything";
  let buttonHide = document.createElement("button");
  buttonHide.id = "buttonHide";
  buttonHide.textContent = "Hide everything";

  let activityNode = document.getElementsByClassName("wrapper")[3];
  let parentDiv = activityNode.parentNode;
  parentDiv.insertBefore(buttonShow, activityNode);
  parentDiv.insertBefore(buttonHide, activityNode);

  buttonShow.addEventListener("click", ShowEverything);
  buttonHide.addEventListener("click", HideEverything);

  //first setup :
  const nbController = document.getElementsByClassName(
    "opblock-tag no-desc"
  ).length;
  ChangeSpanIfDifferentFromFavorits();
}, 400);

loop = setInterval(() => {
  IfSpanDifferentSaveTofavorite();
}, 500);

function ShowEverything() {
  let nbController = document.getElementsByClassName(
    "opblock-tag no-desc"
  ).length;
  for (let i = 0; i < nbController; i++) {
    const controlerName = document
      .getElementsByClassName("opblock-tag no-desc")
      [i].getAttribute("data-tag");
    localStorage.setItem(controlerName, "true");
  }
  ChangeSpanIfDifferentFromFavorits();
}

function HideEverything() {
  let nbController = document.getElementsByClassName(
    "opblock-tag no-desc"
  ).length;
  for (let i = 0; i < nbController; i++) {
    const controlerName = document
      .getElementsByClassName("opblock-tag no-desc")
      [i].getAttribute("data-tag");
    localStorage.setItem(controlerName, "false");
  }
  ChangeSpanIfDifferentFromFavorits();
}

function ChangeSpanIfDifferentFromFavorits() {
  for (
    let i = 0;
    i < document.getElementsByClassName("opblock-tag no-desc").length;
    i++
  ) {
    const isSpanDeveloped =
      document
        .getElementsByClassName("opblock-tag no-desc")
        [i].getAttribute("data-is-open") == "true"
        ? true
        : false;
    const isTrueInFavorit =
      localStorage.getItem(
        document
          .getElementsByClassName("opblock-tag no-desc")
          [i].getAttribute("data-tag")
      ) == "true"
        ? true
        : false;

    if (isSpanDeveloped !== isTrueInFavorit) {
      document.getElementsByClassName("opblock-tag no-desc")[i].click();
    }
  }
}

function IfSpanDifferentSaveTofavorite() {
  for (
    let i = 0;
    i < document.getElementsByClassName("opblock-tag no-desc").length;
    i++
  ) {
    const isSpanDeveloped =
      document
        .getElementsByClassName("opblock-tag no-desc")
        [i].getAttribute("data-is-open") == "true"
        ? true
        : false;
    const isTrueInFavorit =
      localStorage.getItem(
        document
          .getElementsByClassName("opblock-tag no-desc")
          [i].getAttribute("data-tag")
      ) == "true"
        ? true
        : false;

    if (isSpanDeveloped !== isTrueInFavorit) {
      const spanName = document
        .getElementsByClassName("opblock-tag no-desc")
        [i].getAttribute("data-tag");
      localStorage.setItem(spanName, isSpanDeveloped);
    }
  }
}

function GetFavorits() {
  let favorits = {};
  for (let i = 0; i < localStorage.length; i++) {
    const theKey = localStorage.key(i);
    const theValue = localStorage.getItem(localStorage.key(i));
    favorits[theKey] = theValue;
  }
  return favorits;
}

function GetSpanList() {
  let returnedList = {};
  const nbController = document.getElementsByClassName(
    "opblock-tag no-desc"
  ).length;
  for (let i = 0; i < nbController; i++) {
    returnedList[i] = document
      .getElementsByClassName("opblock-tag no-desc")
      [i].getAttribute("data-tag");
  }
  return returnedList;
}
