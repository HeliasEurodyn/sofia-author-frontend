var infoCardDynamicScripts = {};

function registerInfoCardDynamicScript(id, infoCard) {
  infoCardDynamicScripts[id] = newInfoCardDynamicScript(id);
  infoCardDynamicScripts[id].infoCardRef = infoCard;
}

function defineInfoCardGetFromBackend(id, getFromBackend) {
  if (typeof infoCardDynamicScripts[id].defineGetFromBackend == "function"){
    infoCardDynamicScripts[id].defineGetFromBackend(getFromBackend);
  }
}

function defineInfoCardGetFromUrl(id, getFromUrl) {
  if (typeof infoCardDynamicScripts[id].defineGetFromUrl == "function")
    infoCardDynamicScripts[id].defineGetFromUrl(getFromUrl);
}

function defineInfoCardPostToBackend(id, postToBackend) {
  if (typeof infoCardDynamicScripts[id].definePostToBackend == "function")
    infoCardDynamicScripts[id].definePostToBackend(postToBackend);
}

function defineInfoCardPostToUrl(id, postToUrl) {
  if (typeof infoCardDynamicScripts[id].definePostToUrl == "function")
    infoCardDynamicScripts[id].definePostToUrl(postToUrl);
}

function defineInfoCardPutToBackend(id, putToBackend) {
  if (typeof infoCardDynamicScripts[id].definePutToBackend == "function")
    infoCardDynamicScripts[id].definePutToBackend(putToBackend);
}

function defineInfoCardPutToUrl(id, putToUrl) {
  if (typeof infoCardDynamicScripts[id].definePutToUrl == "function")
    infoCardDynamicScripts[id].definePutToUrl(putToUrl);
}

function defineInfoCardDeleteFromBackend(id, deleteFromBackend) {
  if (typeof infoCardDynamicScripts[id].defineDeleteFromBackend == "function")
    infoCardDynamicScripts[id].defineDeleteFromBackend(deleteFromBackend);
}

function defineInfoCardDeleteFromUrl(id, deleteFromUrl) {
  if (typeof infoCardDynamicScripts[id].defineDeleteFromUrl == "function")
    infoCardDynamicScripts[id].defineDeleteFromUrl(deleteFromUrl);
}

function defineInfoCardNavigator(id, navigate) {
  if (typeof infoCardDynamicScripts[id].defineListNavigator == "function")
    infoCardDynamicScripts[id].defineListNavigator(navigate);
}

function nativeInfoCardEventsHandler(id, type, metadata) {
  if (typeof infoCardDynamicScripts[id].nativeListEventsHandler == "function")
    infoCardDynamicScripts[id].nativeListEventsHandler(type, metadata);
}


