import React, { useState } from 'react';
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { new_post_option } from "../variables";
const Post = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const contractProcessor = useWeb3ExecuteFunction();
  const [titleValue, setTitleValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [typeValue, setTypeValue] = useState('');
  async function newPost(){
    const web3 = await Moralis.enableWeb3();
    new_post_option["params"] = {
      "addr": user.attributes.ethAddress,
      "_type_": typeValue,
      "title": titleValue,
      "text": inputValue
    }
    const res = await contractProcessor.fetch({
      params: new_post_option,
      onSuccess: () => {
        console.log("success");
        setTitleValue("");
        setInputValue("");
        setTypeValue("");
      },
      onError: (error) => {
        console.log(error);
      }
    });
  }

  return (
    <>
      <div class="r-list-container action-bar-margin bbs-screen">
        <div class="search-bar">
          <input 
            class="query" 
            type="text"
            value={typeValue} 
            placeholder="分類&#x22ef;" 
            onChange={(e) => setTypeValue(e.target.value)}
          />
        </div>
        <div class="search-bar">
          <input 
            class="query" 
            type="text"
            value={titleValue} 
            placeholder="標題&#x22ef;" 
            onChange={(e) => setTitleValue(e.target.value)}
          />
        </div>
        <div class="search-bar">
          <textarea 
            class="query" 
            type="text"
            rows={8}
            value={inputValue} 
            placeholder="想說些什麼&#x22ef;" 
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div class="postbtn btn link right" onClick={newPost}>發布</div>
      </div>
    </>
  );
};

export default Post;
