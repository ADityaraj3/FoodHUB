import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import {useParams} from "react-router-dom"
import styled from 'styled-components';
import {Link} from "react-router-dom"
function Searched() {
 
    let params = useParams();
    const [searchedRecipes,setSearchedRecipes] = useState([]);  
    useEffect(() => {
        getSearched(params.search);
    },[params.search]);

    const getSearched = async (name) => {
        
        const api = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&app_id=8b57e74c&app_key=a399cb95b38c4317f04f4c3920053006&q=${name}`)
        // const data = await api.json();
        // console.log(data.recipes);
        setSearchedRecipes(api.data.hits);

    };

    return (
    <Grid>
        {searchedRecipes.map((item) => {
            return(
                <Card>
                    <Link to={"/recipe/"+item.recipe.label}>
                    <img src={item.recipe.image}/>
                    <h4>{item.recipe.label}</h4>
                    </Link>
                </Card>
            )
        })}
    </Grid>
  )
}

export default Searched

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
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