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
        
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`)
        const data = await api.json();
        console.log(data.results);
        setSearchedRecipes(data.results);

    };

    return (
        <Grid>
        {searchedRecipes.map((item) => {
            return(
                <Card key={item.id}>
                    <Link to={"/recipe/"+item.id}>
                    <img src={item.image}/>
                    <h4>{item.title}</h4>
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