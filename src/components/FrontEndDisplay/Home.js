import React from 'react'
import '../../styles/Home.css';
import CardComponentBlogs from './CardComponentBlogs';
import CardComponentServices from './CardComponentServices';

function Home() {
  return (
    <div className = "home">
        <div className='aboutIog'>
            <span><img href=""/></span>
            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
        </div>
        <div className="blogs">
            <h1 style={{textAlign:'left'}}>BLOGS</h1>
            <div className="blogsCards">
              <CardComponentBlogs/>
              <CardComponentBlogs/>
              <CardComponentBlogs/>
              <CardComponentBlogs/>
            </div>
        </div>
        <div className="services">
            <h1 style={{textAlign:'left'}}>Services</h1>
            <div className="servicesCards">
              <CardComponentServices/>
              <CardComponentServices/>
              <CardComponentServices/>
            </div>
        </div>
        <div className="stamp">
            <div className="stamp1">
              <h1>10K+</h1>
              <span>Hours Of Experience</span>
            </div>
            <div className="stamp1">
              <h1>800+</h1>
              <span>Happy Clients</span>
            </div>
            <div className="stamp1">
              <h1>80+</h1>
              <span>Therapies</span>
            </div>
        </div>

        <div className="videos">
        <h1 style={{textAlign:'left'}}>Watch My Videos</h1>
            <div className="servicesCards">
              <CardComponentServices/>
              <CardComponentServices/>
              <CardComponentServices/>
            </div>
        </div>

        <div className="meet">
          <div className="content"  style={{textAlign:'left'}}>
            <h1 >MEET SWATEE</h1>
            <span style={{marginTop:"50px"}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </span>
          </div>
          <div className="image">
    
          </div>
        </div>
    </div>
  )
}

export default Home
