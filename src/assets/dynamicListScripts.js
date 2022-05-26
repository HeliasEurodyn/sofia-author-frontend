var listDynamicScripts = {};

function registerListDynamicScript(id, list) {
  listDynamicScripts[id] = newListDynamicScript(id);
  listDynamicScripts[id].listRef = list;
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

// function nativeFieldEventsHandler(id, entityCode, fieldName, eventtype, eventData)
// {
//   formDynamicScripts[id].nativeFieldEventsHandler(entityCode, fieldName, eventtype, eventData);
// }
//
// function nativeTableButtonClickHandler(id, entityCode, fieldCode, eventtype, event,
//                                        formControlTable, dataLine) {
//   formDynamicScripts[id].nativeTableButtonClickHandler(entityCode, fieldCode, eventtype, event, formControlTable, dataLine);
// }
//
// function nativeTableFieldEventsHandler(id, entityCode, fieldName, eventtype, eventData, formControlTable, dataLine)
// {
//   formDynamicScripts[id].nativeTableFieldEventsHandler(entityCode, fieldName, eventtype, eventData, formControlTable, dataLine);
// }
//
// function defineSetFieldEditable(id, setFieldEditable) {
//   formDynamicScripts[id].defineSetFieldEditable(setFieldEditable);
// }
//
// function defineGetFromBackend(id, getFromBackend) {
//   formDynamicScripts[id].defineGetFromBackend(getFromBackend);
// }
//
// function defineAppendLineToTable(id, appendLineToTable) {
//   formDynamicScripts[id].defineAppendLineToTable(appendLineToTable);
// }
//
// function defineClearTableLines(id, clearTableLines) {
//   formDynamicScripts[id].defineClearTableLines(clearTableLines);
// }
//
// function defineAppendLineToComponent(id, appendLineToComponent) {
//   formDynamicScripts[id].defineAppendLineToComponent(appendLineToComponent);
// }
//
// function defineGetFormDataset(id, getFormDataset) {
//   formDynamicScripts[id].defineGetFormDataset(getFormDataset);
// }
//
// function defineSetFormTitle(id, setFormTitle) {
//   formDynamicScripts[id].defineSetFormTitle(setFormTitle);
// }
//
// function defineSetFormDescription(id, setFormDescription) {
//   formDynamicScripts[id].defineSetFormDescription(setFormDescription);
// }
//
// function defineSetAreaTitle(id, setAreaTitle) {
//   formDynamicScripts[id].defineSetAreaTitle(setAreaTitle);
// }
//
// function defineSetAreaDescription(id, setAreaDescription) {
//   formDynamicScripts[id].defineSetAreaDescription(setAreaDescription);
// }
//
// function defineSetAreaClass(id, setAreaClass) {
//   formDynamicScripts[id].defineSetAreaClass(setAreaClass);
// }
//
// function defineGetArea(id, getArea) {
//   formDynamicScripts[id].defineGetArea(getArea);
// }
//
// function defineSetHeaderTabEditable(id, setHeaderTabEditable) {
//   formDynamicScripts[id].defineSetHeaderTabEditable(setHeaderTabEditable);
// }
//
// function defineSetActionButtonEditable(id, setActionButtonEditable) {
//   formDynamicScripts[id].defineSetActionButtonEditable(setActionButtonEditable);
// }
//
// function defineSaveFormData(id, saveFormData) {
//   formDynamicScripts[id].defineSaveFormData(saveFormData);
// }
//
// function defineSaveAndBackFormData(id, saveAndBackFormData) {
//   formDynamicScripts[id].defineSaveAndBackFormData(saveAndBackFormData);
// }
//
// function defineDeleteFormData(id, deleteFormData) {
//   formDynamicScripts[id].defineDeleteFormData(deleteFormData);
// }
//
// function defineGetParams(id, getParams) {
//   formDynamicScripts[id].defineGetParams(getParams);
// }
//
// function defineSelectedTabNumberFunction(id, setSelectedTabNumber) {
//   formDynamicScripts[id].defineSelectedTabNumberFunction(setSelectedTabNumber);
// }
//
// function defineSelectedTextInputDialog(id, textInputDialog) {
//   formDynamicScripts[id].defineSelectedTextInputDialog(textInputDialog);
// }
//
// function defineSelectedTextDialog(id, textDialog) {
//   formDynamicScripts[id].defineSelectedTextDialog(textDialog);
// }
//
// function defineSelectedOpenPopupDialog(id, openPopup) {
//   formDynamicScripts[id].defineSelectedOpenPopupDialog(openPopup);
// }
//
// function defineSelectedClosePopupDialog(id, closePopup) {
//   formDynamicScripts[id].defineSelectedClosePopupDialog(closePopup);
// }
//
// function definePrintReport(id, printReport) {
//   formDynamicScripts[id].definePrintReport(printReport);
// }
//
// function defineGetFieldValue(id, getFieldValue) {
//   formDynamicScripts[id].defineGetFieldValue(getFieldValue);
// }
//
// function defineSetFieldValue(id, setFieldValue) {
//   formDynamicScripts[id].defineSetFieldValue(setFieldValue);
// }
//
// function defineDataset(id, componentPersistEntityList) {
//   formDynamicScripts[id].defineDataset(componentPersistEntityList);
// }
//
// function defineGetComponentData(id, getComponentData) {
//   formDynamicScripts[id].defineGetComponentData(getComponentData);
// }
//
// function defineSetTableRowActiveById(id, setTableRowActiveById) {
//   formDynamicScripts[id].defineSetTableRowActiveById(setTableRowActiveById);
// }
//
// function defineNavigator(id, navigate) {
//   formDynamicScripts[id].defineNavigator(navigate);
// }
//
// function nativeFormEventsHandler(id, type, metadata) {
//   formDynamicScripts[id].nativeFormEventsHandler(type, metadata);
// }

// function testRunning() {
// //  alert('running');
//   const testRunningClass = new TestRunningClass();
//   formDynamicScripts['what?'] = testRunningClass;
//   formDynamicScripts['what?'].testRunning();
//   //testRunningClass.testRunning()
// }
//
// class TestRunningClass {
//
//   message = null;
//
//   constructor() {
//   }
//
//   testRunning() {
//     // alert(typeof this.testRunning2);
//     if ((typeof this.testRunning2 == "function")) this.testRunning2();
//   }
//
//   testRunning2() {
//   // this.message = 'what';
//     alert(this.message);
//   }
//
// }

