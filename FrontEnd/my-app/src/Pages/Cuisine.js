import {React,useEffect, useState} from 'react'
import styled from "styled-components"
import motion from "framer-motion"
import {Link, useParams} from "react-router-dom"
import axios from 'axios'


function Cuisine() {

    const [cuisines,setCusines] = useState([]);  
    let params = useParams();
    // console.log(params);
    useEffect(() => {
        getCuisines(params.type);
    },[params.type]);

    const getCuisines = async (name) => {
        // console.log(name);
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`)
        const data = await api.json();
        setCusines(data.results);
    }

  return (
    <Grid>
      {cuisines.map((item)=>{
        return(
            <Card key={item.id}>
                <Link to={"/recipe/"+item.id}>
                <img src={item.image} alt=""/>
                <h4>{item.title}</h4>
                </Link>
            </Card>
            
        )
      })}
    </Grid>
  )
}

export default Cuisine


const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;

`;

const Card = styled.div`
    img{
        width: 100%;
        border-radius: 2rem;
    }

    a{
        text-decoration: none;
    }

    h4{
        text-align: center;
        padding: 1rem;
    }
`