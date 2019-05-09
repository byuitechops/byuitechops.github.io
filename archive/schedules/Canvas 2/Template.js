// This is unused for now, but it might be used in the future, so I left it here.

//function setTemplate() {
//  var ss = SpreadsheetApp.getActiveSpreadsheet();
//  var rangeList = ['D3:O24', 'D35:O64', 'D67:O96', 'D99:O128', 'D131:O160', 'D163:O182'];
//  var weekToCopy = ss.getSheetByName('Week 2');
//  var templateWeek = ss.getSheetByName('Template');
//  rangeList.map(function(range) {
//    var weekValues = weekToCopy.getRange(range).getValues();
//    templateWeek.getRange(range).setValues(weekValues);
//  })
//}
//
//function setWeeksFromTemplate() {
//  var ss = SpreadsheetApp.getActiveSpreadsheet();
//  var sheets = ss.getSheets();
//  var sheetsNotIncluded = ['Week 1', 'Week 2', 'Variables', 'Template'];
//  var rangeList = ['D3:O24', 'D35:O64', 'D67:O96', 'D99:O128', 'D131:O160', 'D163:O182'];
//  var startingWeek = Browser.inputBox("What week to start on?");
//  if ( startingWeek.length > 2 ) startingWeek = ss.getSheetByName(startingWeek);
//  else startingWeek = ss.getSheetByName('Week ' + startingWeek);
//  Logger.log(startingWeek.getName().split(' ')[1]);
//  
//  
//  sheets.forEach(function(sheet) {
//    if (parseInt(sheet.getName().split(' ')[1]) < parseInt(startingWeek.getName().split(' ')[1])) {
//      sheetsNotIncluded.push(sheet.getName());
//    }
//   
//    var validation = true;
//    sheetsNotIncluded.map(function(el){
//      if (sheet.getName() === el) {
//        validation = false;
//      }
//    })
//    
//    if (validation) {
//      rangeList.map(function(range) {
//        var template = ss.getSheetByName('Template');
//        var templateValues = template.getRange(range).getValues();
//        sheet.getRange(range).setValues(templateValues);
//      })
//    }
//  })
//}
