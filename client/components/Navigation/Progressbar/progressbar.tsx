'use client'

import {useEffect, useState} from "react";

const Progressbar = ({percentage, done}: {percentage: number, done: boolean}) => {
    const [progressed, setProgressed] = useState<boolean>();

    useEffect(() => {
        setProgressed(true);
        if(percentage < 100 && !done) {
            let timeout;
            if(!timeout) {
                setTimeout(() => setProgressed(false), 3000);
                clearTimeout(timeout);
            } else {
                clearTimeout(timeout);
                timeout = setTimeout(() => setProgressed(false), 3000)
            }
        }
    }, [percentage, done]);

    return (
        <div className={`w-full bg-gray-700 transition-all ease-in`} style={{height: `${(progressed === null && "5px") || (progressed ? "10px" : "5px")}`}}>
            <div className={`${done ? "bg-green-600" :"bg-blue-600"} h-full rounded-full w-full`} style={{ width: `${percentage}%`, transition: 'width 0.5s ease' }}></div>
        </div>
    )
}

export default Progressbar;