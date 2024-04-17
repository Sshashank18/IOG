import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import '../styles/Calendar.css'

export default function ClientCalendar() {
    const [count, setCount] = useState(1);
    const [state, setState] = useState('');
    const [type, setType] = useState('session');
    const [tableData, setTableData] = useState('');
    const [weekFirst, setWeekFirst] = useState('');
    const [weekLast, setWeekLast] = useState('');
    const [monthName, setMonthName] = useState('');
    const [year, setYear] = useState('');
    const [slots, setSlots] = useState(['8:00Am-10:00Am', '11Am-12Pm', '1Pm-3Pm', '4Pm-5Pm']);
    const [open, setOpen] = useState(false);
    const [dayBooking, setDayBooking] = useState('');
    const [slotBooking, setSlotBooking] = useState('');
    const [dateBooking, setDateBooking] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');

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
            getTableData(firstday);
            getBookings();
        }
    }, [result]);


    const getBookings = async () => {
        await axios.get('http://localhost:1300/userBooking/find')
            .then(resp => {
                console.log(resp);
                if (resp.data) {
                    setResult(resp.data.meetings);
                }
                else {
                    setResult('');
                }
            });
    }

    // Modal toggle functions
    const handleOpen = (slot, day, date) => {
        setSlotBooking(slot);
        setDayBooking(day);
        let bookDate = weekFirst.getDate() + date;
        setDateBooking(bookDate);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const handleBooking = async () => {
        setOpen(false);
        // setLoading(true);
        let result = await axios.post('http://localhost:1300/userBooking/create', {
            monthName,
            year,
            dateBooking,
            dayBooking,
            slotBooking,
            type
        });
        console.log(result);
        if (result) {
            getBookings();
        }
    }

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
                        elements.push(<th key={`${month} ${i}`} data-month={`${month}`} data-year={`${year}`} className='weekHead'>  <button onClick={prevWeekDates}> L </button>{day} {i}</th>);
                    }
                    else if (day === 'Sat') {
                        elements.push(<th key={`${month} ${i}`} data-month={`${month}`} data-year={`${year}`} className='weekHead'> {day} {i} <button onClick={nextWeekDates}>R</button></th>);
                    } else {
                        elements.push(<th key={`${month} ${i}`} data-month={`${month}`} data-year={`${year}`} className='weekHead'>{day} {i}</th>);
                    }
                }
                for (var nextDate = 1; nextDate <= dayLast; nextDate++) {
                    let day = week[j++];
                    if (month2 === 12) {
                        if (day === 'Sun') {
                            elements.push(<th key={`${month2} ${nextDate}`} data-month={`${month2}`} data-year={`${year + 1}`} className='weekHead'><button onClick={prevWeekDates}> L </button> {day} {nextDate}</th>);
                        }
                        else if (day === 'Sat') {
                            elements.push(<th key={`${month2} ${nextDate}`} data-month={`${month2}`} data-year={`${year + 1}`} className='weekHead'>{day} {nextDate} <button onClick={nextWeekDates}>R</button></th>);
                        } else {
                            elements.push(<th key={`${month2} ${nextDate}`} data-month={`${month2}`} data-year={`${year + 1}`} className='weekHead'>{day} {nextDate}</th>);
                        }
                    }
                    else {
                        if (day === 'Sun') {
                            elements.push(<th key={`${month2} ${nextDate}`} data-month={`${month2}`} data-year={`${year}`} className='weekHead'><button onClick={prevWeekDates}> L </button> {day} {nextDate}</th>);
                        }
                        else if (day === 'Sat') {
                            elements.push(<th key={`${month2} ${nextDate}`} data-month={`${month2}`} data-year={`${year}`} className='weekHead'>{day} {nextDate} <button onClick={nextWeekDates}>R</button></th>);
                        } else {
                            elements.push(<th key={`${month2} ${nextDate}`} data-month={`${month2}`} data-year={`${year}`} className='weekHead'>{day} {nextDate}</th>);
                        }
                    }
                }
            }
            else {
                for (var date = dayFirst; date <= dayLast; date++) {
                    let day = week[j++];
                    if (day === 'Sun') {
                        elements.push(<th key={`${month} ${date}`} data-month={`${month}`} data-year={`${year}`} className='weekHead'><button onClick={prevWeekDates}> L </button>{day} {date}</th>);
                    }
                    else if (day === 'Sat') {
                        elements.push(<th key={`${month} ${date}`} data-month={`${month}`} data-year={`${year}`} className='weekHead'>{day} {date} <button onClick={nextWeekDates}>R</button></th>);
                    } else {
                        elements.push(<th key={`${month} ${date}`} data-month={`${month}`} data-year={`${year}`} className='weekHead'>{day} {date}</th>);
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
        if (allWithClass.length > 0) {
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
    }

    const createRows = () => {
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

                        // ///////////////////////////////////// HAVE TO SEGREGATE FOR SESSION AND STYLING ABHI ///////////////////////////////////////////////

                        elements.push(<tr key={slotValue}>
                            <th>{slotValue}</th>
                            {isDisabled(0) ? <td className='grey'
                                value={`${slotValue} Sun ${weekFirstDate} 0`}></td>
                                : <td value={`${slotValue} Sun ${weekFirstDate} 0`}>
                                    {isBooked(0, 'Sun', slotValue) ? <h6>Booked</h6> : (find(val, 'Sun', 0) ? <button onClick={() => handleOpen(slotValue, 'Sun', 0)}>Book</button> : '')}
                                </td>}
                            {isDisabled(1) ? <td className='grey'
                                value={`${slotValue} Mon ${weekFirstDate} 1`}></td>
                                : <td value={`${slotValue} Mon ${weekFirstDate} 1`}>
                                    {isBooked(1, 'Mon', slotValue) ? <h6>Booked</h6> : (find(val, 'Mon', 0) ? <button onClick={() => handleOpen(slotValue, 'Mon', 1)}>Book</button> : '')}
                                </td>}
                            {isDisabled(2) ? <td className='grey'
                                value={`${slotValue} Tue ${weekFirstDate} 2`}></td>
                                : <td value={`${slotValue} Tue ${weekFirstDate} 2`}>
                                    {isBooked(2, 'Tue', slotValue) ? <h6>Booked</h6> : (find(val, 'Tue', 0) ? <button onClick={() => handleOpen(slotValue, 'Tue', 2)}>Book</button> : '')}
                                </td>}
                            {isDisabled(3) ? <td className='grey'
                                value={`${slotValue} Wed ${weekFirstDate} 3`}></td>
                                : <td value={`${slotValue} Wed ${weekFirstDate} 3`}>
                                    {isBooked(3, 'Wed', slotValue) ? <h6>Booked</h6> : (find(val, 'Wed', 0) ? <button onClick={() => handleOpen(slotValue, 'Wed', 3)}>Book</button> : '')}
                                </td>}
                            {isDisabled(4) ? <td className='grey'
                                value={`${slotValue} Thu ${weekFirstDate} 4`}></td>
                                : <td value={`${slotValue} Thu ${weekFirstDate} 4`}>
                                    {isBooked(4, 'Thu', slotValue) ? <h6>Booked</h6> : (find(val, 'Thu', 0) ? <button onClick={() => handleOpen(slotValue, 'Thu', 4)}>Book</button> : '')}
                                </td>}
                            {isDisabled(5) ? <td className='grey'
                                value={`${slotValue} Fri ${weekFirstDate} 5`}></td>
                                : <td value={`${slotValue} Fri ${weekFirstDate} 5`}>
                                    {isBooked(5, 'Fri', slotValue) ? <h6>Booked</h6> : (find(val, 'Fri', 0) ? <button onClick={() => handleOpen(slotValue, 'Fri', 5)}>Book</button> : '')}
                                </td>}
                            {isDisabled(6) ? <td className='grey'
                                value={`${slotValue} Sat ${weekFirstDate} 6`}></td>
                                : <td value={`${slotValue} Sat ${weekFirstDate} 6`}>
                                    {isBooked(6, 'Sat', slotValue) ? <h6>Booked</h6> : (find(val, 'Sat', 0) ? <button onClick={() => handleOpen(slotValue, 'Sat', 6)}>Book</button> : '')}
                                </td>}
                        </tr>)
                    }
                    else { // if some slot not inputted then show it blank
                        elements.push(<tr key={slotValue}>
                            <th>{slotValue}</th>
                            <td className='tableCell' value={`${slotValue} Sun ${weekFirstDate} 0`}></td>
                            <td className='tableCell' value={`${slotValue} Mon ${weekFirstDate} 1`}></td>
                            <td className='tableCell' value={`${slotValue} Tue ${weekFirstDate} 2`}></td>
                            <td className='tableCell' value={`${slotValue} Wed ${weekFirstDate} 3`}></td>
                            <td className='tableCell' value={`${slotValue} Thu ${weekFirstDate} 4`}></td>
                            <td className='tableCell' value={`${slotValue} Fri ${weekFirstDate} 5`}></td>
                            <td className='tableCell' value={`${slotValue} Sat ${weekFirstDate} 6`}></td>
                        </tr>)
                    }
                }
            }
            else {  //unless tableData is not Updated, showing empty rows
                for (let slot in slots) {
                    let slotValue = slots[slot];
                    elements.push(<tr key={slotValue}>
                        <th>{slotValue}</th>
                        <td className='tableCell' value={`${slotValue} Sun ${weekFirstDate} 0`}></td>
                        <td className='tableCell' value={`${slotValue} Mon ${weekFirstDate} 1`}></td>
                        <td className='tableCell' value={`${slotValue} Tue ${weekFirstDate} 2`}></td>
                        <td className='tableCell' value={`${slotValue} Wed ${weekFirstDate} 3`}></td>
                        <td className='tableCell' value={`${slotValue} Thu ${weekFirstDate} 4`}></td>
                        <td className='tableCell' value={`${slotValue} Fri ${weekFirstDate} 5`}></td>
                        <td className='tableCell' value={`${slotValue} Sat ${weekFirstDate} 6`}></td>
                    </tr>)
                }
            }
        }
        return elements
    }

    let isBooked = (date, day, slot) => {
        date = weekFirst.getDate() + date;
        for (let meet of result) {
            if (meet.time.date === date && meet.time.day === day && meet.time.slot === slot && meet.time.month === monthName && meet.time.year === year) {
                return true;
            }
        }
        return false;
    }

    let nextWeekDates = () => {
        setTableData('');
        var firstday = new Date(weekFirst.getFullYear(), weekFirst.getMonth(), weekFirst.getDate() + 7); //added full year and month of weekFirst(so that dates are checked with current month and not today's month)
        var lastday = new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate() + 6);
        let year = lastday.getFullYear();
        if(lastday > firstday){
            let month = firstday.toLocaleString('default', { month: 'long' });
            setMonthName(month);
        }
        else{
            let month = lastday.toLocaleString('default', { month: 'long' });
            setMonthName(month);
        }
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
        let year = lastday.getFullYear();
        if(lastday > firstday){
            let month = firstday.toLocaleString('default', { month: 'long' });
            setMonthName(month);
        }
        else{
            let month = lastday.toLocaleString('default', { month: 'long' });
            setMonthName(month);
        }
        setYear(year);
        setWeekFirst(firstday);
        setWeekLast(lastday);
        getTableData(firstday);
        createWeekRow();
    }

    let getTableData = async (weekF) => {
        let data = await axios.get(`http://localhost:1300/tempTT/find`);
        let weekFirstDate = weekF.getDate();
        const filteredData = data.data.filter((elem) => {
            return (elem.weekFirst === weekFirstDate)
        });
        setState('success');
        setTableData(filteredData);
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

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };



    return (
        <div>
            {/* Month Name */}
            <h1 className='monthName'>{monthName}  {year}</h1>   <button className="btn" onClick={goToToday}>Today</button>


            {loading ? <Box sx={{ display: 'flex' }} style={{ marginLeft: '50%', marginTop: '10%' }}><CircularProgress /></Box> :
                <div>
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

                    {/* MODAL FOR BOOKING CONFIRMATION */}

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            Confirm Slot

                            <button onClick={handleBooking}> YES </button>
                            <button onClick={handleClose}> NO </button>
                        </Box>
                    </Modal></div>}


        </div>
    )
}
