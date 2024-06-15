import React from 'react'
import '../../styles/Home.css';
import CardComponentBlogs from './CardComponentBlogs';
import CardComponentServices from './CardComponentServices';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardComponentVideos from './CardComponentVideos';
import { Carousel } from 'react-responsive-3d-carousel';
// import Images from '../../assets/PNG';


const images = require.context('../../assets/PNG', true);
const imageList = images.keys().map(image => images(image));

function Home() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: false,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <div className="homePage">
      <div className="landingImage">
        <img src={imageList[6]} width={"100%"} height={"100%"} />
      </div>
      <div className="home">
        <div className='aboutIog'>
          <div><img src={imageList[9]} width={"300px"} height={"114px"} /></div>
          <br /><br />
          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </div>
        </div>


        <div className="blogs">
          <h1 style={{ textAlign: 'left', marginBottom: "30px" }}>BLOGS</h1>
          <Slider {...settings}>
            <CardComponentBlogs image={imageList[1]} />
            <CardComponentBlogs image={imageList[2]} />
            <CardComponentBlogs image={imageList[3]} />
            <CardComponentBlogs image={imageList[4]} />
          </Slider>
        </div>
        <div className="services">
          <h1 style={{ textAlign: 'left', marginBottom: "30px" }}>SERVICES</h1>
          <div className="servicesCards">
            <CardComponentServices image={imageList[7]} content="INNER" top="170px" />
            <CardComponentServices image={imageList[8]} content="OUTER" top="170px" />
            <CardComponentServices image={imageList[17]} content="INNER + OUTER" top="120px" />
          </div>
        </div>

        <div className="testimonials">
          <h1 style={{ textAlign: 'left', marginBottom: "30px" }}>TESTIMONIALS</h1>
          <Carousel autoplay={true} interval={2000} arrows={true}>
            <img src="https://picsum.photos/800/300/?random" alt="1" />,
            <img src="https://picsum.photos/800/302/?random" alt="2" />
            <img src="https://picsum.photos/800/303/?random" alt="3" />
            <img src="https://picsum.photos/800/304/?random" alt="4" />
          </Carousel>
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

        <div className="gallery">
          
        </div>

        <div className="videos">
          <h1 style={{ textAlign: 'left', marginBottom: "30px" }}>WATCH MY VIDEOS</h1>
          <Slider {...settings}>
            <CardComponentVideos backColor="#A17474" />
            <CardComponentVideos backColor="#999980" />
            <CardComponentVideos backColor="#7A7C81" />
          </Slider>
        </div>

        <div className="meet">
          <div className="content" style={{ textAlign: 'left' }}>
            <h1 style={{ marginTop: '100px' }}>MEET SWATEE</h1>
            <br />
            <span style={{lineHeight:'25px'}}>
              Lorem Ipsum is simply dummy text of the printing and <br/>
              typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, <br/>
              when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only <br/>
              five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s <br/>
              with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like <br/>
              Aldus PageMaker including versions of Lorem Ipsum.<br/>
            </span>
          </div>
          <div className="image" style={{position:'absolute', left:'520px',top:'50px'}}>
              <img src={imageList[0]} width={"400px"} height={"500px"}/>
          </div>
        </div>
      </div>
      <div className="footer" style={{backgroundImage:`url("${imageList[15]}")`,backgroundRepeat:'no-repeat', backgroundSize:'100% 100%'}}>
        <div className="footerContent">
          <div className="contentLeft">
            <ul>
              <li>HOME</li>
              <li>ABOUT IOG</li>
              <li>SERVICES & PLANS</li>
              <li>GALLERY</li>
              <li>BLOGS</li>
              <li>DASHBOARD</li>
            </ul>
          </div>
          <div className="contentMid">
            <ul>
              <li>MY PROFILE</li>
              <li>MANAGE ACCOUNT</li>
              <li>CONTACT US</li>
              <li>MESSAGES</li>
              <li>NOTIFICATION</li>
            </ul>
          </div>
          <div className="contentRight">
            <ul>
              <li>HELP & FAQ</li>
              <li>TERMS & CONDITION</li>
              <li>PRIVACY POLICY</li>
              <li>JOIN US</li>
            </ul>
          </div>
        </div>
        <div className="footerLine">

        </div>
      </div>
    </div>
  )
}

export default Home
