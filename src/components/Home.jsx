import { LogAuthContext } from '@/context/LogAuth'
import { ProfileProvider } from '@/context/ProfileContext'
import { ChevronLeft, ChevronRight, Weight } from 'lucide-react'
import React, { useContext, useRef, useState } from 'react'
import defaultProfile from "../../public/Default Profile Image In Black Color.svg"

function Home() {
  const { users,currentUser } = useContext(LogAuthContext)

  const { profileImage } = useContext(ProfileProvider)
  const scrollRef = useRef(null)
  const [selectedUser, setSelectedUser] = useState("Receiver");

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behaviour: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behaviour: 'smooth' })
    }
  }


  const handleUserClick = (name) => {
    setSelectedUser(name);
  };
  console.log(users)
  return (
    <div className='wholehome'>
      <div className='homeDash'>
        <div className='homeHead'>
          <p>Home Dashboard</p>
          <img src={profileImage} alt="" />
        </div>

        <div className='bioBox'>
          <div className="bioCard">
            <p>For the innovator</p>
            <p>Disruptor by profession, creator by passion.”</p>
          </div>
          <div className="bioCard">
            <p>For the comedian</p>
            <p>Here for the 😂 laughs. Making your For You page funnier.</p>
          </div>
        </div>
        <div className='userProfile'>
          <p>User Profiles</p>
          <a href="https://www.kontentino.com/blog/bio-ideas-for-social-media-profiles-examples/">Bio ideas</a>
        </div>
        <div className="scrollControls">
          <button onClick={scrollLeft}> <ChevronLeft /> </button>
          <div className='scrollContainer' ref={scrollRef}>
            <div className='trendingPost'>
              {users?.map((user) => (
                <div key={user.id} className="userCard">
                  <img src={user.photoURL || defaultProfile} alt="" />
                  <div>
                    <p>{user.name}</p>
                    <p>{user.bio || "No Bio"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={scrollRight}>< ChevronRight /> </button>
        </div>
      </div>

      <div class="chatbot-container">
        <div class="chatbot-header">
          Chatbox
        </div>
        <div className='userName' >{selectedUser}</div>
        <div class="chatbot-messages" id="messages">
          <div class="message bot">Connect with people around worldwide</div>
        </div>
        <div class="chatbot-input">
          <input type="text" id="userInput" placeholder="Type your message..." />
          <button>Send</button>
        </div>
      </div>
      <div className='discuss'>
        <h2>Chat With</h2>
        {users?.slice(0, 4).map((user) => (
          <div key={user.id}>
            <div>
              <img src={user.photoURL || defaultProfile} alt="" />
              <div className="activeDot" style = {{backgroundColor:"rgb(0, 194, 0)"}}></div>
            </div>
            <p>{ user.email === currentUser.email ? `${user.name} (You)` : user.name } <br /> <span className='span'> Connect & Collaborate</span></p>
            <button onClick={() => handleUserClick(user.name)}>→</button>
          </div>
        ))}
      </div>
      <div class="members">
        <img src="https://a.travel-assets.com/egds/marks/onekey__mod__gold.svg" alt="" width="50px" height="50px" />
        <p>Members save 10% or more on over 100,000 collaborations worldwide when signed in, Don't miss out !</p>
        <button class="sign">Get Membership</button>
      </div>
    </div>
  )
}

export default Home
