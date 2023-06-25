    import {useState, useEffect} from 'react'
    import styled from 'styled-components'
    import axios from 'axios';
    import { useParams } from 'react-router-dom'
    function Recipe() {
    
        let params = useParams();
        const [details,setDetails] = useState([]);
        const [activeTab, setActiveTab] = useState("Ingredients");
        useEffect(() => {
            fetchDetails();
        },[params.name]); 

        const fetchDetails = async() => {
            console.log(params.name);
            const data = await axios.get(`https://api.edamam.com/search?q=${params.name}&app_id=7c6af569&app_key=3f0fd2ff96800c442bcabe94c0c4f7dd`);
            console.log(data.data.hits)
            setDetails(data.data.hits);    
        }
        return (
        <>
        
        <div>
            {details.map((item) => {
                if(item.recipe.label===params.name){
                    return (
                        <DetailWrapper>
                            <div>
                                <h2>{item.recipe.label}</h2>
                                <ImageWrapper>
                                <img src={item.recipe.image} alt=""/>
                                <h3>{String(item.recipe.cuisineType).toUpperCase()}</h3>
                                </ImageWrapper>
 
                            </div>
                            <Info>
                                <Button className={activeTab==="Ingredients"?"active":""} onClick={() => setActiveTab("Ingredients")}>Ingredients</Button>
                                <Button className={activeTab==="Nutrition"?"active":""} onClick={() => setActiveTab("Nutrition")}>Diet Label</Button>
                                {activeTab==='Ingredients' && (
                                    <ul>
                                    {item.recipe.ingredients.map((ingredient) => (
                                        <li>{ingredient.text}</li>
                                    ))}
                                </ul>
                                )}

                                {activeTab==='Nutrition' && (
                                    <ul>
                                    {item.recipe.dietLabels.map((nutrient) => (
                                        <li>{nutrient}</li>
                                    ))}
                                    <li>{item.recipe.calories.toFixed(2) +" grams"}</li>
                                    
                                </ul>
                                )}
                            </Info>
                        </DetailWrapper>
                    )
                }
            })}
        </div>
        </>
    )
    }

    export default Recipe


const DetailWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 10rem;
    margin-left: 10rem;
    display: flex;
    .active{
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    h2{
        margin-bottom: 2rem;
    }
    h3{
        margin-left: 3rem;
    }
    li{
        font-size: 1.2rem;
        line-height: 2.5rem;
    }

    ul{
        margin-top: 2rem;
    }

    img{
        border-radius: 2rem;
    }
`

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
`

const Info = styled.div`
    margin-left: 10rem;
`
const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    border-radius: 2rem;
  }

  h3 {
    margin-top: 1rem;
  }
`;