import React from 'react'

export default function InviteParticipant() {
  return (
    <div className="h-screen flex flex-col p-3">
      <h3 className='py-3 text-white text-md'>Invite Participant</h3>
      <div className="w-full">
        
          <input
            type="email"
            name="email"
            id="email"
            className="block text-sm w-full outline-0 rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            placeholder="Email"
          />

        <button className='bg-blue-500 px-3 py-2 mt-3 text-sm text-white hover:bg-blue-600 rounded '>
         Send Invitation
        </button>
      </div>
    </div>
  )
}
