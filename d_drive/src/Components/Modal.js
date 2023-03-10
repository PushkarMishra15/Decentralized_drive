import React from 'react';
import { useEffect } from 'react';
import "./Modal.css";

export default function Modal({setmodalOpen,contract}) {
 
const sharing=async()=>{
    
   const address = document.querySelector(".address").value;
   await contract.allow(address);
   
};

useEffect(()=>{
  const accessList = async()=>{
    
    const addressList = await contract.shareAccess();
    let select = document.querySelector("#selectNumber");
    const options = addressList;

    for(let i=0;i<options.length;i++){
      let opt = options[i];
      let e1= document.createElement("option");
      e1.textContent=opt;
      e1.value=opt;
      select.appendChild(e1);

    }
  }
  contract && accessList();
},[]);
 
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">SHARE WITH</div>
        <div className="body">
        <input type="text" className="address" placeholder='Enter the Address' /> 
      </div>
      <form id="myForm">
        <select  id="selectNumber">
          <option  className="List-address">People with Access </option>
        </select>
      </form>
      <div className="footer">
        <button onClick={()=>{setmodalOpen(false)}} id="cancelBtn">Cancel</button>
        <button onClick={sharing}>Share</button>
      </div>
    </div>
  </div>
  )
}
