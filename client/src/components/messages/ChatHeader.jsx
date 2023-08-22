//Messages
//Author: Daria Koroleva
//Created: March 5,2023
//Description: Show chat header for receiver user
import React from 'react'

function ChatHeader(props) {

    const {avatar, user,name, title}=props;

    return (
        <div className="w-full m-auto p-2 shadow-lg ">
            <div className="container inline-flex justify-between">
                <div className='w-1/8 avatar'>
                    <div class="w-12 h-12 rounded-full">
                        <img src={avatar}/>
                    </div>
                </div>
                <div className="flex-grow p-2">
                    <p className="lg:text-md font-semibold">{name}</p>
                    {/* <p className="lg:text-md">{title}</p> */}
                </div>              
            </div>
        </div>
    )
}

export default ChatHeader