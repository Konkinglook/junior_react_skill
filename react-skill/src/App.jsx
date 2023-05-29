import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [poke,setPoke] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [number,setNumber] = useState(1);


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

  const beforPoke = () =>{
    setNumber((number) => number -1)
  }
  const nextPoke = () =>{
    setNumber((number) => number +1)
  }

  return (
    <div>
      <h1>{poke?.name}</h1>
      <img src={poke?.sprites?.other?.home?.front_default} alt={poke?.name} />
      <ul>
        {poke?.abilities?.map((abil,idx) =>( <li key={idx}>{abil.ability.name}</li>))} 
      </ul> 
      <button onClick={beforPoke}>Befor</button>
      <button onClick={nextPoke}>Next</button>
    </div>
  )
}

export default App
