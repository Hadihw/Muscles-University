//Messages
//Author: Daria Koroleva
//Created: March 5,2023
//Description: Show messages send/receive between two users
import React, { useState } from 'react'
import ChatHeader from './ChatHeader';
import Message from './Message'
import MessageSender from './MessageSender';

function Chat(props) {

    const { conversation, addMessage } = props;

    if (!conversation) {
        return <div></div>;
    }

    return (
        <div>
            <ChatHeader avatar={conversation.avatar} user={conversation.user} name={conversation.name} title={conversation.title} />
            <div className='p-2'>
                {conversation.messages.map((m) => {
                    return (
                        <div key={m.id}>
                            <Message message={m} />
                        </div>
                    )
                }
                )}
            </div>

            <div className='border mt-4'>
                <MessageSender receiver={conversation.user} addMessage={addMessage} />
            </div>
        </div>
    )
}

export default Chat