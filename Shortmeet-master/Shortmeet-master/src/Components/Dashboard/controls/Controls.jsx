import './Controls.css'
import { useContext } from 'react';
import { DashboardStateContext } from '../../../Utils/DashboardStateProvider';
import { useNavigate } from 'react-router-dom';
import RoomSettings from '../Settings/RoomSettings';

const Controls = () => {

    const navigate = useNavigate()
    const { isMicActive, setMicActive } = useContext(DashboardStateContext);
    const { isCameraActive, setCameraActive } = useContext(DashboardStateContext);
    const { isScreenShareActive, setScreenShareActive } = useContext(DashboardStateContext);
    const { isChatBoxActive, setChatBoxActive } = useContext(DashboardStateContext);
    const { isParticipantsActive, setParticipantsActive } = useContext(DashboardStateContext);
    const { isSettingsActive, setSettingsActive } = useContext(DashboardStateContext);
    const { isInviteParticipant, setInviteParticipant } = useContext(DashboardStateContext)


    const closeMeetingRoom = () => {
        if (confirm('Are sure you want to quite this room?'))
            navigate('/')
    }


    return (
        <div className="bg-slate-900 p-1 absolute bottom-0 left-1/2 -translate-x-1/2 mb-6 flex gap-1 rounded-md z-999" >
            <div className={`p-3 ${isMicActive === false ? 'bg-red-600' : 'hover:bg-slate-800'} rounded-md`} role="button" onClick={() => setMicActive(!isMicActive)}>
                {!isMicActive ? <img src="images/mic-off.svg" className='img-height' alt="" /> : <img src="images/mic-2.svg" className='img-height' alt="" />}
            </div>
            <div className={`p-3 ${isCameraActive === false ? 'bg-red-600' : 'hover:bg-slate-800'} rounded-md`} role="button" onClick={() => setCameraActive(!isCameraActive)}>
                {!isCameraActive ? <img src="images/video-off.svg" alt="" className='img-height' /> : <img src="images/video.svg" alt="" className='img-height' />}
            </div>
            <div className={`p-3 ${isScreenShareActive === true ? 'bg-slate-800' : 'hover:bg-slate-800'} rounded-md`} role="button" onClick={() => setScreenShareActive(!isScreenShareActive)}>
                <img src="images/screenshare.svg" alt="" className='img-height' />
            </div>
            <div className={`p-3 ${isChatBoxActive === true ? 'bg-slate-800' : 'hover:bg-slate-800'} rounded-md`} role="button" onClick={() => { setChatBoxActive(!isChatBoxActive); setParticipantsActive(false) }}>
                {isChatBoxActive ? <img src="images/chat-active.svg" className='img-height' alt="" /> : <img src="images/chat.svg" className='img-height' alt="" />}
            </div>
            <div className={`p-3 ${isParticipantsActive === true ? 'bg-slate-800' : 'hover:bg-slate-800'} rounded-md`} role="button" onClick={() => { setParticipantsActive(!isParticipantsActive); setChatBoxActive(false); setInviteParticipant(false); }}>
                {isParticipantsActive ? <img src="images/Participants-active.svg" className='img-height' alt="" /> : <img src="images/Participants.svg" className='img-height' alt="" />}

            </div>
            <RoomSettings />
            <div className="p-3 bg-red-500 hover:bg-red-600 rounded-md" role="button" onClick={closeMeetingRoom}>
                <img src="images/phone-missed.svg" className='img-height' alt="" />
            </div>
        </div>
    )
}
export default Controls;