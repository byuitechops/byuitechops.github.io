function convertColumntoNumber(input) {
  var upperCase = input.toUpperCase();
  var randomCell = upperCase + '1';
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Week 1').getRange(randomCell);
  Logger.log(sheet.getColumn());
  return sheet.getColumn();
}

/**
* Adds a specified number of columns to every week sheet and template
*/
function addColumnOnAllSheets() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var colIdxStr = Browser.inputBox('Insert column right of column no');
  if (/[a-z]/i.test(colIdxStr)) {
    colIdxStr = convertColumntoNumber(colIdxStr);
  }
  var howMany = parseInt(Browser.inputBox('How many columns?'));
  if (colIdxStr == 'cancel') {
    return;
  }
  var colIdx = parseInt(colIdxStr);
  
  if (isNaN(colIdx) || isNaN(howMany)) {
    Browser.msgBox('You must enter a number or cancel');
    return;
  }
  var sheets = spreadsheet.getSheets();
  sheets.forEach(function (sheet) {
    if (sheet.getName() != 'Variables') {
      sheet.insertColumnsAfter(colIdx, howMany);
    }
  });
}


function removeColumnOnAllSheets() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var colIdxStr = Browser.inputBox('Remove column no');
  var howMany = Browser.inputBox('How many columns to delete');
  if (colIdxStr == 'cancel') {
    return;
  }
  if (/[a-z]/i.test(colIdxStr)) {
    colIdxStr = convertColumntoNumber(colIdxStr);
  }
  var colIdx = parseInt(colIdxStr);
  if (!/end/i.test(howMany)) {
    howMany = parseInt(howMany);
  }
  if (colIdx == NaN || howMany == NaN) {
    Browser.msgBox('You must enter a number or cancel');
    return;
  }
  var sheets = spreadsheet.getSheets();
  sheets.forEach(function (sheet) {
    if (sheet.getMaxColumns() < colIdx || sheet.getName() == 'Variables') {
      return;
    }
    if (/end/i.test(howMany)) {
      howMany = sheet.getMaxColumns() - colIdx + 1;
      Logger.log(howMany);
      sheet.deleteColumns(colIdx, howMany);
      howMany = 'end'
    } else {
      sheet.deleteColumns(colIdx, howMany);
    }
  });
}

function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [
    {name: "Add column on all sheets", functionName: "addColumnOnAllSheets"}, 
    {name: 'Remove column on all sheets', functionName: 'removeColumnOnAllSheets'}
  ];
    sheet.addMenu("Format", entries);
}
