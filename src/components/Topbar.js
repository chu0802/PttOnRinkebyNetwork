import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Icon } from "web3uikit";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { addrToName_option } from "../variables";

const Topbar = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const [showName, setShowName] = useState(false);
  const [name, setName] = useState();
  const [fullAddr, setFullAddr] = useState(false);
  const contractProcessor = useWeb3ExecuteFunction();

  async function getName (){
    const web3 = await Moralis.enableWeb3();
    addrToName_option["params"] = {
      "": user.get("ethAddress")
    }
    await contractProcessor.fetch({
      params: addrToName_option,
      onSuccess: (res) => {
        console.log(res);
        setName(res);
      },
      onError: (error) => {
        console.log(error);
      }
    });
  }
  return (
    <>
      <div id="topbar" class="bbs-content">
        <Link to="/" className="link" id="logo">
          <span>Ptt On Rinkeby Network</span>
        </Link>
        <span>&rsaquo;</span>
        
        <Link to="/" className="board link">
        <span class="board-label">看板 </span>Gossiping
        </Link>
        <div
          className="right small link"
          onClick={() => {
            Moralis.User.logOut().then(() => {
              window.location.reload();
            });
          }}
        
        >
          Logout
        </div>
        <div className="right small link" onClick={()=>{setShowName(!showName); getName();}}>
          {showName? "顯示地址" : "顯示名字"}
        </div>
        <div className="right small">
          {showName? (<>{name}</>) : (
            <>
            <div className="link" onClick={()=>{setFullAddr(!fullAddr);}}>
              {fullAddr? user.attributes.ethAddress : `${user.attributes.ethAddress.slice(0, 6)}...${user.attributes.ethAddress.slice(38)}`}
            </div>
            </>
          )}
        </div>
        
        
      </div>
    </>
  );
};

export default Topbar;

