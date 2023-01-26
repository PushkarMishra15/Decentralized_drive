import React from 'react'
import { useState ,useEffect} from 'react';
import "./Display.css";

export default function Display({setdisplayOpen,contract,account,Otheraddress}) {
 
  const [data, setdata] = useState("");
  // const Otheraddress = document.querySelectorAll(".Input-address").value;
 
useEffect(()=>{

 
  const getData=async()=>{
      let dataArray;
  
      try {
      if(Otheraddress){
        dataArray=await contract.display(Otheraddress);
        console.log(dataArray);
      }else{
       
        dataArray=await contract.display(account);
        console.log(dataArray);
      }
    }catch(e){
      alert("You don't have access ");
    }
      const isEmpty = Object.keys(dataArray).length===0;
         
      if(!isEmpty){

        const images = dataArray.map((item,i)=>{

          return(
          <a href={item} key={i} target='_blank'>
           <img key = {i} src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`} alt='new' className='image-list'></img>
          </a>
          ) 
      })
        setdata(images);
      }else{ 
        alert("No image to display");
      }
  }
  contract && getData();
},[]);
 
  return (
   <>
   <div className="Display-Container">
    <div className='image-list'>{data}</div>
    
    <button onClick={()=>{setdisplayOpen(false)}} className='Backbtn'>Back</button>
    {/* <button className=" getdataBtn" onClick={getData}>Get Data</button> */}
    </div>
   </>
  )
}
