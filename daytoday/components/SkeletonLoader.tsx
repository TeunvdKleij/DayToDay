import React from 'react';

const SkeletonLoader = () => {

    return (
    <div className="flex justify-center flex-col bg-eerie-black rounded-lg p-5 m-5 md:w-2/3 w-4/5 animate-pulse">
        <div className="flex justify-between mb-3 align-middle items-center">
            <div className="flex flex-col gap-5 mb-3 w-full">
                <div className="flex justify-between w-full items-center">
                    <div className="h-6 rounded-full bg-grey md:w-96 sm: w-64 mb-4"></div>
                    <div className='h-3 rounded-full bg-grey w-32 mb-4'></div>
                </div>
                <div className='flex gap-2'>
                    <div className="h-8 rounded-lg bg-grey w-20 pt-1 pb-1 pr-2 pl-2"></div>
                    <div className="h-8 rounded-lg bg-grey w-8 pt-1 pb-1 pr-2 pl-2"></div>
                    <div className="h-8 rounded-lg bg-grey w-8 pt-1 pb-1 pr-2 pl-2"></div>
                </div>
                <div className='h-4'></div>
                <div>
                    <div className='flex gap-2'>
                        <div className="h-8 rounded-lg bg-grey w-20 pt-1 pb-1 pr-2 pl-2"></div>
                    </div>
                </div>
            </div>
          </div>
    </div>
    );
};

export default SkeletonLoader;
