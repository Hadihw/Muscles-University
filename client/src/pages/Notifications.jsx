import React, { useState , useEffect} from 'react';
import { Helmet } from 'react-helmet';
import Notification from '../components/Notification';
import { useNavigate } from "react-router-dom";

function Notifications() {

  const navigate = useNavigate();

  // checks if user is logged in, if not, redirects to login page
  useEffect(() => {
    if (localStorage.getItem("loggedIn") !== "1") {
      navigate("/login");
    }  
  }, []);

  const [notifications, setNotifications] = useState([
    { id: 1, age:"16m", user: "Monkey", type: "posted", description: "I am a happy Developer. I have five years of experience. I use HTML, JS, and CSS. I am also learning React.", avatar: "/images/avatar1.jpg" },
    { id: 2, age:"1h", user: "Bunny", type: "commented", description: "What if every window in your house could generate electricity? Learn more about the importance of solar power", avatar: "/images/avatar2.jpg" },
    { id: 3, age:"5h",user: "Cow", type: "posted", description: "Our Leadership Masterclass Series is starting soon!Feel free to message me if you have any questions.", avatar: "/images/avatar3.jpg" },
    { id: 4, age:"14h",user: "Monkey", type: "posted", description: "Passionate about Data Governance and Management? My team is growing and we are looking for Data Stewards to continuously bring value to our data consumers and producers.", avatar: "/images/avatar4.jpg" },
    { id: 5, age:"1d",user: "Bear", type: "commented", description: "We are honoured to be included in this year’s #SustainableYearbook as one of the top 5% sustainability performers in the transportation industry.", avatar: "/images/avatar5.jpg" },
    { id: 6, age:"5d",user: "Fox", type: "posted", description: "Hiring a Front-End Developer with experience in JS, HTML and CSS. Knowing React and UX design will be a plus. Remote Opportunity and competitive compensation.", avatar: "/images/avatar6.jpg" }
   
  ]);

  const removeNotification = (i) => setNotifications(notifications.filter( x => x.id!=i));

  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Notifications</title>
      </Helmet>
      <div className="flex flex-col h-screen my-auto items-center bgimg bg-cover w-full">
        <ul> 
          {notifications.map((notification) => {
            return (
              <li className='flex flex-col items-center' key={notification.id} >
                <Notification notification={notification} removeNotification={removeNotification}></Notification>
              </li>
            )
          })}
        </ul>
      </div>


    </div>
  )
}

export default Notifications