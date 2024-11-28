import React, { useContext, useEffect, useRef, useState } from 'react'
import './NewRoom.css'
import { StateContext } from '../../Utils/StateProvider';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function NewRoom({ status, onModalClose }) {
    const { newMeeting, setNewMeeting } = useContext(StateContext);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const webcamRef = useRef(null);
    const navigate = useNavigate();

    const handleClick = () => {
        setNewMeeting(false);
    }


    useEffect(() => {
        function handleKeyPress(event) {
            if (event.key === 'Escape') {
                // Close the form when the "Esc" key is pressed
                setNewMeeting(false);
                closeModal();
            }
        }

        // Add the event listener
        window.addEventListener('keydown', handleKeyPress);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []); //

    const cameraToggle = () => {
        setIsCameraOn(!isCameraOn);
    }


    const webcamStyle = {
        width: 'max-content',   // Set the width to 50% of the parent container
        height: 'max-content',  // Set the height to 50% of the parent container
    };

    //form data
    const [formData, setFormData] = useState({
        roomId: "",
        username: "",
        password: "",
        confirmPassword: "",
        status: status
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevNote => {
            return {
                ...prevNote,
                [name]: value
            };
        });

    }
    const [errorMsg, setErrorMsg] = useState("");
    const formSubmit = () => {

        const fd = formData;
        setFormData({
            roomId: "",
            username: "",
            password: "",
            confirmPassword: "",
            status: status
        });

        if (fd.roomId.length > 0 && fd.username.length > 0 && fd.password.length > 0) {
            if (status === 'join') {
                navigate("/dashboard", { state: fd });
            } else {
                if (fd.confirmPassword.length > 0) {
                    navigate("/dashboard", { state: fd });
                } else {
                    setErrorMsg("All fields are required!");
                }
            }
        } else {
            setErrorMsg("All fields are required!");
        }
    }
    let [isOpen, setIsOpen] = useState(true)

    function closeModal() {
        setIsOpen(false);
        ModalCloseDataToParent(false);
    }

    function openModal() {
        setIsOpen(true);
    }
    
    const ModalCloseDataToParent = () => {
        onModalClose(false);
        setNewMeeting(false);   
    };

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        <div className="flex justify-between ">
                                            <span>{status === 'new' ? 'Create new' : 'Join'} room</span>
                                            <button className='hover:bg-gray-100 rounded px-2 text-gray-400' onClick={closeModal} >X ESC</button>
                                        </div>
                                    </Dialog.Title>

                                    <div className="grid  sm:grid-cols-1 lg:grid-cols-2 mt-4 gap-x-4 gap-y-4">
                                        <form action="" className="grid grid-cols-1 gap-y-2">
                                            <div className="sm:col-span-4">
                                                <label htmlFor="roomid" className="block text-sm font-medium leading-6 text-gray-700">
                                                    Room ID
                                                </label>
                                                <div className="mt-2">
                                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">

                                                        <input
                                                            type="text"
                                                            name="roomid"
                                                            id="roomid"
                                                            autoComplete="roomid"
                                                            className="block outline-0 flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                            placeholder="collegeProjectMeeting"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4 mt-4">
                                                <label htmlFor="hostname" className="block text-sm font-medium leading-6 text-gray-700">
                                                    {status === 'new' ? 'Set meeting credentials' : 'Your Details'}
                                                </label>
                                                <div className="mt-2">
                                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">

                                                        <input
                                                            type="text"
                                                            name="hostname"
                                                            id="hostname"
                                                            autoComplete="hostname"
                                                            className="block outline-0 flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                            placeholder={status === 'new' ? 'Host name' : 'Your Name'}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4">
                                                <div className="mt-2">
                                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">

                                                        <input
                                                            type="password"
                                                            name="password"
                                                            id="password"
                                                            autoComplete="password"
                                                            className="block outline-0 flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                            placeholder="Password"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {status === 'new' &&
                                                <div className="sm:col-span-4">
                                                    <div className="mt-2">
                                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">

                                                            <input
                                                                type="password"
                                                                name="cpassword"
                                                                id="cpassword"
                                                                autoComplete="username"
                                                                className="block outline-0 flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                                placeholder="Confirm Password"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>}
                                            {status === 'new' ?
                                                <button type="submit"
                                                    className="sm:col-span-4 shadow-sm bg-blue-500 hover:bg-blue-700 mt-2 text-white  outline-0 py-2 px-4 rounded-full flex items-center	 justify-center ease-in-out"
                                                    onClick={openModal}
                                                >Create room</button> : <button
                                                    className="sm:col-span-4 shadow-sm bg-blue-500 hover:bg-blue-700 mt-2 text-white  outline-0 py-2 px-4 rounded-full flex items-center	 justify-center ease-in-out"
                                                    onClick={formSubmit}
                                                >Join room</button>}
                                        </form>
                                        <div>
                                            {isCameraOn ?
                                                <div className="">
                                                    <Webcam
                                                        audio={false}
                                                        style={webcamStyle}
                                                        ref={webcamRef}
                                                        screenshotFormat="image/jpeg"
                                                    />

                                                </div> : <h3 className='text-red-500 bg-red-50 px-4 py-24 text-center border'>Please Switch on the camera</h3>
                                            }
                                            <div className="px-16 py-4 justify-center bg-slate-700">
                                                <div className="flex justify-between mx-auto  ">
                                                    {/* mic-2 */}
                                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g id="mic" clipPath="url(#clip0_121_14)">
                                                            <path id="Vector" d="M12 1.8103C11.2044 1.8103 10.4413 2.12637 9.87868 2.68898C9.31607 3.25159 9 4.01465 9 4.8103V12.8103C9 13.606 9.31607 14.369 9.87868 14.9316C10.4413 15.4942 11.2044 15.8103 12 15.8103C12.7956 15.8103 13.5587 15.4942 14.1213 14.9316C14.6839 14.369 15 13.606 15 12.8103V4.8103C15 4.01465 14.6839 3.25159 14.1213 2.68898C13.5587 2.12637 12.7956 1.8103 12 1.8103Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path id="Vector_2" d="M19 10.8103V12.8103C19 14.6668 18.2625 16.4473 16.9497 17.76C15.637 19.0728 13.8565 19.8103 12 19.8103C10.1435 19.8103 8.36301 19.0728 7.05025 17.76C5.7375 16.4473 5 14.6668 5 12.8103V10.8103" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path id="Vector_3" d="M12 19.8103V23.8103" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path id="Vector_4" d="M8 23.8103H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_121_14">
                                                                <rect width="24" height="24" fill="white" transform="translate(0 0.810303)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    {/* video */}
                                                    <svg width="25" onClick={cameraToggle} height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clipPath="url(#clip0_13_118)">
                                                            <path d="M23.5 7L16.5 12L23.5 17V7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M14.5 5H3.5C2.39543 5 1.5 5.89543 1.5 7V17C1.5 18.1046 2.39543 19 3.5 19H14.5C15.6046 19 16.5 18.1046 16.5 17V7C16.5 5.89543 15.6046 5 14.5 5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_13_118">
                                                                <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    {/* user + */}
                                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g id="user-plus" clipPath="url(#clip0_121_19)">
                                                            <path id="Vector" d="M17 21.8103V19.8103C17 18.7494 16.5786 17.732 15.8284 16.9819C15.0783 16.2317 14.0609 15.8103 13 15.8103H6C4.93913 15.8103 3.92172 16.2317 3.17157 16.9819C2.42143 17.732 2 18.7494 2 19.8103V21.8103" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path id="Vector_2" d="M9.5 11.8103C11.7091 11.8103 13.5 10.0194 13.5 7.8103C13.5 5.60116 11.7091 3.8103 9.5 3.8103C7.29086 3.8103 5.5 5.60116 5.5 7.8103C5.5 10.0194 7.29086 11.8103 9.5 11.8103Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path id="Vector_3" d="M21 8.8103V14.8103" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path id="Vector_4" d="M24 11.8103H18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_121_19">
                                                                <rect width="24" height="24" fill="white" transform="translate(0 0.810303)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    {/* settings-2 */}
                                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g id="settings" clipPath="url(#clip0_121_24)">
                                                            <path id="Vector" d="M12 15.8103C13.6569 15.8103 15 14.4672 15 12.8103C15 11.1534 13.6569 9.8103 12 9.8103C10.3431 9.8103 9 11.1534 9 12.8103C9 14.4672 10.3431 15.8103 12 15.8103Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path id="Vector_2" d="M19.4 15.8103C19.2669 16.1119 19.2272 16.4465 19.286 16.7709C19.3448 17.0953 19.4995 17.3946 19.73 17.6303L19.79 17.6903C19.976 17.876 20.1235 18.0966 20.2241 18.3394C20.3248 18.5822 20.3766 18.8425 20.3766 19.1053C20.3766 19.3681 20.3248 19.6284 20.2241 19.8712C20.1235 20.114 19.976 20.3346 19.79 20.5203C19.6043 20.7063 19.3837 20.8538 19.1409 20.9544C18.8981 21.0551 18.6378 21.1069 18.375 21.1069C18.1122 21.1069 17.8519 21.0551 17.6091 20.9544C17.3663 20.8538 17.1457 20.7063 16.96 20.5203L16.9 20.4603C16.6643 20.2298 16.365 20.0751 16.0406 20.0163C15.7162 19.9575 15.3816 19.9972 15.08 20.1303C14.7842 20.2571 14.532 20.4675 14.3543 20.7358C14.1766 21.0041 14.0813 21.3185 14.08 21.6403V21.8103C14.08 22.3407 13.8693 22.8494 13.4942 23.2245C13.1191 23.5996 12.6104 23.8103 12.08 23.8103C11.5496 23.8103 11.0409 23.5996 10.6658 23.2245C10.2907 22.8494 10.08 22.3407 10.08 21.8103V21.7203C10.0723 21.3893 9.96512 21.0683 9.77251 20.799C9.5799 20.5297 9.31074 20.3246 9 20.2103C8.69838 20.0772 8.36381 20.0375 8.03941 20.0963C7.71502 20.1551 7.41568 20.3098 7.18 20.5403L7.12 20.6003C6.93425 20.7863 6.71368 20.9338 6.47088 21.0344C6.22808 21.1351 5.96783 21.1869 5.705 21.1869C5.44217 21.1869 5.18192 21.1351 4.93912 21.0344C4.69632 20.9338 4.47575 20.7863 4.29 20.6003C4.10405 20.4146 3.95653 20.194 3.85588 19.9512C3.75523 19.7084 3.70343 19.4481 3.70343 19.1853C3.70343 18.9225 3.75523 18.6622 3.85588 18.4194C3.95653 18.1766 4.10405 17.956 4.29 17.7703L4.35 17.7103C4.58054 17.4746 4.73519 17.1753 4.794 16.8509C4.85282 16.5265 4.81312 16.1919 4.68 15.8903C4.55324 15.5945 4.34276 15.3423 4.07447 15.1646C3.80618 14.9869 3.49179 14.8916 3.17 14.8903H3C2.46957 14.8903 1.96086 14.6796 1.58579 14.3045C1.21071 13.9294 1 13.4207 1 12.8903C1 12.3599 1.21071 11.8512 1.58579 11.4761C1.96086 11.101 2.46957 10.8903 3 10.8903H3.09C3.42099 10.8826 3.742 10.7754 4.0113 10.5828C4.28059 10.3902 4.48572 10.121 4.6 9.8103C4.73312 9.50869 4.77282 9.17411 4.714 8.84971C4.65519 8.52532 4.50054 8.22598 4.27 7.9903L4.21 7.9303C4.02405 7.74456 3.87653 7.52398 3.77588 7.28118C3.67523 7.03839 3.62343 6.77813 3.62343 6.5153C3.62343 6.25247 3.67523 5.99222 3.77588 5.74942C3.87653 5.50663 4.02405 5.28605 4.21 5.1003C4.39575 4.91435 4.61632 4.76683 4.85912 4.66618C5.10192 4.56553 5.36217 4.51373 5.625 4.51373C5.88783 4.51373 6.14808 4.56553 6.39088 4.66618C6.63368 4.76683 6.85425 4.91435 7.04 5.1003L7.1 5.1603C7.33568 5.39084 7.63502 5.54549 7.95941 5.60431C8.28381 5.66313 8.61838 5.62342 8.92 5.4903H9C9.29577 5.36354 9.54802 5.15306 9.72569 4.88477C9.90337 4.61648 9.99872 4.30209 10 3.9803V3.8103C10 3.27987 10.2107 2.77116 10.5858 2.39609C10.9609 2.02102 11.4696 1.8103 12 1.8103C12.5304 1.8103 13.0391 2.02102 13.4142 2.39609C13.7893 2.77116 14 3.27987 14 3.8103V3.9003C14.0013 4.22209 14.0966 4.53648 14.2743 4.80477C14.452 5.07306 14.7042 5.28354 15 5.4103C15.3016 5.54342 15.6362 5.58313 15.9606 5.52431C16.285 5.46549 16.5843 5.31084 16.82 5.0803L16.88 5.0203C17.0657 4.83435 17.2863 4.68683 17.5291 4.58618C17.7719 4.48553 18.0322 4.43373 18.295 4.43373C18.5578 4.43373 18.8181 4.48553 19.0609 4.58618C19.3037 4.68683 19.5243 4.83435 19.71 5.0203C19.896 5.20605 20.0435 5.42663 20.1441 5.66942C20.2448 5.91222 20.2966 6.17247 20.2966 6.4353C20.2966 6.69813 20.2448 6.95839 20.1441 7.20118C20.0435 7.44398 19.896 7.66456 19.71 7.8503L19.65 7.9103C19.4195 8.14598 19.2648 8.44532 19.206 8.76971C19.1472 9.09411 19.1869 9.42869 19.32 9.7303V9.8103C19.4468 10.1061 19.6572 10.3583 19.9255 10.536C20.1938 10.7137 20.5082 10.809 20.83 10.8103H21C21.5304 10.8103 22.0391 11.021 22.4142 11.3961C22.7893 11.7712 23 12.2799 23 12.8103C23 13.3407 22.7893 13.8494 22.4142 14.2245C22.0391 14.5996 21.5304 14.8103 21 14.8103H20.91C20.5882 14.8116 20.2738 14.9069 20.0055 15.0846C19.7372 15.2623 19.5268 15.5145 19.4 15.8103Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_121_24">
                                                                <rect width="24" height="24" fill="white" transform="translate(0 0.810303)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
