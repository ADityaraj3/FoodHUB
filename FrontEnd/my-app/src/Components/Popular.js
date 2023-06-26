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
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`)
        const data = await api.json();
        console.log(data.recipes);
        setDetails(data.recipes);
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
                    const label = recipe.title.split(' ').slice(0, 2).join(' ');
                    const truncatedLabel = `${label}...`;
                    return(                       
                        <SplideSlide key={recipe.id}>
                        <Card>
                            <p>{truncatedLabel  }</p>
                            <Link to={'/recipe/'+recipe.id}>
                            <img src={recipe.image} alt={recipe.title}/>
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
