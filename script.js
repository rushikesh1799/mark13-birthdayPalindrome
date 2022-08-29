function reverseStr(str) {

    var listOfChars = str.split('')
    var reverseofChars = listOfChars.reverse().join('')

    // In a similar fation this will also work
    // var reverse = str.split('').reverse().join('')

    return reverseofChars
    // logic with only loops (for and if)
    // for (i=listOfChars.length-1;i>=0;i--){ 
    //     array.push(listOfChars[i]) 
    // }
    // if (str===array.join('')) {
    //     console.log("equal")
    // } else {
    //     console.log("Not equal")
    // }
}

function ifPalindrome(str) {
    var reverse = reverseStr(str)
    return str === reverse // this will return true if str is palindrome and false if not
    // if (reverse===str) {
    //     return "Palindrome"
    // } else {
    //     return "Not Palindrome"
    // }
}

function convertDateToStr(date) {
    
    var dateStr = {
        day: '',
        month: '',
        year: ''
    }

    // DAY
    if (date.day < 10) {
        dateStr.day = '0' + date.day
    } else {
        dateStr.day = date.day.toString();
    }

    //MONTH
    if (date.month < 10) {
        dateStr.month = '0' + date.month
    } else if (date.month > 12) {
        dateStr.month = '1' 
    } else {
        dateStr.month = date.month.toString();
    }

    //YEAR
    dateStr.year = date.year.toString();


    return dateStr
}

var date = {
    day: 29,
    month: 2,
    year: 2020
}

// console.log(convertDateToStr(date))

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true
    }
    if (year % 100 === 0) {
        return false
    }
    if (year % 4 === 0) {
        return true
    }
    return false
}

function getNextDate(date) {
    // just incrementing the date
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    // console.log([day, month, year]);

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }

        }
        else {
            if (day > 28) {
                day = 1;
                month++
            }
        }
    }
    else {
        if (day > daysInMonth[month-1]) {
            day = 1;
            month++
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }
    
    return {
        day: day,
        month: month,
        year: year
    }

}


function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date)
    
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(2,4)
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(2,4)
    var yymmdd = dateStr.year.slice(2,4) +  dateStr.month + dateStr.day 

    // console.log(yymmdd)

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]

}

function checkPalindromeForAllDateFormats(date) {
    var listOfPalindromes = getAllDateFormats(date);
    // console.log(listOfPalindromes)
    var flag = false;

    for (var i = 0; i < listOfPalindromes.length; i++) {
        if (ifPalindrome(listOfPalindromes[i])) {
            flag = true
            break;
            
        }
    }
    return flag
}

function getNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);
    // console.log(nextDate)
    while(1){
        ctr++;
        var isPalindrome=checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome) {
            break;
        }
        nextDate=getNextDate(nextDate);
    }
    return [ctr, nextDate];
}

function getPreviousDate(date){
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month === 3){
        if(isLeapYear(year)) {
            if (day < 1){
                day = 29;
                month--;
            }
        }else{
            if(day < 1){
                day = 28;
                month--;
            }
        }
    }
    else{
        if(day < 1){
            month--;
            if(month < 1) {
                month = 12;
                year--;
            }

            day = daysInMonth[month-1];
        }
    }
    return {
        day:day,
        month:month,
        year:year
    }
}

function getPreviousPalindromeDate(date){
    var ctr = 0;
    var previousDate=getPreviousDate(date);

    while(1){
        // console.log(previousDate);
        ctr++;
        var isPalindrome=checkPalindromeForAllDateFormats(previousDate);
        if(isPalindrome) {
            break;
        }
        previousDate=getPreviousDate(previousDate);
    }
    return [ctr,previousDate];
}


var dateInputRef = document.getElementById('bday-input');
var showBtnRef = document.getElementById('show-btn');
var resultRef = document.getElementById('output');

// console.log(dateInputRef)
// console.log(resultRef)

function clickHandler(params) {
    var bdayStr = dateInputRef.value;

    if (bdayStr !== "") {
        var listofDate = bdayStr.split('-');
        var date = {
            day: Number(listofDate[2]),
            month: Number(listofDate[1]),
            year: Number(listofDate[0])
        };
        // console.log(date);
    }
    
    var isPlaindrome = checkPalindromeForAllDateFormats(date);

    if (isPlaindrome) {
        resultRef.innerText = 'Yayy! Your Birthdate is Palindrome 🥳'
    } else {
        var [nextDayCount, nextDate] = getNextPalindromeDate(date)
        var [prevDayCount, prevDate] = getPreviousPalindromeDate(date)
        // console.log(nextDayCount);
        // console.log(nextDate);
        // console.log(prevDayCount);
        // console.log(prevDate);
        resultRef.innerText = `Oops! Your Birthday is not a palindrome. The next Palindrome Date is ${nextDate.day}/${nextDate.month}/${nextDate.year} and you missed it by ${nextDayCount} days AND the previous Palindrome Date is ${prevDate.day}/${prevDate.month}/${prevDate.year} and you missed it by ${prevDayCount} days 😕`
    }

}

showBtnRef.addEventListener('click', clickHandler)


// console.log(getPreviousPalindromeDate(date))

// console.log(date.day)
// console.log(reverseStr("BrB"))
// console.log(ifPalindrome("BRB"))