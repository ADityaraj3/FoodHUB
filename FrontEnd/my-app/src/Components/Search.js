import styled from "styled-components"
import {useState} from 'react';
import {FaSearch} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

function Search() {

    const navigate = useNavigate();
    const [input,setInput] = useState("");
    const submitHandler = (event) => {
        event.preventDefault();
        navigate('/searched/'+input)
    };

  return (
   <FormStyle onSubmit={submitHandler}>
        <div>
            <FaSearch/>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)}></input>
        </div>
   </FormStyle>
  )
}

export default Search


const FormStyle=styled.form`
    margin: 0rem 10rem;
    
    div{
        width: 100%; 
        position: relative;
    }
    

    input{
        border: none;
        background: linear-gradient(35deg, #494949, #313131);
        font-size: 1.5rem;
        color: white;
        padding: 1rem 2rem;
        border: none;
        border-radius: 1rem;
        outline: none;
        width: 100%;
    }

    svg{
        position: absolute;
        top: 35%;
        left: 1.5%;
        transform: translate(100%. -50%);
        color: white;
    }
`