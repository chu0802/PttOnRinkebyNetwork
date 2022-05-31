import React, {useState} from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Content from "./pages/Content"
import Topbar from "./components/Topbar"
// import "./App.css";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { ConnectButton, Icon } from "web3uikit";
import { Link } from "react-router-dom";
import { join_option, addrToName_option } from "./variables";

const App = () => {
  const { authenticate, isAuthenticated, Moralis} = useMoralis();
  const [nameValue, setNameValue] = useState('');
  const contractProcessor = useWeb3ExecuteFunction();
  console.log(nameValue);
  const login = async () => {
    const web3 = await Moralis.enableWeb3();
    if (!isAuthenticated) {
      const user = await authenticate().catch(
        function (error) {
          console.log(error);
        });
      if (nameValue != ""){
        join_option["params"] = {
          "addr": user.get("ethAddress"),
          "_name": nameValue
        }
        console.log(join_option)
        const res = await contractProcessor.fetch({
          params: join_option,
          onSuccess: () => {
            console.log("success");
          },
          onError: (error) => {
            console.log(error);
          }
        });
      }
    }


  }

  return (
    <>
    {isAuthenticated ? (
      [
      <div id="topbar-container">
        <Topbar />
      </div>,
      <Routes>
        <Route path="/" element={<Home isAuthenticated={true}/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/content" element={<Content />} />
      </Routes>
      ]
    ) : (
      <div id="topbar-container">
        <div id="topbar" class="bbs-content">
          <div id="logo">Ptt On Rinkeby Network</div>
          <div class="btn link right" onClick={login}>
            Join
          </div>
          <div class="search-bar right">
            <input 
              class="query" 
              type="text"
              value={nameValue} 
              placeholder="Name&#x22ef;" 
              onChange={(e) => setNameValue(e.target.value)}
            />
          </div>
        </div>
        
      </div>
      
    )}
          
    </>
  );
};

export default App;
