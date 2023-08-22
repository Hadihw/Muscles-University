//Messages
//Author: Daria Koroleva
//Created: March 5,2023
//Description: Component to render Send a message
import React, { useState } from 'react';
import { FaPaperclip } from 'react-icons/fa';


function MessageSender(props) {

    const {receiver,addMessage} = props;

    const [messageText, setMessageText]  = useState('');

    function handleOnChange(event){
        const newText = event.target.value;
        setMessageText(newText);
    }

    function handleSend(){
        addMessage(messageText, receiver);
        setMessageText('');
    }

    return (
        <div className='w-full flex-col'>
            <div className='w-full p-2'>
                <textarea 
                    placeholder="Write a message..." 
                    className="textarea textarea-bordered textarea-lg w-full"
                    value={messageText}
                    onChange={handleOnChange}>
                </textarea>
            </div>
            
            <div className='flex w-full justify-between'>
                <div className="mr-2 btn btn-ghost btn-circle" style={{ fontSize: "25px" }}>
                    <FaPaperclip />
                </div>
                <button className="mt-2 btn btn-sm"  onClick={handleSend}>Send</button>                
            </div>

        </div>
    )
}

export default MessageSender