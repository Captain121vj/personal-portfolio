import React from 'react'
import './Chat.css'
import Messages from './Messages'
import { EnvelopeIcon } from '@heroicons/react/20/solid'
export default function Chat() {
    const chatmsgs = [

        {
            name: "Prathamesh",
            message: "Hi"
        },
        {
            name: "Vijay Wakure",
            message: "hello"
        },

        {
            name: "Savita Chaudhary",
            message: "Good Afternoon"
        },
        
    ];
    return (


        <div className="h-screen flex flex-col">
            <h3 className='p-3 border-b border-b-slate-600 text-white'>Chatbox</h3>
            <div className="flex-1 p-2 overflow-auto custom-scrollbar">
                {/* The use of 'flex-1' will make this div take up all available vertical space within the parent */}
                {chatmsgs.map((chat, index) =>
                    <Messages
                        name={chat.name}
                        message={chat.message}
                        key={index}
                    />
                )}
            </div>
            <div className="w-full flex justify-center items-center p-3">
                <div className="relative outline-0 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        {/* <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                        </svg>

                    </div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="block text-sm w-full outline-0 rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        placeholder="Message"
                    />
                </div>
                <button className='bg-blue-500 px-3 py-2 hover:bg-blue-600 rounded ms-2'>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="send">
                            <path id="Vector" d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path id="Vector_2" d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    )
}
