setCal()

function leapYear(year) {
    if (year % 4 == 0) // basic rule
        return true // is leap year
    /* else */ // else not needed when statement is "return"
    return false // is not leap year
}

function getDays(month, year) {
    // create array to hold number of days in each month
    var ar = new Array(12)
    ar[0] = 31 // January
    ar[1] = (leapYear(year)) ? 29 : 28 // February
    ar[2] = 31 // March
    ar[3] = 30 // April
    ar[4] = 31 // May
    ar[5] = 30 // June
    ar[6] = 31 // July
    ar[7] = 31 // August
    ar[8] = 30 // September
    ar[9] = 31 // October
    ar[10] = 30 // November
    ar[11] = 31 // December

    // return number of days in the specified month (parameter)
    return ar[month]
}

function getMonthName(month) {
    // create array to hold name of each month
    var ar = new Array(12)
    ar[0] = "January"
    ar[1] = "February"
    ar[2] = "March"
    ar[3] = "April"
    ar[4] = "May"
    ar[5] = "June"
    ar[6] = "July"
    ar[7] = "August"
    ar[8] = "September"
    ar[9] = "October"
    ar[10] = "November"
    ar[11] = "December"

    // return name of specified month (parameter)
    return ar[month]
}

function setCal(month) {
    // standard time attributes
    var now = new Date()
    var year = now.getYear()
    if (year < 1000)
        year += 1900
    var monthName = getMonthName(month)
    var date = now.getDate()
    now = null

    // create instance of first day of month, and extract the day on which it occurs
    var firstDayInstance = new Date(year, month, 1)
    var firstDay = firstDayInstance.getDay()
    firstDayInstance = null

    // number of days in current month
    var days = getDays(month, year)

    // call function to draw calendar
    drawCal(firstDay + 1, days, date, monthName, year)
}