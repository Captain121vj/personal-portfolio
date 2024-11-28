import Controls from "./controls/Controls";
import { useState, useRef, useContext, useEffect } from "react";
import Webcam from "react-webcam";
import { DashboardStateContext } from "../../Utils/DashboardStateProvider";
import Chat from './Chat/Chat';
import Participants from "./Participants/Participants";
import InviteParticipant from "./Settings/InviteParticipant";
import RecordScreen from "./RecordScreen/RecordScreen";
const Dashboard = () => {


  const { isCameraActive, setCameraActive } = useContext(DashboardStateContext);
  const { isChatBoxActive, setChatBoxActive } = useContext(DashboardStateContext);
  const { isParticipantsActive, setParticipantsActive } = useContext(DashboardStateContext);
  const { isInviteParticipant, setInviteParticipant } = useContext(DashboardStateContext)
  
  const webcamRef = useRef(null);
  let [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const webcamStyle = {
    width: '100%',   // Set the width to 50% of the parent container
    height: '100%',
    // Set the height to 50% of the parent container
  };

  useEffect(() => {

  }, [])
  return (
    <div className={`grid  grid-cols-8`}>
      {(isChatBoxActive || isParticipantsActive || isInviteParticipant) && <div className="col-span-2 bg-gray-900">
        {isChatBoxActive && <Chat />}
        {isParticipantsActive && <Participants />}
        {(isInviteParticipant && isParticipantsActive == false) && <InviteParticipant />}
      </div>}
      <div className={`grid grid-cols-2 lg:h-screen bg-gray-800 ${isParticipantsActive || isChatBoxActive || isInviteParticipant ? "col-span-6" : "col-span-8"}   text-white relative`}>
        <Controls />
        <div className="h-min p-1 rounded">

          {isCameraActive ?

            <Webcam
              audio={false}
              style={webcamStyle}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />

            : <h3 className='text-white  px-4 py-24 text-center'>Please Switch on the camera</h3>
          }
        </div>
        <div className="h-min p-1 rounded">

          {isCameraActive ?

            <Webcam
              audio={false}
              style={webcamStyle}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />

            : <h3 className='text-white  px-4 py-24 text-center'>Please Switch on the camera</h3>
          }
        </div>
      </div>

    </div>
  )
}

export default Dashboard;