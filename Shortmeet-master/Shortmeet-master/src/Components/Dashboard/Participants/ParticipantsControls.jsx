import './ParticipantsControls.css'
export default function ParticipantsControls() {
    return (
        <div className="flex bg-blue-600 p-1 items-center rounded" >
            
            <div className='hover:bg-blue-700 p-1 rounded' role="button">
                <img src="images/mic-off.svg" alt="" className="img-height" />
            </div>
            
            <div className='hover:bg-blue-700 p-1 rounded' role="button">
                <img src="images/video-off.svg" alt="" className="img-height" />
            </div>

            <div className='hover:bg-blue-700 p-1 rounded' role="button">
                <img src="images/kick-out.svg" alt="" className="img-height" />
            </div>


        </div>
    )
}