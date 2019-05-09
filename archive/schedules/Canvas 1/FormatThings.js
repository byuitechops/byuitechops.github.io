var exports = exports || {};
var module = module || { exports: exports };
function orderSheets(sheetObjects) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var valuesSheet = ss.getSheetByName('Variables');
  var sheetNums = ss.getNumSheets();
  var fridays = valuesSheet.getRange('semesterFridays').getValues();
  var Today = new Date();
  var today = Today.setHours(0, 0, 0, 0);
  var thisWeek;
  // Find this week
  for (var i = 0; i < fridays.length; i++) {
    if (new Date(fridays[i]) - today > -604800000 && new Date(fridays[i]) - today <= 0) {
      thisWeek = sheetObjects[i];
      break;
    }
  }
  
  if (!thisWeek) {
    thisWeek = sheetObjects[0];
  }
  Logger.log(thisWeek);
  
  sheetObjects.map(function (sheetObj) {
    if (sheetObj.date < thisWeek.date) {
      sheetObj.position = 14 - (thisWeek.index - sheetObj.index) + 1;
    }
    else if (sheetObj.date > thisWeek.date) {
      sheetObj.position = sheetObj.index - thisWeek.index + 1;
    }
    else {
      // This week should be first
      sheetObj.position = 1;
    }
    //Logger.log(sheetObj);
  });
  // Put sheets in order according to where they should show up
  var sorted = sheetObjects.sort(function (a, b) { return a.position - b.position; });
  // Logger.log(sorted);
  sheetObjects.forEach(function (sheetObj) {
    ss.setActiveSheet(sheetObj.sheet);
    ss.moveActiveSheet(sheetObj.position);
    //Logger.log('Position: %s', sheetObj.position);
  });
}
function formatWeeks(ss, i) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var source = ss.getSheetByName('Week 1');
  dataValidation(source);

  source.setColumnWidths(1, 15, 120);
  source.setColumnWidth(2, 45);
  source.setColumnWidth(3, 68);
  source.setColumnWidth(16, 68)
  //clearSchedule(source);
  var range = source.getDataRange();
    range.setBorder(false,false,false,false,false,false);

  // let range = source.getRange("A1:P183");
  var sourceFormulas = ss.getSheetByName('Week 2').getDataRange().getFormulas();
  var rangeList = ['D3:O24', 'D35:O64', 'D67:O96', 'D99:O128', 'D131:O160', 'D163:O182']
  for (var i_1 = 2; i_1 <= 14; i_1++) {
    var sheetName = "Week " + i_1;
    var sheet = ss.getSheetByName(sheetName);
    // Sets the data validation
    dataValidation(sheet);
    sheet.clearFormats().clearConditionalFormatRules();
    var data = copyOrPasteData(sheet, rangeList, 'copy');
    range.setBorder(false,false,false,false,false,false);
    clearSchedule(sheet);
    // Parameters(sheet: the destination target, the remainder: the ranges that are going to be changed 
    range.copyFormatToRange(sheet, 1, sheet.getMaxColumns(), 1, sheet.getMaxRows());
    sheet.setFrozenColumns(ss.getSheetByName('Week 1').getFrozenColumns());
    sheet.setColumnWidths(1, 15, 120);
    sheet.setColumnWidth(2, 45);
    sheet.setColumnWidth(3, 68);
    sheet.setColumnWidth(16, 68);
    if (sheet != "Week 2") {
      sheet.getDataRange().setFormulas(sourceFormulas); //Copy the formulas to the target range
    }
        copyOrPasteData(sheet, rangeList, 'paste', data);

  }
}
// Set the data-validation rules
function dataValidation(sheet) {
  Logger.log(sheet.getName());
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  sheet.getDataRange().clearDataValidations();
  //  Logger.log(sheet.getName());
  var rangeList = ['D3:O24', 'D35:O64', 'D67:O96', 'D99:O128', 'D131:O160', 'D163:O182'];
  rangeList.forEach(function (item) {
    //    Logger.log(item);
    var destinationRange = sheet.getRange(item);
    var sourceRange = ss.getSheetByName('Variables').getRange('A2:A24');
    var rule = SpreadsheetApp.newDataValidation().requireValueInRange(sourceRange).build();
    var rules = destinationRange.getDataValidations();
    for (var i = 0; i < rules.length; i++) {
      for (var j = 0; j < rules[i].length; j++) {
        rules[i][j] = rule;
      } // end "j" loop
    } // end "i" loop
    destinationRange.setDataValidations(rules);
  }); // end forEach
} // end dataValidation
// Set the dates on each day of the week
// Should only have to run if the formula for the each day of the week gets changed or messed up
// The dates are dependent on 'Variables!C2' Change that date, and all other dates in the semester should change
function setDates() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Variables");
  var range = sheet.getRange("C2:C16");
  var values = range.getDisplayValues();
  var cells = ["D161", "D129", "D97", "D65", "D33", "D1"]; // The cells for each day of the week.
  for (var i = 1; i < values.length; i++) {
    var sheetname = ss.getSheetByName("Week " + i);
    for (var j = 0; j < cells.length; j++) {
      var cell = sheetname.getRange(cells[j % 6]);
      // Set the forula for each day of the week to match the variable set on Variable sheet. 
      // should only have to run this one time total unless the dates get messed up.
      var operator = cell == "D161" ? ' + ' : ' - ';
      var incrementor = operator === '+' ? 1 : j - 1;
      Logger.log(incrementor);
      Logger.log(operator);
      cell.setFormula("=Variables!C" + (i + 2) + operator + incrementor).setNumberFormat('dddd mmm dd, yyyy');
    } //end 'j' for loop
  } // end 'i' for loop
} //end function
function clearSchedule(sheet) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var list = ['D3:O24', 'D35:O64', 'D67:O96', 'D99:O128', 'D131:O160', 'D163:O182'];
  if (!sheet) {
    var sheets = ss.getSheets();
    sheets.forEach(function (sheet) {
      if (sheet.getName() !== 'Variables') {
        var ranges = sheet.getRangeList(list);
        ranges.clearContent().setBackground('white');
        sheet.getRange('D49:M50').setBackgroundRGB(202, 205, 203);
      }
    });
  }
  else {
    if (sheet.getName() !== 'Variables') {
      var ranges = sheet.getRangeList(list);
      ranges.clearContent().setBackground('white');
      sheet.getRange('D49:O50').setBackgroundRGB(202, 205, 203);
    }
  }
}

function copyOrPasteData(sheet, listRange, action, values) {
  values = values||[];
  Logger.log(values);
  // Figure out what action we're doing (Pasting or copying)
  if (action === 'copy') {
    listRange.forEach(function(range,i) {
      values[i] = sheet.getRange(range).getValues();
    })
    return values;

  } else if (action === 'paste') {
    listRange.forEach(function(range,i) {
      sheet.getRange(range).setValues(values[i]);
    })
  }

}
