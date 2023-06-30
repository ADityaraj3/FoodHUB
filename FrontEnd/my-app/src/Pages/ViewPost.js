import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import {getDocs, collection, deleteDoc, doc} from "firebase/firestore"
import {auth, db} from "../firebase-config"
function ViewPost({isAuth}) {

    const [posts,setPosts] = useState([]);
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
        console.log("Effect called");
        getPosts();
      }, []);
    

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
                            <div className="deletePost">
                                {post.author.id===auth.currentUser.uid && (
                                    <button onClick={()=>{deletePost(post.id)}}>&#128465;</button> 
                                )}
                                
                            </div>
                        </div>
                        <div className="postTextContainer">
                            {post.postText}
                        </div>
                        <h3>@{post.author.name}</h3>
                    </div>
                )
            })
        }
      
    </div>
  )
}

export default ViewPost
