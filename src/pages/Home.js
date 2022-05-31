import React, { useEffect } from "react";
import "./Home.css";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { useState, useRef } from "react";
import { useNotification } from "web3uikit";
import { Link } from "react-router-dom";
import { get_posts_option } from "../variables";
import Post from "./Post";

const Home = ({isAuthenticated}) => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const addr = user.attributes.ethAddress;
  const contractProcessor = useWeb3ExecuteFunction();
  const [postsArr, setPostsArr] = useState(null);
  const [page, setPage] = useState(true);

  function changePage(pag){
    setPage(pag);
  };

  async function getContractPosts() {
    const web3 = await Moralis.enableWeb3();
    const res = await contractProcessor.fetch({
      params: get_posts_option,
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      }
    });
    setPostsArr(res);
  }
  // useEffect(() => {
  //   // if (performance.navigation.type === 1) {
  //   //   console.log("This page is reloaded");
  //   // } else {
  //   //   console.log("This page is not reloaded");
  //   // }
  //   // getContractPosts();
  // }, []);
  // getContractPosts();
  return (
    <>
      <div id="main-container">
        <div id="action-bar-container">
          <div class="action-bar">
            
            <div class="btn-group btn-group-dir">
              {page ? (
                <>
                  <div class="btn selected link" onClick={()=>{ getContractPosts(); changePage(true); }}>看板</div>
                  <div class="btn link" onClick={()=>{ changePage(false); }}>發文</div>
                </>
              ) : (
                <>
                  <div class="btn link" onClick={()=>{ getContractPosts(); changePage(true); }}>看板</div>
                  <div class="btn selected link" onClick={()=>{changePage(false); }}>發文</div>
                </>
              )}
            </div>
          </div>
        </div>
        {page ? (
        <div class="r-list-container action-bar-margin bbs-screen">
          {postsArr?.map((e)=> {
            let title = `[${e.type_}] ${e.title}`;
            let pb_value = parseInt(e.pb_value._hex);
            let timestamp = new Date(parseInt(e.post_time._hex) * 1000);
            let date = `${timestamp.getMonth()+1}/${timestamp.getDate()}`;
            return (
              <>
                <div className="r-ent">
                  <div class="nrec"><span class="hl f2">{pb_value}</span></div>
                  <div class="title">
                  <Link to={"/content"} state={{
                    title: title,
                    author: e.author,
                    timestamp: parseInt(e.post_time._hex),
                    content: e.content,
                    addr: e.author_addr,
                    id: e.id
                  }}>
                      {title} 
                    </Link>
                  </div>
                  <div class="meta">
                    <div class="author">{e.author}</div>
                    <div class="article-menu">
                      <div class="trigger">&#x22ef;</div>
                    </div>
                    <div class="date"> {date}</div>
                    <div class="mark"></div>
                  </div>
                </div>
              </>
            )
          })}
        </div>) : (
          <Post />
        )}
      </div>
    </>
  );
};

export default Home;
