import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../styles/Calendar.css'

export default function Calendar() {
    const [count, setCount] = useState(1);
    const [state, setState] = useState('');
    const [type, setType] = useState('session');
    const [tableData, setTableData] = useState('');
    const [weekFirst, setWeekFirst] = useState('');
    const [weekLast, setWeekLast] = useState('');
    const [monthName, setMonthName] = useState('');
    const [year, setYear] = useState('');
    const [slots, setSlots] = useState(['8:00Am-10:00Am', '11Am-12Pm', '1Pm-3Pm', '4Pm-5Pm']);


    //in useEffect

    useEffect(() => {
        if (count === 1) {
            setState('loading');
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
            getTableData(firstday);
        }
    }, []);

    //Check in every interval latest time

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
                    if (day === 'Sun') {
                        elements.push(<th key={`${month} ${i}`} data-month = {`${month}`} data-year={`${year}`} className='weekHead'>  <button onClick={prevWeekDates}> L </button>{day} {i}</th>);
                    }
                    else if (day === 'Sat') {
                        elements.push(<th key={`${month} ${i}`} data-month = {`${month}`} data-year={`${year}`} className='weekHead'> {day} {i} <button onClick={nextWeekDates}>R</button></th>);
                    } else {
                        elements.push(<th key={`${month} ${i}`}  data-month = {`${month}`} data-year={`${year}`} className='weekHead'>{day} {i}</th>);
                    }
                }
                for (var nextDate = 1; nextDate <= dayLast; nextDate++) {
                    let day = week[j++];
                    if(month2===12){
                        if (day === 'Sun') {
                            elements.push(<th key={`${month2} ${nextDate}`} data-month = {`${month2}`} data-year={`${year+1}`} className='weekHead'><button onClick={prevWeekDates}> L </button> {day} {nextDate}</th>);
                        }
                        else if (day === 'Sat') {
                            elements.push(<th key={`${month2} ${nextDate}`} data-month = {`${month2}`} data-year={`${year+1}`} className='weekHead'>{day} {nextDate} <button onClick={nextWeekDates}>R</button></th>);
                        } else{
                            elements.push(<th key={`${month2} ${nextDate}`} data-month = {`${month2}`} data-year={`${year+1}`} className='weekHead'>{day} {nextDate}</th>);
                        }
                    }
                    else{
                        if (day === 'Sun') {
                            elements.push(<th key={`${month2} ${nextDate}`} data-month = {`${month2}`} data-year={`${year}`} className='weekHead'><button onClick={prevWeekDates}> L </button> {day} {nextDate}</th>);
                        }
                        else if (day === 'Sat') {
                            elements.push(<th key={`${month2} ${nextDate}`} data-month = {`${month2}`} data-year={`${year}`} className='weekHead'>{day} {nextDate} <button onClick={nextWeekDates}>R</button></th>);
                        } else{
                            elements.push(<th key={`${month2} ${nextDate}`} data-month = {`${month2}`} data-year={`${year}`} className='weekHead'>{day} {nextDate}</th>);
                        }
                    }
                }
            }
            else {
                for (var date = dayFirst; date <= dayLast; date++) {
                    let day = week[j++];
                    if (day === 'Sun') {
                        elements.push(<th key={`${month} ${date}`}data-month = {`${month}`} data-year={`${year}`} className='weekHead'><button onClick={prevWeekDates}> L </button>{day} {date}</th>);
                    }
                    else if (day === 'Sat') {
                        elements.push(<th key={`${month} ${date}`}data-month = {`${month}`} data-year={`${year}`} className='weekHead'>{day} {date} <button onClick={nextWeekDates}>R</button></th>);
                    } else {
                        elements.push(<th key={`${month} ${date}`} data-month = {`${month}`} data-year={`${year}`} className='weekHead'>{day} {date}</th>);
                    }
                }
            }
        }
        return elements;
    }

    let find = (arr, dayCheck, useType) => {
        if (useType === 0) {
            return arr.find((elem) => (elem.day === dayCheck))
        }
        else {
            return arr.find((elem) => (elem.type === 'session' && elem.day === dayCheck))
        }
    }

    let isDisabled = (dayNumber) => {
        let today = new Date();
        today.setHours(0, 0, 0, 0)
        const allWithClass = Array.from(
            document.getElementsByClassName('weekHead')
        );

        let date = allWithClass[dayNumber].innerText.split(' ')[1];
        let monthIndex = allWithClass[dayNumber].getAttribute('data-month');
        let dispYear = allWithClass[dayNumber].getAttribute('data-year');
        let displayDate = new Date(dispYear, monthIndex, date);
        if (displayDate < today) {
            return true
        }
        else {
            return false
        }
    }

    let createRows = () => {
        var elements = [];
        if (weekFirst !== '') {
            let weekFirstDate = weekFirst.getDate();
            if (state === 'success' && tableData) {
                let dataArray = tableData;
                for (let slot in slots) {
                    let slotValue = slots[slot];
                    let val = dataArray.reduce((a, val, i) => { //filtering all the days on which slot has been marked
                        if ((val.slot === slotValue) && (val.month === monthName) && (val.year === year)) {
                            a.push(val);
                        }
                        return a;
                    }, []);
                    if (val) { //showing matching slots with Database
                        elements.push(<tr key={slotValue}>
                            <th>{slotValue}</th>
                            <td className={`${find(val, 'Sun', 0) ? (find(val, 'Sun', 1) ? 'tableCell orange' : 'tableCell green') : "tableCell"} ${isDisabled(0) ? 'grey' : ''}`}
                                value={`${slotValue} Sun ${weekFirstDate} 0`} onClick={insertSlot}>{find(val, 'Sun', 0) ? find(val, 'Sun', 0).type : ''}</td>
                            <td className={`${find(val, 'Mon', 0) ? (find(val, 'Mon', 1) ? 'tableCell orange' : 'tableCell green') : "tableCell"} ${isDisabled(1) ? 'grey' : ''}`}
                                value={`${slotValue} Mon ${weekFirstDate} 1`} onClick={insertSlot}>{find(val, 'Mon', 0) ? find(val, 'Mon', 0).type : ''}</td>
                            <td className={`${find(val, 'Tue', 0) ? (find(val, 'Tue', 1) ? 'tableCell orange' : 'tableCell green') : "tableCell"} ${isDisabled(2) ? 'grey' : ''}`}
                                value={`${slotValue} Tue ${weekFirstDate} 2`} onClick={insertSlot}>{find(val, 'Tue', 0) ? find(val, 'Tue', 0).type : ''}</td>
                            <td className={`${find(val, 'Wed', 0) ? (find(val, 'Wed', 1) ? 'tableCell orange' : 'tableCell green') : "tableCell"} ${isDisabled(3) ? 'grey' : ''}`}
                                value={`${slotValue} Wed ${weekFirstDate} 3`} onClick={insertSlot}>{find(val, 'Wed', 0) ? find(val, 'Wed', 0).type : ''}</td>
                            <td className={`${find(val, 'Thu', 0) ? (find(val, 'Thu', 1) ? 'tableCell orange' : 'tableCell green') : "tableCell"} ${isDisabled(4) ? 'grey' : ''}`}
                                value={`${slotValue} Thu ${weekFirstDate} 4`} onClick={insertSlot}>{find(val, 'Thu', 0) ? find(val, 'Thu', 0).type : ''}</td>
                            <td className={`${find(val, 'Fri', 0) ? (find(val, 'Fri', 1) ? 'tableCell orange' : 'tableCell green') : "tableCell"} ${isDisabled(5) ? 'grey' : ''}`}
                                value={`${slotValue} Fri ${weekFirstDate} 5`} onClick={insertSlot}>{find(val, 'Fri', 0) ? find(val, 'Fri', 0).type : ''}</td>
                            <td className={`${find(val, 'Sat', 0) ? (find(val, 'Sat', 1) ? 'tableCell orange' : 'tableCell green') : "tableCell"} ${isDisabled(6) ? 'grey' : ''}`}
                                value={`${slotValue} Sat ${weekFirstDate} 6`} onClick={insertSlot}>{find(val, 'Sat', 0) ? find(val, 'Sat', 0).type : ''}</td>
                        </tr>)
                    }
                    else { // if some slot not inputted then show it blank
                        elements.push(<tr key={slotValue}>
                            <th>{slotValue}</th>
                            <td className='tableCell' value={`${slotValue} Sun ${weekFirstDate} 0`} onClick={insertSlot}></td>
                            <td className='tableCell' value={`${slotValue} Mon ${weekFirstDate} 1`} onClick={insertSlot}></td>
                            <td className='tableCell' value={`${slotValue} Tue ${weekFirstDate} 2`} onClick={insertSlot}></td>
                            <td className='tableCell' value={`${slotValue} Wed ${weekFirstDate} 3`} onClick={insertSlot}></td>
                            <td className='tableCell' value={`${slotValue} Thu ${weekFirstDate} 4`} onClick={insertSlot}></td>
                            <td className='tableCell' value={`${slotValue} Fri ${weekFirstDate} 5`} onClick={insertSlot}></td>
                            <td className='tableCell' value={`${slotValue} Sat ${weekFirstDate} 6`} onClick={insertSlot}></td>
                        </tr>)
                    }
                }
            }
            else {  //unless tableData is not Updated, showing empty rows
                for (let slot in slots) {
                    let slotValue = slots[slot];
                    elements.push(<tr key={slotValue}>
                        <th>{slotValue}</th>
                        <td className='tableCell' value={`${slotValue} Sun ${weekFirstDate} 0`} onClick={insertSlot}></td>
                        <td className='tableCell' value={`${slotValue} Mon ${weekFirstDate} 1`} onClick={insertSlot}></td>
                        <td className='tableCell' value={`${slotValue} Tue ${weekFirstDate} 2`} onClick={insertSlot}></td>
                        <td className='tableCell' value={`${slotValue} Wed ${weekFirstDate} 3`} onClick={insertSlot}></td>
                        <td className='tableCell' value={`${slotValue} Thu ${weekFirstDate} 4`} onClick={insertSlot}></td>
                        <td className='tableCell' value={`${slotValue} Fri ${weekFirstDate} 5`} onClick={insertSlot}></td>
                        <td className='tableCell' value={`${slotValue} Sat ${weekFirstDate} 6`} onClick={insertSlot}></td>
                    </tr>)
                }
            }
        }
        return elements
    }

    let nextWeekDates = () => {
        setTableData('');
        var firstday = new Date(weekFirst.getFullYear(), weekFirst.getMonth(), weekFirst.getDate() + 7); //added full year and month of weekFirst(so that dates are checked with current month and not today's month)
        var lastday = new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate() + 6);
        let month = lastday.toLocaleString('default', { month: 'long' });
        let year = lastday.getFullYear();
        setMonthName(month);
        setYear(year);
        setWeekFirst(firstday);
        setWeekLast(lastday);
        getTableData(firstday);
        createWeekRow();
    }

    let prevWeekDates = () => {
        setTableData('');
        var firstday = new Date(weekFirst.getFullYear(), weekFirst.getMonth(), weekFirst.getDate() - 7);
        var lastday = new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate() + 6);
        let month = lastday.toLocaleString('default', { month: 'long' });
        let year = lastday.getFullYear();
        setMonthName(month);
        setYear(year);
        setWeekFirst(firstday);
        setWeekLast(lastday);
        getTableData(firstday);
        createWeekRow();
    }

    let insertSlot = async (elem) => {
        let elemValue = elem.target.getAttribute('value').split(' ');
        let slotValue = elemValue[0];
        let day = elemValue[1];
        let weekFirstDate = elemValue[2];
        let dayNumber = elemValue[3];
        let month = weekFirst.toLocaleString('default', { month: 'long' });
        let year = weekFirst.getFullYear();
        let className = elem.target.className.split(' ');

        const allWithClass = Array.from(
            document.getElementsByClassName('weekHead')
        );

        let date = allWithClass[dayNumber].innerText.split(' ')[1];

        if (className.find(elem => elem === 'grey')) {
            return;
        }

        if (className.length > 1) {
            if (className[1] !== '') {
                await axios.delete('http://localhost:1300/tempTT/delete', {
                    data: {
                        month,
                        year,
                        date,
                        day,
                        type: type,
                        slot: slotValue,
                        weekFirst: weekFirstDate
                    }
                });
            }
            else {
                // async await ajax request to save cell information immediately on click in temporary Database;
                await axios.post('http://localhost:1300/tempTT/create', {
                    month,
                    year,
                    date,
                    day,
                    slot: slotValue,
                    type: type,
                    weekFirst: weekFirstDate
                });
            }
        }
        getTableData(weekFirst);
    }

    let getTableData = async (weekF) => {
        let data = await axios.get(`http://localhost:1300/tempTT/find`);
        let weekFirstDate = weekF.getDate();
        const filteredData = data.data.filter((elem) => {
            return (elem.weekFirst === weekFirstDate)
        });
        setState('success');
        setTableData(filteredData);
        createRows();
    }

    let goToToday = async () => {
        var curr = new Date(); // get current date
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6

        var firstday = await new Date(curr.setDate(first));
        var lastday = new Date(curr.setDate(last));
        setWeekFirst(firstday);
        setWeekLast(lastday);
        let month = curr.toLocaleString('default', { month: 'long' });
        let year = curr.getFullYear();
        setMonthName(month);
        setYear(year);
        getTableData(firstday);
    }

    let typeCheck = (type) => {
        setType(type);
        createRows();
    }

    return (
        <div>
            {/* Month Name */}
            <h1 className='monthName'>{monthName}  {year}</h1>   <button className="btn" onClick={goToToday}>Today</button>

            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>-</th>
                        {createWeekRow()}
                    </tr>
                </thead>
                <tbody>
                    {createRows()}
                </tbody>
            </table>
            <button className="btn" onClick={() => typeCheck('session')} >Session</button>
            <button className="btn" onClick={() => typeCheck('styling')} >Styling</button>
        </div>
    )
}
