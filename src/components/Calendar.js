import React, { useEffect, useState } from 'react'
import '../styles/Calendar.css'

export default function Calendar() {
    const [count, setCount] = useState(1);
    const [weekFirst, setWeekFirst] = useState('');
    const [weekLast, setWeekLast] = useState('');
    const [monthName, setMonthName] = useState('');
    const [year, setYear] = useState('');
    const [slots, setSlots] = useState(['8:00Am-10:00Am', '11Am-12Pm', '1Pm-3Pm', '4Pm-5Pm']);

    //in useEffect

    useEffect(() => {
        if (count === 1) {
            var curr = new Date(); // get current date
            var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
            var last = first + 6; // last day is the first day + 6

            var firstday = new Date(curr.setDate(first));
            var lastday = new Date(curr.setDate(last));
            setWeekFirst(firstday);
            setWeekLast(lastday);
            setCount(count + 1);
            let month = curr.toLocaleString('default', { month: 'long' });
            let year = curr.getFullYear();
            setMonthName(month);
            setYear(year);
        }
    });

    // setInterval(() => {
    //     var curr = new Date(); // get current date
    //     var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    //     var last = first + 6; // last day is the first day + 6

    //     var firstday = new Date(curr.setDate(first));
    //     var lastday = new Date(curr.setDate(last));
    //     var weekFirst = firstday.getDate();
    //     var weekLast = lastday.getDate();
    //     setWeekFirst(weekFirst);
    //     setWeekLast(weekLast);


    // }, 60*60*1000); //Date Checked after every 1 hour

    let createWeekRow = () => {
        var elements = [];
        var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var j = 0;
        if (weekFirst !== '') {
            var dayFirst = weekFirst.getDate();
            var dayLast = weekLast.getDate();
            let monthLastDate = new Date(weekFirst.getFullYear(), weekFirst.getMonth() + 1, 0);
            let month = weekFirst.getMonth();

            if (dayFirst > dayLast) {
                let month2 = weekLast.getMonth();
                // $('.monthName').setText
                for (var i = dayFirst; i <= monthLastDate.getDate(); i++) {
                    let day = week[j++];
                    elements.push(<th key={`${month} ${i}`}>{day} {i}</th>);
                }
                for (var nextDate = 1; nextDate <= dayLast; nextDate++) {
                    let day = week[j++];
                    elements.push(<th key={`${month2} ${nextDate}`}>{day} {nextDate}</th>);
                }
            }
            else {
                for (var date = dayFirst; date <= dayLast; date++) {
                    let day = week[j++];
                    elements.push(<th key={`${month} ${date}`}>{day} {date}</th>);
                }
            }
        }
        return elements;
    }

    let nextWeekDates = () => {
        var firstday = new Date(weekFirst.getFullYear(), weekFirst.getMonth(), weekFirst.getDate() + 7); //added full year and month of weekFirst(so that dates are checked with current month and not today's month)
        var lastday = new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate() + 6);
        let month = firstday.toLocaleString('default', { month: 'long' });
        let year = firstday.getFullYear();
        setMonthName(month);
        setYear(year);
        setWeekFirst(firstday);
        setWeekLast(lastday);
        createWeekRow();
    }

    let prevWeekDates = () => {
        var firstday = new Date(weekFirst.getFullYear(), weekFirst.getMonth(), weekFirst.getDate() - 7);
        var lastday = new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate() + 6);
        let month = firstday.toLocaleString('default', { month: 'long' });
        let year = firstday.getFullYear();
        setMonthName(month);
        setYear(year);
        setWeekFirst(firstday);
        setWeekLast(lastday);
        createWeekRow();
    }

    let cellColor = (elem) => {
        let elemValue = elem.target.getAttribute('value').split(' ');
        let slotValue = elemValue[0];
        let day = elemValue[1];
        let weekFirstDate = elemValue[2];

        // ajax request to save cell information immediately;


            let classSplit = elem.target.className.split(' ');
            if (classSplit[1] === 'orange') {
                elem.target.className = 'tableCell';
            }
            else {
                elem.target.className += ' orange';
            }
    }

    let createRows = () => {
        var elements = [];
        if(weekFirst !== ''){
            let weekFirstDate = weekFirst.getDate();
            for (let slot in slots) {
                let slotValue = slots[slot];
                elements.push(<tr key={slotValue}>
                    <th>{slotValue}</th>
                    <td className='tableCell' value={`${slotValue} Sun ${weekFirstDate}`} onClick={cellColor}></td>
                    <td className='tableCell' value={`${slotValue} Mon ${weekFirstDate}`} onClick={cellColor}></td>
                    <td className='tableCell' value={`${slotValue} Tue ${weekFirstDate}`} onClick={cellColor}></td>
                    <td className='tableCell' value={`${slotValue} Wed ${weekFirstDate}`} onClick={cellColor}></td>
                    <td className='tableCell' value={`${slotValue} Thu ${weekFirstDate}`} onClick={cellColor}></td>
                    <td className='tableCell' value={`${slotValue} Fri ${weekFirstDate}`} onClick={cellColor}></td>
                    <td className='tableCell' value={`${slotValue} Sat ${weekFirstDate}`} onClick={cellColor}></td>
                </tr>)
            }
            return elements;
        }
    }

    return (
        <div>
            1. Table
            2. Calendar nav
            3. slots
            4. input in slots
            5. Today button

            {/* Month Name */}
            <h1 className='monthName'>{monthName}  {year}</h1>

            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>-</th>
                        <button onClick={prevWeekDates}> L </button>
                        {createWeekRow()}
                        <button onClick={nextWeekDates}>R</button>

                    </tr>
                </thead>
                <tbody>
                    {createRows()}
                </tbody>
            </table>
        </div>
    )
}
