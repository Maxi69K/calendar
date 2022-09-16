// Calendar
function calendarReset() {
    document.getElementById('title').innerText = '';
    document.getElementById('days').innerHTML = '';
}

function fillCalendar(years, month) {
    calendarReset();
    let namesOfMonths = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];
    let nameSelectedMonth = namesOfMonths[month - 1];
    let title = nameSelectedMonth + ' ' + years;
    document.getElementById('title').innerText = title;

    let first = new Date(years, month - 1, 1);
    let last = new Date(years, month, 0);

    let dOWF = first.getDay();
    if (dOWF == 0) dOWF = 7;

    let dOWE = last.getDay();
    if (dOWE == 0) dOWE = 7;

    let numberOfDays = last.getDate();
    let days = [];
    for (let i = 1; i < dOWF; i++) {
        days.push('');
    }
    for (let day = 1; day <= numberOfDays; day++) {
        days.push(day);
    }
    for (let i = dOWE; i < 7; i++) {
        days.push('');
    }
    let weeks = [];
    while (days.length > 0) {
        let nextWeek = days.splice(0, 7);
        weeks.push(nextWeek);
    }
    fillBodyCalendar(weeks);
}

function fillBodyCalendar(weeks) {
    for (let week of weeks) {
        let row = document.createElement('tr');
        for (let day of week) {
            let tableData = document.createElement('td');
            tableData.innerText = day;
            row.appendChild(tableData);
        }
        document.getElementById('days').appendChild(row);
    }
}

window.addEventListener('load', main);


function main() {
    let now = new Date();
    fillCalendar(now.getFullYear(), now.getMonth() + 1);
    let years = document.getElementById('years');
    let month = document.getElementById('month');
    let setDateBtn = document.getElementById('setDate');
    let resetDateBtn = document.getElementById('resetDate');
    let errors = document.getElementById('errors');
    setDateBtn.addEventListener('click', setDate);
    month.addEventListener('keypress', enterSetDate);
    years.addEventListener('keypress', enterSetDate);
    resetDateBtn.addEventListener('click', resetDate);

    for (let day of document.getElementsByTagName('td')) {
        if (now.getDate() == day.innerText) {
            day.classList.add('current-day');
        }
    }
}

function setDate() {
    let now = new Date();
    let numberOfYears = parseInt(years.value);
    let numberOfMonths = parseInt(month.value);

    if (numberOfYears === numberOfYears && numberOfMonths !== numberOfMonths) {
        if (numberOfYears > 3000 || numberOfYears < 1800) {
            errors.style.color = 'red';
            errors.innerText = 'Izaberite godinu izmedju 1800 i 3000, trenutno je izabrana ' + numberOfYears + ' godina!';
        } else {
            fillCalendar(numberOfYears, now.getMonth() + 1);
        }
    } else if (numberOfMonths === numberOfMonths && numberOfYears !== numberOfYears) {
        if (numberOfMonths > 12 || numberOfMonths <= 0) {
            errors.style.color = 'red';
            errors.innerText = 'Ne postoji ' + numberOfMonths + ' mesec!';
        } else {
            fillCalendar(now.getFullYear(), numberOfMonths);
        }

    } else if (numberOfYears === numberOfYears && numberOfMonths === numberOfMonths) {
        if ((numberOfMonths > 12 || numberOfMonths <= 0) || (numberOfYears > 3000 || numberOfYears < 1800)) {
            errors.style.color = 'red';
            errors.innerText = 'Polja nisu ispravno popunjena!';
        } else {
            fillCalendar(numberOfYears, numberOfMonths);
        }
    }
}

function resetDate() {
    location.reload();
}

function enterSetDate(e) {
    if (e.keyCode === 13) {
        setDate();
    }
}