import './Home.css'
import Navbar from '../Components/Navbar/Navbar'
import Troubleshoot from '../Components/Troubleshoot/Troubleshoot'
import { useContext, useState } from 'react'
import { StateContext } from '../Utils/StateProvider'
import NewRoom from '../Components/NewRoom/NewRoom'

export default function Home() {
    const { isTroublshootActive, setTroubleshoot } = useContext(StateContext);
    const { newMeeting, setNewMeeting } = useContext(StateContext);
    const [isNew, setIsNew] = useState("new");
    const [svgColor, setSvgColor] = useState("#3B82F6")
    let [isOpen, setIsOpen] = useState(true)

    const handleClick = (status) => {
        setNewMeeting(true);
        setIsNew(status)
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const onModalClose = (data) => {
        setIsOpen(data);
    }

    return (
        <div>
            <Navbar />
            <div className="relative max-w-5xl mx-auto pt-20 px-4 sm:pt-24 lg:pt-32">
                <p className='text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white'>Short video meeting rooms now easier. Now free for everyone.</p>
                <p className='mt-6 text-lg text-slate-600 px-3 text-center max-w-3xl mx-auto dark:text-slate-400'>We re-developed the service we built for secure short and efficient meetings, shortmeet, to make it free and available for all.</p>
                <div className="my-8">
                    <div className="max-w-lg mx-auto grid grid-cols-2 gap-3">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white  outline-0 py-2 px-4 rounded-full flex items-center	 justify-center ease-in-out"
                            onClick={() => {
                                handleClick('new');
                                openModal()
                            }}
                        >
                            <img className="icon" src="images/plus-circle.svg" alt="" width={23} height={23} />
                            <span className="ml-2">New Room</span>
                        </button>
                        <button
                            className="hover:bg-blue-500 hover:text-white outline-0 text-blue-500 border border-blue-500 py-2 px-4 flex items-center	 justify-center  rounded-full ease-in-out"
                            onClick={() => {
                                handleClick('join');
                                openModal()
                            }}
                            onMouseOver={() => setSvgColor("#ffffff")} // Change this to the desired stroke color on hover
                            onMouseOut={() => setSvgColor("#3B82F6")}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={`${svgColor || '#3B82F6'}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather svg-icon feather-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                            <span className="ml-2">Join room with code</span>
                        </button>
                    </div>
                </div>
                <p className='text-center my-10 text-gray-500'>All copyrights reserved @shortmeet 2023 </p>
            </div>
            {newMeeting && <NewRoom status={isNew} onModalClose={onModalClose} />}
            {isTroublshootActive && <Troubleshoot />}
        </div>
    )
}
