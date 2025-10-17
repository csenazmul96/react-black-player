import {Spinner} from "./Spinner.tsx";
import type {Theme} from "../../types";
import React from "react";


const BufferingSpinner:React.FC<Theme>=({currentTheme})=> {
    return (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <Spinner currentTheme={currentTheme} />
        </div>
    );
}

export default BufferingSpinner