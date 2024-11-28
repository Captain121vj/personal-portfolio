import { createContext, useState } from "react";
export const DashboardStateContext = createContext();
export default function DashboardStateProvider({ children }) {

    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isMicActive, setMicActive] = useState(true);
    const [isCameraActive, setCameraActive] = useState(true);
    const [isScreenShareActive, setScreenShareActive] = useState(false);
    const [isChatBoxActive, setChatBoxActive] = useState(false);
    const [isParticipantsActive, setParticipantsActive] = useState(false);
    const [isSettingsActive, setSettingsActive] = useState(false);

    const [isInviteParticipant, setInviteParticipant] = useState(false);
    return (
        <DashboardStateContext.Provider value={{
            isInviteParticipant,
            setInviteParticipant,
            
            isFullScreen,
            setIsFullScreen,
            
            isMicActive,
            setMicActive,
            
            isCameraActive,
            setCameraActive,
            
            isScreenShareActive,
            setScreenShareActive,
            
            isChatBoxActive,
            setChatBoxActive,
            
            isParticipantsActive,
            setParticipantsActive,
            
            isSettingsActive,
            setSettingsActive
        }}>
            {children}
        </DashboardStateContext.Provider>
    )
}