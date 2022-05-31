import React, { useState } from 'react';
import {useLocation} from 'react-router-dom';
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { get_comments_option, new_comment_option } from "../variables";

const Content = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const {state} = useLocation();
  const [like, setLike] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [costValue, setCostValue] = useState();
  const [commentsArr, setCommentsArr] = useState();
  const [viewComments, setViewComments] = useState(false);
  const contractProcessor = useWeb3ExecuteFunction();
  const date = new Date(state.timestamp * 1000);

  async function newComment(){
    const web3 = await Moralis.enableWeb3();
    new_comment_option["params"] = {
      "_from": user.attributes.ethAddress,
      "post_id": state.id,
      "_like": like,
      "text": inputValue,
      "value": costValue
    }
    console.log(new_comment_option)
    const res = await contractProcessor.fetch({
      params: new_comment_option,
      
      onSuccess: () => {
        console.log("success");
        setInputValue("");
      },
      onError: (error) => {
        console.log(error);
      }
    });
  }

  async function getComments() {
    const web3 = await Moralis.enableWeb3();
    get_comments_option["params"] = {
      "post_id": state.id
    }
    const res = await contractProcessor.fetch({
      params: get_comments_option,
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      }
    });
    setCommentsArr(res);
  }

  return (
    <>
      <div id="main-container">
        <div id="main-content" class="bbs-screen bbs-content">
          <div class="post">
            <div class="article-metaline">
              <span class="article-meta-tag">作者</span>
              <span class="article-meta-value">{state.author}</span>
            </div>
            <div class="article-metaline-right">
              <span class="article-meta-tag">看板</span>
              <span class="article-meta-value">Gossiping</span>
            </div>
            <div class="article-metaline">
              <span class="article-meta-tag">標題</span>
              <span class="article-meta-value">{state.title}</span>
            </div>
            <div class="article-metaline">
              <span class="article-meta-tag">時間</span>
              <span class="article-meta-value">
                {`${date.getFullYear()} 年 ${(date.getMonth()+1).toString().padStart(2, '0')} 月 ${date.getDate().toString().padStart(2, '0')} 日 ${date.getHours().toString().padStart(2, '0')}:${date.getHours().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`}
              </span>
            </div>
              <br></br>
              {state.content}
              <br></br>
              <br></br>
              --
              <br></br>
              <br></br>

              <span class="f2">※ 發信站: Ptt On Rinkeby Network (porn.cc), 來自: {state.addr}<br></br></span>
              <span class="f2">※ 文章網址: <a href={`https://www.porn.cc/bbs/Gossiping/${state.timestamp}.html`} target="_blank" rel="noreferrer noopener nofollow">{`https://www.porn.cc/bbs/Gossiping/${state.timestamp}.html`}</a></span>
          </div>
          <br></br>
          <div class="comment">
            {viewComments? (
              <>
                <div class="postbtn btn link" onClick={() => {setViewComments(false)}}>隱藏留言</div>
                <div class="postbtn btn link" onClick={() => {getComments();}}>刷新留言</div>
                {commentsArr?.map((e)=> {
                  console.log(e);
                  let date = new Date(parseInt(e.comment_time)*1000);
                  let addr = `${e.author_addr.slice(0, 6)}...${e.author_addr.slice(38)}`
                  return (
                    <>
                      <div class="push">
                        {e.like? (<><span class="hl push-tag">推</span></>): (<><span class="f1 hl push-tag">噓</span></>)}
                        <span class="f3 hl push-userid">{e.author}</span>
                        <span class="f3 push-content">: {e.content}</span>
                        <span class="push-ipdatetime"> {`${addr} ${(date.getMonth()+1).toString().padStart(2, '0')}/${(date.getDate()).toString().padStart(2, '0')} ${(date.getHours()+1).toString().padStart(2, '0')}:${(date.getMinutes()+1).toString().padStart(2, '0')}`}</span>
                      </div>
                    </>
                  )
                })}
            </>
            ) : (
              <>
              <div class="postbtn btn link" onClick={() => {setViewComments(true); getComments();}}>顯示留言</div>
              <div class="postbtn btn link" onClick={() => {getComments();}}>刷新留言</div>
              </>
            )}
            
            <div class="search-bar">
              <input 
                class="query" 
                type="text"
                value={inputValue}
                placeholder="想說些什麼&#x22ef;"
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div class="commentbtn btn link right" onClick={newComment}>留言</div>
            <div class="search-bar right">
              <input
                class="query" 
                type="number"
                value={costValue}
                placeholder="100"
                onChange={(e) => setCostValue(e.target.value)}
              />
            </div>
            <div class="commentbtn btn link right" onClick={()=>{setLike(!like); console.log(like);}}>{like? "推" : "噓"}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
