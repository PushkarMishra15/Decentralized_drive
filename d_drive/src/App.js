import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import {useState,useEffect} from "react";
import {ethers} from 'ethers';
import FileUpload from "./Components/FileUpload";
import Display from "./Components/Display";
import Modal from "./Components/Modal";
import "./home.css";
function App() {

  const [account, setaccount] = useState("");
  const [contract, setcontract] = useState(null);
  const [provider, setprovider] = useState(null);
  const [modalOpen, setmodalOpen] = useState(false);
  const [displayOpen, setdisplayOpen] = useState(false);
  // const [InputAddress, setInputAddress] = useState("");

  const Otheraddress = document.querySelectorAll(".Input-address").value;
  // setInputAddress(Otheraddress);

 useEffect(()=>{
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const loadprovider =async()=>{
    if(provider){

     window.ethereum.on("chainChanged",()=>{
       window.location.relod();
     });

     window.ethereum.on("accountsChanged",()=>{
      window.location.reload();
     })
      
      await provider.send("eth_requestAccounts",[]);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setaccount(address);
      let contractAddress = "0x490523C2ef750d55B3bdA404a24D49475Ff39605";

      const contract = new ethers.Contract(contractAddress,Upload.abi,signer);
      console.log(contract);
      setcontract(contract);
      setprovider(provider);
    }else{
     console.log("Metamask is not installed"); 
    }
  };
  provider && loadprovider();
 },[]);

  return (
    <>
  
  <div className="container">
    <div className="container-head">
        <h1 className="dfs">Decentralized File System</h1>   </div>
    
     <div className="container-body">
     <div className="account">
           <div className="account-head"> Account : </div>   <p className="account-value"> {account?account:"Not Connected "}</p>
     </div>
          
     <input type="text" placeholder='Enter address' className='Input-address'/>

     <FileUpload account = {account} provider={provider} contract={contract}></FileUpload>
      
     {/* <Display contract={contract} account={account}></Display> */} 
     
   
    
     {!displayOpen && (<button className="getdata getdataBtn" onClick={()=> setdisplayOpen(true)}>Get Data</button>)}{""}
    

     {!modalOpen && (<button className="share" onClick={() => setmodalOpen(true)}>Share</button>)}{""}
     { modalOpen && (<Modal setmodalOpen={setmodalOpen} contract={contract}></Modal>)}   

     { displayOpen && (<Display setdisplayOpen={setdisplayOpen} contract={contract} account={account} Otheraddress={Otheraddress}></Display>) }
     
    </div>
    </div> 
    </>
  );
}

export default App;
