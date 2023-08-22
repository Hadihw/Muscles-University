//Messages
//Author: Daria Koroleva
//Created: March 5,2023
//Description: Component to render a message
import React from 'react'

function Message(props) {

    const { message } = props;


    return (
        <div>
            {message.position === "start"
                ? <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src={message.avatar} />
                        </div>
                    </div>
                    <div className="chat-header">
                        {message.name}
                        <time className="text-xs opacity-50">{message.time}</time>
                    </div>
                    <div className="chat-bubble">{message.message}</div>
                </div>
                :
                <div className="chat chat-end">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img src={message.avatar} />
                        </div>
                    </div>
                    <div className="chat-header">
                        {message.name}
                        <time className="text-xs opacity-50">{message.time}</time>
                    </div>
                    <div className="chat-bubble">{message.message}</div>
                </div>
            }

        </div>
    )
}

export default Message