import React from 'react'
import {useState} from 'react'
import {addDoc, collection} from "firebase/firestore"
import {db, auth} from '../firebase-config'
import {useNavigate} from "react-router-dom"
import {useContext, useEffect} from "react";
import { UserContext } from '../UserContext';
function CreatePost() {

  const [title,setTitle] = useState('');
  const [postText, setPostText] = useState("");
  const {setUserInfo, userInfo} = useContext(UserContext);

  useEffect(() => {
   
   fetch('http://localhost:4000/profile', {
     credentials: 'include',
   }).then((response) => {
     response.json().then((userInfo) => {
       setUserInfo(userInfo);
     });
   });
 }, [ setUserInfo]);

  const postsCollectionRef = collection(db,"posts");
  let navigate = useNavigate();
  const username= userInfo?.username;
  const id = userInfo?.id;
  const createPost = async () => {
    if (auth.currentUser || username) {
      const author = {
        name: auth.currentUser?.displayName || username || '',
        id: auth.currentUser?.uid || id || '', //add the id of user here after knowing how to get it from mongo
      };
  
      await addDoc(postsCollectionRef, {
        title,
        postText,
        author,
      });
  
      navigate('/');
    } else {
      alert('You need to be logged in to create a post.');
    }
  };

  return (  
    <div className="createPostPage">
      <div className="cpContainer"> 
          <h1>Create a post</h1>
          <div className="inputGp">
            <label>Title: </label>
            <input placeholder='Title...' onChange={(event) => {setTitle(event.target.value)}}/>
          </div>
          <div className='inputGp'>
            <label>Post:</label>
            <textarea placeholder="Enter text..." onChange={(event) => {setPostText(event.target.value)}}/>
          </div>
          <button onClick={createPost}>Submit post</button> 
      </div>
      
    </div>
  )
}

export default CreatePost
