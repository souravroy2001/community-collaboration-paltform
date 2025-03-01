import { LogAuthContext } from '@/context/LogAuth'
import { ProfileProvider } from '@/context/ProfileContext'
import { Box } from '@chakra-ui/react'
import { Weight } from 'lucide-react'
import React,{ useContext ,useRef} from 'react'

function Home() {
  const {users} = useContext(LogAuthContext)
  const {profileImage} = useContext(ProfileProvider)
  const scrollRef=useRef(null)

  const scrollLeft=()=>{
    if(scrollRef.current){
      scrollRef.current.scrollBy({left:-300,behaviour:'smooth'})
    }
  }

  const scrollRight=()=>{
    if(scrollRef.current){
      scrollRef.current.scrollBy({left:300,behaviour:'smooth'})
    }
  }
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
          <button onClick={scrollLeft}>&lt;</button>
          <div className='scrollContainer' ref={scrollRef}>
            <div className='trendingPost'>
              {users?.map(({ id, name ,photoURL}) => (
                <div key={id} className="userCard">
                  <img src={photoURL} alt="" />
                  <p>{name}</p>
                </div>
              ))}
            </div>
          </div>
          <button onClick={scrollRight}>&gt;</button>
        </div>
      </div>

        <div className='stickers'>
              <div>
                <p>Birthday Mood</p>
                <img className="move-left-right" src="https://cdn-icons-png.flaticon.com/256/4213/4213673.png" alt="" style={{height:'40px',width:'40px'}}/>
                <img  className="move-left-right" src="https://cdn-icons-png.flaticon.com/256/4213/4213709.png" alt="" style={{height:'60px',width:'60px',marginTop:'15px'}}/>
              </div>
              <div style={{height:'130px',width:'auto'}}>
                <img src="https://cdn-icons-png.flaticon.com/256/4193/4193263.png" alt="" style={{height:'40px',width:'40px'}}/>
                <p>Animals</p>
                <img className="move-left-right" src="https://cdn-icons-png.flaticon.com/256/4193/4193310.png" alt="" style={{height:'60px',width:'60px',marginLeft:'20px'}}/>
              </div>
              <div className='span-col-2 '>
                <p>Months & Days</p>
                <img className="move-left-right" src="https://cdn-icons-png.flaticon.com/256/4213/4213515.png" alt="" style={{height:'60px',width:'80px'}}/>
              </div>
              <div>
                <p>Catchy Words</p>
                <img className="move-left-right" src="https://cdn-icons-png.flaticon.com/256/4329/4329939.png" alt="" style={{height:'60px',width:'60px'}}/>
                <img className="move-left-right"  src="https://cdn-icons-png.flaticon.com/256/4329/4329872.png" alt="" style={{height:'60px',width:'60px',marginLeft:'40px'}}/>
              </div>
              <div className='span-row-2 '>
                <img className="move-left-right"  src="https://cdn-icons-png.flaticon.com/256/8036/8036586.png" alt="" style={{height:'100px',width:'100px'}}/>
                <p>Friendship</p>
                <img  className="move-left-right" src="https://cdn-icons-png.flaticon.com/256/8041/8041699.png" alt="" style={{height:'80px',width:'80px',marginLeft:'30px'}}/>
              </div>
              <p>For more Stickers like this visit <a href="https://www.flaticon.com/">Sticker.ly</a></p>
        </div>
        <div className='discuss'>
          <h2>DM'S</h2>
          {users?.slice(0, 4).map(({ id, name,photoURL }) => (
            <div key={id}>
              <img src={photoURL} alt="" />
              <p>{name} <br /> <span className='span'> Connect & Collaborate</span></p>
              <button>→</button>
            </div>
          ))}
        </div>
          <div class="members">
            <img src="https://a.travel-assets.com/egds/marks/onekey__mod__gold.svg" alt="" width="50px" height="50px"/>
            <p>Members save 10% or more on over 100,000 collaborations worldwide when signed in, Don't miss the spot to spark 🎊 😊 !</p>
            <button class="sign">Sign in now</button>
          </div>
    </div>
  )
}

export default Home
