'use client'
import React from 'react';

const FilterIcon = ({className}: { className?: string }) => {
    return (
        <svg className={"w-[20px] h-[20px] align-middle items-center justify-center fill-[#c5c5c5] hover:hover-fill-white"} width="18"
             height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M13 12C14.306 12 15.418 12.835 15.83 14H17C17.2652 14 17.5196 14.1054 17.7071 14.2929C17.8946 14.4804 18 14.7348 18 15C18 15.2652 17.8946 15.5196 17.7071 15.7071C17.5196 15.8946 17.2652 16 17 16H15.83C15.6234 16.5855 15.2403 17.0926 14.7334 17.4512C14.2265 17.8099 13.6209 18.0025 13 18.0025C12.3791 18.0025 11.7735 17.8099 11.2666 17.4512C10.7597 17.0926 10.3766 16.5855 10.17 16H1C0.734784 16 0.48043 15.8946 0.292893 15.7071C0.105357 15.5196 0 15.2652 0 15C0 14.7348 0.105357 14.4804 0.292893 14.2929C0.48043 14.1054 0.734784 14 1 14H10.17C10.377 13.4149 10.7603 12.9084 11.2671 12.5502C11.774 12.1921 12.3794 11.9998 13 12ZM13 14C12.7348 14 12.4804 14.1054 12.2929 14.2929C12.1054 14.4804 12 14.7348 12 15C12 15.2652 12.1054 15.5196 12.2929 15.7071C12.4804 15.8946 12.7348 16 13 16C13.2652 16 13.5196 15.8946 13.7071 15.7071C13.8946 15.5196 14 15.2652 14 15C14 14.7348 13.8946 14.4804 13.7071 14.2929C13.5196 14.1054 13.2652 14 13 14ZM5 6C5.58899 5.99992 6.16497 6.17322 6.65613 6.49829C7.14729 6.82336 7.5319 7.28582 7.762 7.828L7.829 8H17C17.2549 8.00028 17.5 8.09788 17.6854 8.27285C17.8707 8.44782 17.9822 8.68695 17.9972 8.94139C18.0121 9.19584 17.9293 9.44638 17.7657 9.64183C17.6021 9.83729 17.3701 9.9629 17.117 9.993L17 10H7.83C7.6284 10.5703 7.25917 11.0663 6.77073 11.4231C6.28229 11.7799 5.69744 11.9808 5.09285 11.9994C4.48827 12.018 3.89217 11.8534 3.38273 11.5273C2.87328 11.2012 2.47427 10.7288 2.238 10.172L2.17 10H1C0.74512 9.99972 0.499968 9.90212 0.314632 9.72715C0.129296 9.55218 0.017765 9.31305 0.00282788 9.05861C-0.0121092 8.80416 0.0706746 8.55362 0.234265 8.35817C0.397855 8.16271 0.629904 8.0371 0.883 8.007L1 8H2.17C2.37701 7.41493 2.76032 6.90842 3.26715 6.55024C3.77397 6.19206 4.37938 5.99982 5 6ZM5 8C4.73478 8 4.48043 8.10536 4.29289 8.29289C4.10536 8.48043 4 8.73478 4 9C4 9.26522 4.10536 9.51957 4.29289 9.70711C4.48043 9.89464 4.73478 10 5 10C5.26522 10 5.51957 9.89464 5.70711 9.70711C5.89464 9.51957 6 9.26522 6 9C6 8.73478 5.89464 8.48043 5.70711 8.29289C5.51957 8.10536 5.26522 8 5 8ZM13 1.24966e-07C14.306 1.24966e-07 15.418 0.835 15.83 2H17C17.2652 2 17.5196 2.10536 17.7071 2.29289C17.8946 2.48043 18 2.73478 18 3C18 3.26522 17.8946 3.51957 17.7071 3.70711C17.5196 3.89464 17.2652 4 17 4H15.83C15.6234 4.58553 15.2403 5.09257 14.7334 5.45121C14.2265 5.80985 13.6209 6.00245 13 6.00245C12.3791 6.00245 11.7735 5.80985 11.2666 5.45121C10.7597 5.09257 10.3766 4.58553 10.17 4H1C0.734784 4 0.48043 3.89464 0.292893 3.70711C0.105357 3.51957 0 3.26522 0 3C0 2.73478 0.105357 2.48043 0.292893 2.29289C0.48043 2.10536 0.734784 2 1 2H10.17C10.377 1.41493 10.7603 0.908421 11.2671 0.55024C11.774 0.192059 12.3794 -0.000178928 13 1.24966e-07ZM13 2C12.7348 2 12.4804 2.10536 12.2929 2.29289C12.1054 2.48043 12 2.73478 12 3C12 3.26522 12.1054 3.51957 12.2929 3.70711C12.4804 3.89464 12.7348 4 13 4C13.2652 4 13.5196 3.89464 13.7071 3.70711C13.8946 3.51957 14 3.26522 14 3C14 2.73478 13.8946 2.48043 13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2Z"
            />
        </svg>

    )
}

export default FilterIcon;