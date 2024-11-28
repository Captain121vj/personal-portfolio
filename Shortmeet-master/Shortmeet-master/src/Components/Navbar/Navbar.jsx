import { useContext } from 'react';
import './Navbar.css'
import { StateContext } from '../../Utils/StateProvider';
import { useState } from 'react';
export default function Navbar() {
    const current = new Date();
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const date = `${current.getHours() % 12 === 0 ? 12 : current.getHours() % 12}:${current.getMinutes()} ${current.getHours() >= 12 ? "PM" : "AM"} - ${month[current.getMonth()]}  ${current.getDate()}  ${current.getFullYear()}`;
    // console.log(date);

    const { isTroublshootActive, setTroubleshoot } = useContext(StateContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

     
      function openModal() {
        setTroubleshoot(true)
      }
    return (
        <nav className="px-16 py-4 shadow-sm">
            <div className="container mx-auto flex justify-between items-center">
                <div className="brand text-blue-500">Shortmeet</div>

                <div className={`lg:flex ${isOpen ? 'block' : 'hidden'}`}>
                    <ul className={`lg:flex  space-x-4 ${isOpen ? 'flex-col gap-y-2 text-center' : ''}`}>

                        <li>
                            <a
                                href="/"
                                className="text-gray-500 leading-7 transition duration-300 ease-in-out"
                            >
                                About us
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className=" transition duration-300 ease-in-out"
                            >
                                <img src='images/help-circle.svg' className={`lg:flex navimg ${isOpen ? 'mx-auto' : 'hidden'}`} alt="" width={30} height={30} />
                            </a>
                        </li>

                        <li onClick={openModal}>
                            <a
                                href="#"
                                className=" hover:text-gray-200 transition duration-300 ease-in-out"
                            >
                                <img className={`lg:flex navimg ${isOpen ? 'mx-auto' : 'hidden'}`} src='images/settings-1.svg' alt="" width={30} height={30} />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="lg:hidden">
                    <button
                        onClick={toggleNavbar}
                        className="text-gray-600 hover:text-gray-200 focus:outline-none focus:text-gray-200"
                    >
                        <svg
                            className="w-6 h-6 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            {isOpen ? (
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M19 13H5v-2h14v2z"
                                />
                            ) : (
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
}
