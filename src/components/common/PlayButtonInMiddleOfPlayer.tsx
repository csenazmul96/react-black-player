import {Play, RotateCcw} from "lucide-react";

interface propsTypes {
    isVideoEnded: boolean;
    togglePlay: () => void;
    currentTheme: {
        name: string,
        primaryColor: string,
        secondaryColor: string,
        backgroundColor?: string ,
        textColor?: string,
        accentColor?: string,
    }
}

function PlayButtonInMiddleOfPlayer({currentTheme, togglePlay, isVideoEnded}: propsTypes) {
    return (
        <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
            onClick={(e) => {
                e.stopPropagation();
                togglePlay();
            }}
        >
            <div
                className="w-20 h-20 rounded-full flex items-center justify-center relative"
                style={{ backgroundColor: `${currentTheme.primaryColor}B3`, color: currentTheme.textColor || '#FFFFFF' }}
            >
                {isVideoEnded ? (
                    <RotateCcw className="w-12 h-12" strokeWidth={1.5} />
                ) : (
                    <Play className="w-12 h-12" strokeWidth={1.5} />
                )}
            </div>
        </div>
    );
}

export default PlayButtonInMiddleOfPlayer;