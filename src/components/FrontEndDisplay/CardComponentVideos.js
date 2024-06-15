import React from 'react'
import '../../styles/CardComponent.css';
import imag from '../../assets/image.jpg';

function CardComponentVideos(props) {
  return (
    <div>
      <div className='mainBoxVideos' style={{backgroundColor:`${props.backColor}`, color:'white'}}>
        <img style={{width:'290px',height:'120px'}} src={imag}></img>
            <div className="timeBox" style={{paddingLeft:'5px',paddingRight:'5px'}}>
                <span>Monday, 2nd Jan 2024</span>
                <span>25:00</span>
            </div>
            <span style={{fontSize:"15px",fontWeight:"bold",marginTop:"10px"}}>lorem ipsum is simpl dummy texg.</span>
        </div>
    </div>
  )
}

export default CardComponentVideos
