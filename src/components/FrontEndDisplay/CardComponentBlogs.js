import React from 'react'
import '../../styles/CardComponent.css';

function CardComponentBlogs() {
  return (
    <div>
      <div className='mainBox' style={{backgroundImage:""}}>
        <div className="textBox">
            <div className="date">Monday 2, 2024</div>
            <span>Lorem Ipsum is simply dummy text </span>
            <button className='readMore'>Read More</button>
        </div>
      </div>
    </div>
  )
}

export default CardComponentBlogs
