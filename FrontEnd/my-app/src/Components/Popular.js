import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import {Splide, SplideSlide} from "@splidejs/react-splide"
import '@splidejs/splide/dist/css/splide.min.css';
import {Link} from "react-router-dom"
import axios from 'axios';

function Popular() {

    const[recipes,setDetails] = useState([]);

    useEffect(() => {
        getpopular();
      }, []);
    
      const getpopular = async() => {
        const api = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&app_id=8b57e74c&app_key=a399cb95b38c4317f04f4c3920053006&cuisineType=Asian`)
        // const data = await api.json();
        // console.log(data.recipes);
        setDetails(api.data.hits);
    };
    
  return (
    <div>
        <Wrapper>
            <h3>Popular picks</h3>
            <Splide options={{
                perPage: 4,
                arrows: false,
                pagination: false,
                drag: 'free',
                gap: '5rem', 
            }} >
                {recipes.map((recipe) => {
                    const label = recipe.recipe.label.split(' ').slice(0, 2).join(' ');
                    const truncatedLabel = `${recipe.recipe.label}...`;
                    return(                       
                        <SplideSlide>
                        <Card>
                            <p>{truncatedLabel}</p>
                            <Link to={'/recipe/'+recipe.recipe.label}>
                            <img src={recipe.recipe.image} alt={recipe.recipe.label}/>
                            </Link>
                        </Card>
                        </SplideSlide>
                    );
                })}
            </Splide>
        </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled.div`
    min-height: 25 rem;
    border-radius: 0.5rem;    
    overflow: hidden;
    position: relative;

    img{
        border-radius: 2rem;
        position: relative;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    p{
        z-index: 10;
        left: 50%;
        bottom: 0%;
        width: 100%;
        text-align: center;
        font-weight:600;
        font-size: 1rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    
`;



export default Popular
