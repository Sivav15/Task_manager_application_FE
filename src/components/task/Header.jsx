import React, { useState } from 'react'
import AddTaskModal from './addTaskModal';

const Header = () => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <div className="mb-2 ">
            <button className="px-6 py-1 mb-2 bg-blue-600 text-white rounded" onClick={handleClickOpen}>Add Task</button>
            <div className='flex justify-between items-center flex-wrap  border-gray-100 border-2 rounded-lg shadow-lg  px-4'>
                <div className='w-80'>
                    <label className="" >Search: </label>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-2 py-1 my-2 border rounded outline-none"
                    />
                </div>
                <div className='w-40'>
                    {/* <div className='flex justify-end w-full items-center gap-1'> */}
                    <label className="" >Sort By: </label>
                    <select className="px-2 py-1 my-2 border rounded outline-none cursor-pointer">
                        <option>Recent</option>
                        <option>Recent</option>
                        <option>Recent</option>
                    </select>
                    {/* </div> */}
                </div>
            </div>
            <AddTaskModal open={open} onClose={handleClose} />
        </div>
    )
}

export default Header