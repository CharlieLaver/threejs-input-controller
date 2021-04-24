import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCube, Autoplay, Pagination } from 'swiper';
import './Slider.css';
import 'swiper/swiper.scss';
import 'swiper/components/effect-cube/effect-cube.scss';
import 'swiper/components/pagination/pagination.scss';
import { Button } from 'react-bootstrap';
import Vid from './assets/vid1.mp4';
import Vid2 from './assets/vid2.mp4';
import Vid3 from './assets/vid3.mp4';
import Vid4 from './assets/vid4.mp4';


SwiperCore.use([EffectCube, Autoplay, Pagination]);

const Slider = () => {

  const handleLoad = () => {
    if(window.innerWidth <= 1000)
      return true;
    else
      return false;
  };

  const [smallScreen, setSmallScreen] = useState(handleLoad);


  useEffect(() => {
    function handleResize() {
      if(window.innerWidth <= 1000)
        setSmallScreen(true);
      else
       setSmallScreen(false);
  }
    window.addEventListener('resize', handleResize);
  });

  
  return (
    <Swiper 
        effect="cube"
        autoplay={{ delay: 7000 }}
        pagination={{ clickable: true }}
        className={smallScreen ? 'smCube' : 'cube'}>

      <SwiperSlide className={smallScreen ? 'smSlide' : 'slide'}>
          <div className={smallScreen ? 'smContent' : 'content'}>
            <h1>Hello, my name is Charlie,</h1>
            <p>I am a JavaScript developer with a passion for UX. I have experience working with React, Node & Vanilla JS. Click below to launch my 3D portfolio or you can swipe left to view some examples of my work.</p>
            <Button  href={'https://d-portfolio-a2481.web.app/'} className='btn'>START 3D SITE</Button>
          </div>
          <div className='vid'><video autoPlay loop muted><source src={Vid} type='video/mp4'/></video></div>
      </SwiperSlide>

      <SwiperSlide className={smallScreen ? 'smSlide' : 'slide'}>
          <div className={smallScreen ? 'smContent' : 'content'}>
            <h1>React Component Collection</h1>
            <p>A library of easy to implement react components. To use a component in your project just download the files and follow the comments stated in the code.</p>
            <Button  href={'https://github.com/CharlieLaver/react-component-collection'} className='btn'>VIEW REPO</Button>
          </div>
          <div className='vid'><video autoPlay loop muted><source src={Vid2} type='video/mp4'/></video></div>
      </SwiperSlide>

      <SwiperSlide className={smallScreen ? 'smSlide' : 'slide'}>
          <div className={smallScreen ? 'smContent' : 'content'}>
            <h1>Custom Methods JS</h1>
            <p>JSON object with custom built JavaScript methods. The methods provide a slightly more convenient and elegant way to combat common js problems.</p>
            <Button  href={'https://github.com/CharlieLaver/custom-methods-js'} className='btn'>VIEW REPO</Button>
          </div>
          <div className='vid'><video autoPlay loop muted><source src={Vid3} type='video/mp4'/></video></div>
      </SwiperSlide>

      <SwiperSlide className={smallScreen ? 'smSlide' : 'slide'}>
          <div className={smallScreen ? 'smContent' : 'content'}>
            <h1>Android Games</h1>
            <p>I have experience building hyper casual games in the Unity engine. I used C# to program the game mechanics, AI and interface. All my games are 100% free to play and are available to download on the Play Store.</p>
            <Button  href={'https://play.google.com/store/apps/developer?id=Charlie+Laver'} className='btn'>VIEW GAMES</Button>
          </div>
          <div className='vid'><video autoPlay loop muted><source src={Vid4} type='video/mp4'/></video></div>
      </SwiperSlide>

    </Swiper>
  );
};


export default Slider;