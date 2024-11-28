import React, { useContext, useRef, useState } from 'react'
import './Card.css'
import { StateContext } from '../../../Utils/StateProvider';
import Webcam from 'react-webcam';
export default function Card({name,style}) {
  const [isShown, setIsShown] = useState(false);
  const {pinned,setPinned} = useContext(StateContext);
  const videoConstraints1 = {
    width: 1150,
    height: 870,
    // facingMode: "user"
 }
 const webcamStyle = {
  width: 'inherit',   // Set the width to 50% of the parent container
  height: '100vh',  // Set the height to 50% of the parent container
};
 const webcamRef = useRef(null);
  const handleClick = () =>{
    setPinned(name);
  }
  return (
    <>
        <div className='card' style={style}
           onMouseEnter={() => setIsShown(true)}
           onMouseLeave={() => setIsShown(false)}
        >
          {/* <Webcam
              audio={false}
              style={webcamStyle} 
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints1}
          />  */}
          {isShown &&
            <img className='pin' onClick={handleClick} src="images/pin.svg" width={24} height={24} alt="" />
          }
          <div className="center">
              <img style={{marginRight:0}} src="images/user.svg" width={30} height={30} alt="" />
              <p className='name'>{name}</p>
          </div>
        </div>
    </>
  )
}
