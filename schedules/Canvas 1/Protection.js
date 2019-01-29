var exports = exports || {};
var module = module || { exports: exports };
//Functions to automatically unlock two sheets (weeks) at a time 
//Trigger for function set to go off every Friday at 5:00pm 
//Go to 'Edit' then 'Current Project's Triggers' to manage and set triggers
//setPermissions function compares the current date to the last friday of each week in the semester to determine which weeks need to be open and available to edit by the user
function setPermissions() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var Today = new Date();
    var today = Today.setHours(0, 0, 0, 0);
    var sheets = ss.getSheets();
    var variablesSheet = ss.getSheetByName('Variables');
    var fridays = variablesSheet.getRange('semesterFridays').getValues();
    var editors = ['dow15002@byui.edu', 'mooreco@byui.edu', 'lun16012@byui.edu', 'hei15001@byui.edu','pin14003@byui.edu', 'war18001@byui.edu', 'ste15032@byui.edu', 'rum16002@byui.edu', 'mah15003@byui.edu'];
    var currentWeek;
    var futureWeeks = [];
    var oneWeek = 700000000;
    var twoWeeks = 1213300000;
    var sheetObjects = sheets.reduce(function (acc, sheet, index) {
        var sheetName = sheet.getSheetName();
        if (sheetName.split(' ')[0] === 'Week') {
            var sheetObj = {
                sheet: sheet,
                name: sheetName,
                date: new Date(fridays[sheetName.split(' ')[1]]),
                index: parseInt(sheetName.split(' ')[1])
            };
          //Logger.log(sheetObj);
            acc.push(sheetObj);
        }
        else {
            var protection = sheet.protect();
            protection.removeEditors(protection.getEditors());
            if (protection.canDomainEdit()) {
                protection.setDomainEdit(false);
            }
            protection.addEditors(editors); //Gives editing permission
        }
        return acc;
    }, []);
    sheetObjects.sort(function (a, b) {
        return a.index - b.index;
    });
    sheetObjects.forEach(function (sheetObj, index) {
        var protection = sheetObj.sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET)[0];
        if (!currentWeek && sheetObj.date - today > 0 && sheetObj.date - today <= oneWeek) {
            currentWeek = sheetObj;
            var protection_1 = sheetObj.sheet.protect();
            protection_1.removeEditors(protection_1.getEditors());
            if (protection_1.canDomainEdit()) {
                protection_1.setDomainEdit(false);
            }
            protection_1.addEditors(editors);
            //Logger.log('Current Week: %s', currentWeek.name);
        }
      // Unlock week after current week.
        else if (currentWeek && (sheetObj.date - currentWeek.date <= twoWeeks)) {
            // unlock it
            futureWeeks.push(sheetObj);
            //Logger.log('Other Week stuff: %s', sheetObj.name);
            if (protection && protection.canEdit()) {
                protection.remove();
            }
        }
      
        else if (!protection) {
            // lock it if unlocked
            var protection_2 = sheetObj.sheet.protect();
            protection_2.removeEditors(protection_2.getEditors());
            if (protection_2.canDomainEdit()) {
                protection_2.setDomainEdit(false);
            }
            protection_2.addEditors(editors); //Gives editing permission
        }
    });
    orderSheets(sheetObjects);
}
;
