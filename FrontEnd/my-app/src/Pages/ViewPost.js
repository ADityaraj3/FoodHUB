import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import {getDocs, collection, deleteDoc, doc} from "firebase/firestore"
import {auth, db} from "../firebase-config"
import {useContext} from "react";
import { UserContext } from '../UserContext';
function ViewPost({isAuth}) {

    const [posts,setPosts] = useState([]);
    const {setUserInfo, userInfo} = useContext(UserContext);
    const postsCollectionRef = collection(db,"posts");

    const getPosts = async () => {
        try {
          const data = await getDocs(postsCollectionRef);
          setPosts(
            data.docs.map((post) => ({
              ...post.data(),
              id: post.id,
            }))
          );
        } catch (err) {
          console.log(err);
        }
      };
    
      const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
        getPosts();
      };
    
      useEffect(() => {
         
        fetch('http://localhost:4000/profile', {
          credentials: 'include',
        }).then((response) => {
          response.json().then((userInfo) => {
            setUserInfo(userInfo);
          });
        });
        console.log("Effect called");
        getPosts();
      }, [setUserInfo]);
      const username= userInfo?.username;
      const id = userInfo?.id;

  return (
    
    <div className="homePage">
        {
            posts.map((post) => {
                return(
                    <div className="post">
                        <div className="postHeader">
                            <div className="title">
                                <h1>{post.title}</h1>
                            </div>

                            {/* basically check here whether user is logged in using firebase or id/pass and then conditionally handle the deletion */}

                            {(isAuth ) && (
                              <div className="deletePost">
                                  {post.author.id===auth.currentUser.uid && (
                                      <button onClick={()=>{deletePost(post.id)}}>&#128465;</button> 
                                  )}
                                
                              </div>
                            )}
                            {(id ) && (
                              <div className="deletePost">
                                  {post.author.id===id && (
                                      <button onClick={()=>{deletePost(post.id)}}>&#128465;</button> 
                                  )}
                                
                              </div>
                            )}
                        </div>
                        <div className="postTextContainer">
                            {post.postText}
                        </div>
                        <h3>@{post.author.name}</h3>
                        <h3>{id}</h3>
                        <h3>{post.author.id}</h3>
                    </div>
                )
            })
        }
      
    </div>
  )
}

export default ViewPost
