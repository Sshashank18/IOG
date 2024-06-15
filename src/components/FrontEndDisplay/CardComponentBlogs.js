import React from 'react'
import '../../styles/CardComponent.css';

function CardComponentBlogs(props) {
  return (
    <div>
      <div className='mainBox' style={{backgroundImage:`url("${props.image}")`,width:'300px'}}>
        <div className="textBox">
            <div className="date">Monday 2, 2024</div>
            <span style={{fontSize:'18px',display:'block'}}>Lorem Ipsum is simply dummy text </span>
            <br></br>
            <button className='readMore btn btn-outline-light'>Read More</button>
        </div>
      </div>
    </div>
  )
}

export default CardComponentBlogs
