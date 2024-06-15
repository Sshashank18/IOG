import React from 'react'
import '../../styles/CardComponent.css';

function CardComponentServices(props) {
  return (
    <div>
      <div className='mainBoxServices' style={{backgroundImage:`url("${props.image}")`,width:'300px',position:'relative'}}>
        <div className="content"  style={{color:'white', position:'absolute',left:'20px', top:`${props.top}`, textAlign:'left'}}>
          <span style={{fontWeight:"bold",display:'block',fontSize:'35px'}}>
            {props.content}
          </span>
          <span>
            Grooming
          </span>
        </div>
      </div>
    </div>
  )
}

export default CardComponentServices
