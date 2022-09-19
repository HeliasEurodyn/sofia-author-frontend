var listDynamicScripts = {};

function registerListDynamicScript(id, list) {
  listDynamicScripts[id] = newListDynamicScript(id);
  listDynamicScripts[id].listRef = list;
}

function calcPivotValueBranch(id, field, rows, leftArrayLine, topArrayLine) {
  if (typeof listDynamicScripts[id].calcPivotValueBranch == "function"){
   return listDynamicScripts[id].calcPivotValueBranch(field, rows, leftArrayLine, topArrayLine);
  } else {
    return null;
  }
}

function pivotCellClick(id, field) {
  if (typeof listDynamicScripts[id].pivotCellClick == "function"){
    listDynamicScripts[id].pivotCellClick(field);
  }
}

function defineListGetFromBackend(id, getFromBackend) {
  if (typeof listDynamicScripts[id].defineGetFromBackend == "function"){
    listDynamicScripts[id].defineGetFromBackend(getFromBackend);
  }
}

function defineListGetFromUrl(id, getFromUrl) {
  if (typeof listDynamicScripts[id].defineGetFromUrl == "function")
    listDynamicScripts[id].defineGetFromUrl(getFromUrl);
}

function defineListPostToBackend(id, postToBackend) {
  if (typeof listDynamicScripts[id].definePostToBackend == "function")
    listDynamicScripts[id].definePostToBackend(postToBackend);
}

function defineListPostToUrl(id, postToUrl) {
  if (typeof listDynamicScripts[id].definePostToUrl == "function")
    listDynamicScripts[id].definePostToUrl(postToUrl);
}

function defineListPutToBackend(id, putToBackend) {
  if (typeof listDynamicScripts[id].definePutToBackend == "function")
    listDynamicScripts[id].definePutToBackend(putToBackend);
}

function defineListPutToUrl(id, putToUrl) {
  if (typeof listDynamicScripts[id].definePutToUrl == "function")
    listDynamicScripts[id].definePutToUrl(putToUrl);
}

function defineListDeleteFromBackend(id, deleteFromBackend) {
  if (typeof listDynamicScripts[id].defineDeleteFromBackend == "function")
    listDynamicScripts[id].defineDeleteFromBackend(deleteFromBackend);
}

function defineListDeleteFromUrl(id, deleteFromUrl) {
  if (typeof listDynamicScripts[id].defineDeleteFromUrl == "function")
    listDynamicScripts[id].defineDeleteFromUrl(deleteFromUrl);
}

function listNativeRowButtonClickHandler(id, fieldCode, row) {
 listDynamicScripts[id].listNativeRowButtonClickHandler(fieldCode, row);
}

function listNativeHeaderButtonClickHandler(id, fieldCode, row) {
 listDynamicScripts[id].listNativeHeaderButtonClickHandler(fieldCode, row);
}

function defineListNavigator(id, navigate) {
 listDynamicScripts[id].defineListNavigator(navigate);
}

function nativeListEventsHandler(id, type, metadata) {
  listDynamicScripts[id].nativeListEventsHandler(type, metadata);
}


