//Messages
//Author: Daria Koroleva
//Created: March 5,2023
//Description: Page to display messages
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet'
import Chat from '../components/messages/Chat';
import ChatFeed from '../components/messages/ChatFeed';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Messages() {
  
  const navigate = useNavigate();

  // checks if user is logged in, if not, redirects to login page
  useEffect(() => {
    if (localStorage.getItem("loggedIn") !== "1") {
      navigate("/login");
    }  
  }, []);


  const currentUser = localStorage.getItem("uid");
  const userName = localStorage.getItem("uname");
  const [conversations, setConversations] = useState([]);
  const [userSelected, setUserSelected] = useState('');
  const [showChatFeed, setShowChatFeed] = useState(true);
  const [respondents, setRespondents] = useState([]);


  useEffect(() => {
    axios
      .get("/api/messages/receiver", {
        params: { receiver: currentUser },
      })
      .then((res) => {
        const result = Object.entries(res.data).map(([user, { name }]) => ({ user, name }));        
        setRespondents(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {


    let promises = respondents.map((respondent) => {
      return getMessages(currentUser, respondent);
    });

    Promise.all(promises).then((conversations) => {
      //Sort by time of the latest message 
      conversations.sort((a, b) =>
        b.messages[b.messages.length - 1].datetime.localeCompare(a.messages[a.messages.length - 1].datetime))


      setConversations(conversations);
      if(respondents.length>0){
        setUserSelected(respondents[0].user);
      }
      
    });

  }, [respondents]);



  function getMessages(currentUser, respondent) {

    const sender = currentUser;
    const receiver = respondent.user;

    return axios.get('/api/messages/getmessage', {
      params: { sender, receiver },
    })
      .then((res) => {
        // handle the response data        
        return mapMessagesToUI(res.data, respondent);
      })
      .catch((err) => {
        // handle any errors
        console.log(err);
        return {};
      });
  }

  const postMessage = async (sender, receiver, message, time) => {
    await axios
      .post("/api/messages/postmessage", { sender, receiver, message, time })
      .then((res) => {

        let newMessage = {
          id: res.data._id,
          avatar: `/images/${res.data.sender}.jpg`,
          time: formatTime(res.data.time),
          datetime: res.data.time,
          user: res.data.sender,
          name: userName,
          message: res.data.message,
          position: "end"
        };

        const conversation = conversations.find((c) => c.user === receiver);
        conversation.messages = [...conversation.messages, newMessage];
        const newConversations = [conversation, ...conversations.filter((c) => c.user !== receiver)];
        setConversations(newConversations);
      })
      .catch((err) => console.log("Error", err));
  };

  function mapMessagesToUI(messagesData, respondent) {

    const messagesUI = {
      avatar: `/images/${respondent.user}.jpg`,
      user: `${respondent.user}`,
      name: `${respondent.name}`,
      title: "Software Engineer",
      messages: messagesData.map((m) => {

        let message = {
          id: m._id,
          avatar: `/images/${m.sender}.jpg`,
          time: formatTime(m.time),
          datetime: m.time,
          user: m.sender,
          name: (m.sender === currentUser) ? userName : respondent.name,
          message: m.message,
          position: (m.sender === currentUser) ? "end" : "start"
        };
        return message;
      }
      )
    };
    return messagesUI;
  }

  function formatTime(time) {
    const timed = new Date(time);
    const hours = timed.getHours();
    const minutes = timed.getMinutes();
    const formatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formatted;
  }


  function selectChat(user) {
    setUserSelected(user);
    mobileToggle();
  }

  function mobileToggle() {
    setShowChatFeed(!showChatFeed);
  }

  function removeChatItem(user) {
    const newConversations = conversations.filter((c) => c.user !== user);
    setConversations(newConversations);

    if (userSelected == user && newConversations.length > 0) {
      setUserSelected(newConversations[0].user);
    }
  }

  function getSelectedConversation() {
    return conversations.find(conversation => conversation.user === userSelected);
  }

  function addMessage(messageText, receiver) {
    const nowTime = new Date();
    postMessage(currentUser, receiver, messageText, nowTime.toISOString());
  }


  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Messages</title>
      </Helmet>


      <div className={`${(conversations.length > 0) ? 'hidden' : ''} mt-40`}>
        <h1 className="font-bold text-center">You have no messages</h1>
      </div>

      <div className={`${(conversations.length === 0) ? 'hidden' : ''} w-full sm:w-3/4 md:w-1/2 border m-auto`}>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className={`${showChatFeed ? 'hidden' : ''} sm:hidden p-2`} style={{ fontSize: "24px" }} onClick={mobileToggle}>
            <FaArrowLeft />
          </div>

          <div className={`${!showChatFeed ? 'hidden' : ''} sm:block  col-span-1 border`}>
            <ChatFeed conversations={conversations} selectChat={selectChat} removeChatItem={removeChatItem} />
          </div>

          <div className={`${showChatFeed ? 'hidden' : ''}  sm:block col-span-1 border`}>
            <Chat conversation={getSelectedConversation()} addMessage={addMessage} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages
