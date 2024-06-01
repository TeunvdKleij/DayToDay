interface DotsIconInterface{
    onClick?: () => void,
    className?: string
}

const DotsIcon = ({onClick, className} : DotsIconInterface) => {
    return (
        <svg className={className} onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="6" height="27" viewBox="0 0 6 27">
            <g id="Icon_feather-more-vertical" data-name="Icon feather-more-vertical" transform="translate(-15 -4.5)">
                <path id="Path_1" data-name="Path 1" d="M19.5,18A1.5,1.5,0,1,1,18,16.5,1.5,1.5,0,0,1,19.5,18Z"
                      fill="none"
                      stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                <path id="Path_2" data-name="Path 2" d="M19.5,7.5A1.5,1.5,0,1,1,18,6a1.5,1.5,0,0,1,1.5,1.5Z" fill="none"
                      stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                <path id="Path_3" data-name="Path 3" d="M19.5,28.5A1.5,1.5,0,1,1,18,27,1.5,1.5,0,0,1,19.5,28.5Z"
                      fill="none"
                      stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
            </g>
        </svg>


    );
}
export default DotsIcon