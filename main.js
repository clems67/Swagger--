setTimeout(() => {
  const nbController =
    document.getElementsByClassName("opblock-tag no-desc").length + 1;
  //+1 because of i18nextLng : i don't know why it swpans in localStorage
  console.log(nbController);
  console.log(localStorage.length);

  if (nbController != localStorage.length) {
    for (let i = 0; i < nbController; i++) {
      const controlerName = document
        .getElementsByClassName("opblock-tag no-desc")
        [i].getAttribute("data-tag");
      localStorage.setItem(controlerName, "false");
    }
  }
  ChangeSpanIfNeeded(GetFavorits());
}, 500);

chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
  console.log("listener worked ! its response :");
  console.log(response);
  switch (response.responseType) {
    case "i_need_the_controlers":
      console.log({ favoritList: GetFavorits(), spanList: GetSpanList() });
      sendResponse({ favoritList: GetFavorits(), spanList: GetSpanList() });
      break;
    case "change_favorits":
      UpdateFavoritList(response.favoritList);
      ChangeSpanIfNeeded(response.favoritList);
      break;
    case "delete_favorite":
      break;
    default:
      console.log("ERREUR C'EST PASSÉ DANS LE DEFAULT : main.js adListener");
  }
});

function UpdateFavoritList(newFavoritList) {
  for (const item in newFavoritList) {
    localStorage.setItem(item, newFavoritList[item]);
  }
}

function ChangeSpanIfNeeded(favoritList) {
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
      favoritList[
        document
          .getElementsByClassName("opblock-tag no-desc")
          [i].getAttribute("data-tag")
      ] == "true"
        ? true
        : false;

    if (isSpanDeveloped !== isTrueInFavorit) {
      document.getElementsByClassName("opblock-tag no-desc")[i].click();
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
