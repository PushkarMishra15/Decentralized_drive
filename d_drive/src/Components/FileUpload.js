import React from 'react'
import { useState } from 'react'
import axios from "axios";
import "./FileUpload.css";

export default function FileUpload({contract,account,provider}) {
  
  const [file, setfile] = useState(null);
  const [fileName, setfileName] = useState("No image selected"); 

  
  const handleSubmit=async(e)=>{
     e.preventDefault();
     if(file){
      try{
      
      const formData = new FormData();
      formData.append("file",file)
  
      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `
          8e9618d9df84c130eae5`,
          pinata_secret_api_key: `
          f7349a06b0a7a11dd86984586692ceec8e70a04d05f38cbc2b663cd9fb7a5c90`,
          "Content-Type": "multipart/form-data",
        },
      });

      const ImgHash = `ipfc://${resFile.data.IpfsHash}`;
      const signer = contract.connect(provider.getSigner());
  
      signer.add(account,ImgHash);
      alert("Successfully Uploaded");
      setfileName("No image selected");
      setfile(null);

      }catch(e){
        alert("Unable to uplod image to pinata");
      }
     }
  }

  const retrieveFile=async(e)=>{
      const data = e.target.files[0];           // array of files object
      console.log(data);
      console.log(e.target.files[0].name);

      const reader = new window.FileReader();   
      reader.readAsArrayBuffer(data);
      reader.onloadend=()=>{

        setfile(e.target.files[0]);

      }
      setfileName(e.target.files[0].name);
      e.preventDefault();
  }
  
  return (
    <div className='top'>
      <form className="form" onSubmit={handleSubmit}>

      <label htmlFor="file-upload" className='choose'>Choose Image</label>
      <input  disabled={!account} type="file" id="file-upload" name="data" onChange={retrieveFile}/>
     
       <span className='textArea'> <p className="image"> Image : &nbsp; {fileName} </p> </span>
     
       <button type='submit' className='upload' disabled={!file} > <p className="upload-text">Upload Image</p> </button>
      </form>
      
    </div>
  )
}
