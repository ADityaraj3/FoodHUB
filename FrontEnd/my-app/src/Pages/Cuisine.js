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
        const api = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&app_id=8b57e74c&app_key=a399cb95b38c4317f04f4c3920053006&cuisineType=${name}`)
        // const data = await api.json();
        // console.log(data.recipes);
        console.log(api);
        setCusines(api.data.hits);
    }

  return (
    <Grid>
      {cuisines.map((item)=>{
        return(
            <Card >
                <Link to={"/recipe/"+item.recipe.label}>
                <img src={item.recipe.image} alt=""/>
                <h4>{item.recipe.label}</h4>
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