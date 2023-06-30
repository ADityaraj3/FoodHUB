import { useContext, useState } from 'react'
import './Pages.css'
import {Navigate} from "react-router-dom"
import { UserContext } from '../UserContext';
import {auth,provider} from '../firebase-config'
import {signInWithPopup} from "firebase/auth"
import { useNavigate } from 'react-router-dom';
export default function LoginPage({setIsAuth}){
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);

    async function login(ev){
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        if(response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo)
                setRedirect(true);
            })
        } else {
            alert('wrong credentials');
        }
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then(() => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/");
        })
    }
    return(
       <>
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type="text" 
                   placeholder="username" 
                   value={username} 
                   onChange={ev => setUsername(ev.target.value)}/>
            <input type="password" 
                   placeholder="password" 
                   value={password} 
                   onChange={ev => setPassword(ev.target.value)}/>
            <button>Login</button>
        </form>
        <br></br>
        <div className="loginPage">
            <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign with google</button>
        </div>

        </>
    );
}