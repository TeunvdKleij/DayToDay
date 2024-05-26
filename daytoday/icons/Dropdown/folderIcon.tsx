'use client'
import React from 'react';

const FolderIcon = ({className}: { className?: string }) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width={38} height={30} viewBox="0 0 38 30">
            <path id="Icon_feather-folder" data-name="Icon feather-folder"
                  d="M38,28.5a3.279,3.279,0,0,1-3.5,3H6.5a3.279,3.279,0,0,1-3.5-3V7.5a3.279,3.279,0,0,1,3.5-3h8.75L18.75,9H34.5A3.279,3.279,0,0,1,38,12Z"
                  transform="translate(-1.5 -3)" strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"/>
        </svg>
    );
}

export default FolderIcon;