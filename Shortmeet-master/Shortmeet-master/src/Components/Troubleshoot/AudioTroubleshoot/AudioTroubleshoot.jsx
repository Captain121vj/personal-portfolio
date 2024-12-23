import React, { useState, useContext, Fragment } from 'react';
import SpeakersTroubleshoot from '../SpeakersTroubleshoot/SpeakersTroubleshoot';
import { StateContext } from '../../../Utils/StateProvider';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import VoiceLevelIndicator from '../VoiceLevelIndicator/VoiceLevelIndicator';
const people = [
    { id: 1, name: 'Default' },
    { id: 2, name: 'Arlene Mccoy' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const AudioTroubleshoot = () => {
    const [selected, setSelected] = useState(people[0]);
    const { isTroublshootActive, setTroubleshoot } = useContext(StateContext);

    return (
        <div>
            <div className="my-4">
                <Listbox value={selected} onChange={setSelected}>
                    {({ open }) => (
                        <>
                            <Listbox.Label className="block text-sm font-medium leading-6 text-blue-500">Microphone</Listbox.Label>
                            <div className="relative mt-2">
                                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 sm:text-sm sm:leading-6">
                                    <span className="block truncate">{selected.name}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                </Listbox.Button>

                                <Transition
                                    show={open}
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {people.map((person) => (
                                            <Listbox.Option
                                                key={person.id}
                                                className={({ active }) =>
                                                    classNames(
                                                        active ? 'bg-blue-500 text-white' : 'text-gray-900',
                                                        'relative cursor-default select-none py-2 pl-8 pr-4'
                                                    )
                                                }
                                                value={person}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                            {person.name}
                                                        </span>

                                                        {selected ? (
                                                            <span
                                                                className={classNames(
                                                                    active ? 'text-white' : 'text-indigo-600',
                                                                    'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                                )}
                                                            >
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </>
                    )}
                </Listbox>
            </div>
            <div className="my-4">
                {isTroublshootActive && <VoiceLevelIndicator />}
            </div>

            <div className="my-4">
                {isTroublshootActive && <SpeakersTroubleshoot />}
            </div>
        </div>

    );
};

export default AudioTroubleshoot;
