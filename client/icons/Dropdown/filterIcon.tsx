'use client'
import React from 'react';

const FilterIcon = ({className}: { className?: string }) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="33" height="30" viewBox="0 0 33 30">
            <path id="Icon_feather-filter" data-name="Icon feather-filter" d="M33,4.5H3L15,18.69V28.5l6,3V18.69Z"
                  transform="translate(-1.5 -3)" strokeLinecap="round"
                  strokeLinejoin="round" strokeWidth="2.5"/>
        </svg>

    )
}

export default FilterIcon;