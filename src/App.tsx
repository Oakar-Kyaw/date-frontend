import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import cat from "../src/assets/image/loveCat.gif"
import cat1 from "../src/assets/image/loveCatCrying.gif"
import cat2 from "../src/assets/image/loveCatHappy.gif"
import cat3 from "../src/assets/image/loveCatKiss.gif"
import sound from "../src/assets/crush.m4a"

function App() {
  const audioRef = useRef(null);
  const [name, setName] = useState()
  const [value, setValue] = useState(true)
  const [image, setImage] = useState(cat)
  const [dateText, setDateText] = useState("Date Me Please?")
  const [disappear, setDisappear] = useState(false)
  const [position, setPosition] = useState({x:0,y:0})
  const [display, setDisplay] = useState("fix")
  const [showNo, setShowNo] = useState("block")

  const handleName = async (userName: string) => {
    const api = await axios.post("https://fun-backend-11lx.onrender.com/name",{userName : userName})
    if(api.data){
      setName(api.data.data.userName)
    }
  }

  const playMusic = (value: boolean) => {
    value === true ?
      new Audio(sound).play()
      : new Audio(sound).pause()
  }

  const handleChangeImage = (url: string, text: string, dis?: string) => {
     setImage(url)
     setValue(!value)
     setDateText(text)
     if(dis === "no"){
      const maxX = 500; // Maximum X coordinate within the container
      const maxY = 500; // Maximum Y coordinate within the container
      const newX = Math.floor(Math.random() * maxX);
      const newY = Math.floor(Math.random() * maxY);
      setPosition({x: newX, y:newY})
      setDisplay("absolute")
     }else if(dis == "yes"){
      setDisappear(true)
     } 
  }

  const objectStyle = {
    position: display,
    width: '60px',
    height: '40px',
    left: `${position.x}px`,
    top: `${position.y}px`,
    transition: 'left 0.5s, top 0.5s', // Add transition for smooth movement
  };
 
  useEffect(()=>{
    audioRef.current.play();
    Swal.fire({
      title: "Enter Your Name",
      input: "text",
      icon: "info"
    }).then((result) => {
      if (result.isConfirmed) {
        handleName(result["value"])
      }else{
        Swal.fire({
          title: "Please Enter Your Name",
          input: "text",
          icon: "info"
        }).then((result) => {
          if (result.isConfirmed) {
            handleName(result["value"])
          }
        });
      }
    });
  },[])
  console.log("name ",name)
  return (
    <div 
      className="h-screen bg-[#fafafa] font-serif">
        <div className="relative flex flex-col justify-center items-center h-full space-y-3">
             <audio ref={audioRef} controls>
                <source src={sound} type="audio/mpeg" hidden/>
                  Your browser does not support the audio element.
             </audio>
            <div className='text-4xl font-serif text-black'>
              Hay, {name} <span className='text-red-500 mt-4'>&#x2764;</span>	
            </div>
            <div className='text-2xl font-serif text-red-800'>
                {dateText}
            </div>
            <div className="w-64 h-64">
               <img src={image} className="w-full h-full bg-cover" alt="" />
            </div>
            <div className="flex space-x-12 ">
                {
                  !disappear ?
                <button 
                  className="bg-green-500 text-white p-2 px-6 rounded-md mt-3"
                  onMouseEnter={ ()=> !disappear ? handleChangeImage(cat2, "Yes..Yes..Please") : ""}
                  // onMouseLeave={()=>handleChangeImage(cat, "Would you date me?")}
                  onMouseDown={()=>handleChangeImage(cat3, "I Love You", "yes")}
                  >Yes</button>
                  :""
                }
                  {
                    !disappear ?
                      <button
                        style = {objectStyle}
                        className="text-white bg-red-900 rounded-md mt-3"
                        onMouseEnter={()=>handleChangeImage(cat1, "No, Please Don't", "no")}
                      >No</button>
                      : ""
                  }
                
            </div>
        </div>
    </div>
  )
}

export default App