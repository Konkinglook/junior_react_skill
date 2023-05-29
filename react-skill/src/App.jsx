import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import ReactLoading from 'react-loading'

// Components
import Favpoke from './conponents/Favpoke'


function App() {
  const [poke,setPoke] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [number,setNumber] = useState(1);
  const [fav,setFav] = useState([]);



  useEffect(() => {

    let abortController = new AbortController(); // สร้างตัวแปร abortController ป้องกันการเรียกซ้ำ

    const loadPoke = async () =>{
      try{

        setLoading(true);
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`,
        {signal:abortController.signal}); // เป็นการยิง requst ไปยัง link AIP จะเก็บค่าใน response

        setPoke(response.data);
        setError("");
      }
      catch(error){
        setError("Someting want wrong",error);
      }
      finally{
        setLoading(false);

      }

    }
    loadPoke();

    return () => abortController.abort(); // เป็นยิง cancel requst ในการยิง API
  },[number]) // [] เป็นการกำหนดให้หน้า เวปรันเพียงครั้งเดียว ,[number] เป็นการ รีเฟสการส่งค่าใหม่เมือมีการเลือก poke ใหม่

  console.log(poke);

  ////////////// Fuction/////////////
  const addFav = () =>{
    setFav((oldState) => [...oldState,poke]); // ...oldState เป็นการส่งค่าเก่าเข้าไปด้วย แล้วบวกกับข้อมูลใหม่ เป็น array
  }


  console.log("Pokemon ID ",number);
  console.log("Your favourite " , fav);

  const beforPoke = () =>{
    setNumber((number) => number -1)
  }
  const nextPoke = () =>{
    setNumber((number) => number +1)
  }

  return (
    <div className="max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
        <div>
          {loading? 
            <ReactLoading type='spin' color='black' height={'20%'} width={'20%'}/>
            :
            <>
              <h1>{poke?.name}</h1>
              <button onClick={addFav}>Add to favourite</button>
              <br />
              <img src={poke?.sprites?.other?.home?.front_default} alt={poke?.name} />
              <ul>
                {poke?.abilities?.map((abil, idx) => (<li key={idx}>{abil.ability.name}</li>))}
              </ul>
              <button onClick={beforPoke}>Befor</button>
              <button onClick={nextPoke}>Next</button>
            </>}
        </div>
        <div>
          <h2 style={{fontSize:20 , fontWeight:700}}>Your Favourite Pokemon </h2>
          {fav.length > 0 ? <Favpoke fav={fav}/>: <div className='flex h-full justify-center items-center'><p style={{fontWeight:700}}>No favourite pokeman</p></div>}
        </div>
      </div>  
    </div>
  )
}

export default App
