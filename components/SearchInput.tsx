"use client"

import React, { useContext, useEffect, useState } from 'react'
import ChatContext from './ChatContext';

const SearchInput = ({ handleSearchfn }: { handleSearchfn: () => void }) => {
    const [inputValue, setInputValue] = useState("");
    const { setSearchValue } = useContext(ChatContext);

    useEffect(() => {
        setSearchValue(inputValue);
    }, [inputValue]);

    return (
        <div className='absolute top-3 left-3 flex bg-white  shadow-md'>
            <input
                type="text"
                placeholder='Search room'
                className='p-2 outline-none'
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
            />
            <button
                onClick={() => handleSearchfn()}
                className='bg-[#0C8F4E] hover:bg-[#5bb286] px-2 py-1 text-white cursor-pointer transition-colors duration-150'
            >Search</button>
        </div>
    )
}

export default SearchInput