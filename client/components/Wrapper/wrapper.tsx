'use client'
import './index.css';

const Wrapper = ({children} : any) => {
    return (
        <div className={"wrapper"}>
            {children}
        </div>
    )
}

export default Wrapper;