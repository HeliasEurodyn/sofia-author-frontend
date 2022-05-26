var formDynamicScripts = {};

function registerFormDynamicScript(id, form) {
  formDynamicScripts[id] = newFormDynamicScript(id);
  formDynamicScripts[id].formRef = form;
}

function nativeButtonClickHandler(id, fieldCode) {
  formDynamicScripts[id].nativeButtonClickHandler(fieldCode);
}

function nativeFieldEventsHandler(id, entityCode, fieldName, eventtype, eventData)
{
  formDynamicScripts[id].nativeFieldEventsHandler(entityCode, fieldName, eventtype, eventData);
}

function nativeTableButtonClickHandler(id, entityCode, fieldCode, eventtype, event,
                                       formControlTable, dataLine) {
  formDynamicScripts[id].nativeTableButtonClickHandler(entityCode, fieldCode, eventtype, event, formControlTable, dataLine);
}

function nativeTableFieldEventsHandler(id, entityCode, fieldName, eventtype, eventData, formControlTable, dataLine)
{
  formDynamicScripts[id].nativeTableFieldEventsHandler(entityCode, fieldName, eventtype, eventData, formControlTable, dataLine);
}

function defineSetFieldEditable(id, setFieldEditable) {
  formDynamicScripts[id].defineSetFieldEditable(setFieldEditable);
}

function defineGetFromBackend(id, getFromBackend) {
  formDynamicScripts[id].defineGetFromBackend(getFromBackend);
}

function defineGetFromUrl(id, getFromUrl) {
  if (typeof formDynamicScripts[id].defineGetFromUrl == "function")
  formDynamicScripts[id].defineGetFromUrl(getFromUrl);
}

function definePostToBackend(id, postToBackend) {
  if (typeof formDynamicScripts[id].definePostToBackend == "function")
  formDynamicScripts[id].definePostToBackend(postToBackend);
}

function definePostToUrl(id, postToUrl) {
  if (typeof formDynamicScripts[id].definePostToUrl == "function")
  formDynamicScripts[id].definePostToUrl(postToUrl);
}

function definePutToBackend(id, putToBackend) {
  if (typeof formDynamicScripts[id].definePutToBackend == "function")
  formDynamicScripts[id].definePutToBackend(putToBackend);
}

function definePutToUrl(id, putToUrl) {
  if (typeof formDynamicScripts[id].definePutToUrl == "function")
  formDynamicScripts[id].definePutToUrl(putToUrl);
}

function defineDeleteFromBackend(id, deleteFromBackend) {
  if (typeof formDynamicScripts[id].defineDeleteFromBackend == "function")
  formDynamicScripts[id].defineDeleteFromBackend(deleteFromBackend);
}

function defineDeleteFromUrl(id, deleteFromUrl) {
  if (typeof formDynamicScripts[id].defineDeleteFromUrl == "function")
  formDynamicScripts[id].defineDeleteFromUrl(deleteFromUrl);
}


function defineAppendLineToTable(id, appendLineToTable) {
  if (typeof formDynamicScripts[id].defineAppendLineToTable == "function")
  formDynamicScripts[id].defineAppendLineToTable(appendLineToTable);
}

function defineClearTableLines(id, clearTableLines) {
  formDynamicScripts[id].defineClearTableLines(clearTableLines);
}

function defineAppendLineToComponent(id, appendLineToComponent) {
  formDynamicScripts[id].defineAppendLineToComponent(appendLineToComponent);
}

function defineGetFormDataset(id, getFormDataset) {
  formDynamicScripts[id].defineGetFormDataset(getFormDataset);
}

function defineSetFormTitle(id, setFormTitle) {
  formDynamicScripts[id].defineSetFormTitle(setFormTitle);
}

function defineSetFormDescription(id, setFormDescription) {
  formDynamicScripts[id].defineSetFormDescription(setFormDescription);
}

function defineSetAreaTitle(id, setAreaTitle) {
  formDynamicScripts[id].defineSetAreaTitle(setAreaTitle);
}

function defineSetAreaDescription(id, setAreaDescription) {
  formDynamicScripts[id].defineSetAreaDescription(setAreaDescription);
}

function defineSetAreaClass(id, setAreaClass) {
  formDynamicScripts[id].defineSetAreaClass(setAreaClass);
}

function defineGetArea(id, getArea) {
  formDynamicScripts[id].defineGetArea(getArea);
}

function defineSetHeaderTabEditable(id, setHeaderTabEditable) {
  formDynamicScripts[id].defineSetHeaderTabEditable(setHeaderTabEditable);
}

function defineSetActionButtonEditable(id, setActionButtonEditable) {
  formDynamicScripts[id].defineSetActionButtonEditable(setActionButtonEditable);
}

function defineSaveFormData(id, saveFormData) {
  formDynamicScripts[id].defineSaveFormData(saveFormData);
}

function defineSaveAndBackFormData(id, saveAndBackFormData) {
  formDynamicScripts[id].defineSaveAndBackFormData(saveAndBackFormData);
}

function defineDeleteFormData(id, deleteFormData) {
  formDynamicScripts[id].defineDeleteFormData(deleteFormData);
}

function defineGetParams(id, getParams) {
  formDynamicScripts[id].defineGetParams(getParams);
}

function defineSelectedTabNumberFunction(id, setSelectedTabNumber) {
  formDynamicScripts[id].defineSelectedTabNumberFunction(setSelectedTabNumber);
}

function defineSelectedTextInputDialog(id, textInputDialog) {
  formDynamicScripts[id].defineSelectedTextInputDialog(textInputDialog);
}

function defineSelectedTextDialog(id, textDialog) {
  formDynamicScripts[id].defineSelectedTextDialog(textDialog);
}

function defineNotificationDialog(id, notificationDialog) {
  formDynamicScripts[id].defineNotificationDialog(notificationDialog);
}

function defineSelectedOpenPopupDialog(id, openPopup) {
  formDynamicScripts[id].defineSelectedOpenPopupDialog(openPopup);
}

function defineSelectedClosePopupDialog(id, closePopup) {
  formDynamicScripts[id].defineSelectedClosePopupDialog(closePopup);
}

function definePrintReport(id, printReport) {
  formDynamicScripts[id].definePrintReport(printReport);
}

function defineGetFieldValue(id, getFieldValue) {
  formDynamicScripts[id].defineGetFieldValue(getFieldValue);
}

function defineGetFormFieldsByCode(id, getField) {
  formDynamicScripts[id].defineGetFormFieldsByCode(getField);
}


function defineSetFieldValue(id, setFieldValue) {
  formDynamicScripts[id].defineSetFieldValue(setFieldValue);
}

function defineDataset(id, componentPersistEntityList) {
  formDynamicScripts[id].defineDataset(componentPersistEntityList);
}

function defineGetComponentData(id, getComponentData) {
  formDynamicScripts[id].defineGetComponentData(getComponentData);
}

function defineSetTableRowActiveById(id, setTableRowActiveById) {
  formDynamicScripts[id].defineSetTableRowActiveById(setTableRowActiveById);
}

function defineNavigator(id, navigate) {
  formDynamicScripts[id].defineNavigator(navigate);
}

function nativeFormEventsHandler(id, type, metadata) {
  formDynamicScripts[id].nativeFormEventsHandler(type, metadata);
}

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

