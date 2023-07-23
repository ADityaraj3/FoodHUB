import {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { useParams } from 'react-router-dom'
function Recipe() {

    let params = useParams();
    const [details,setDetails] = useState({});
    const [nutrition, setNutrition] = useState([]);
    const [activeTab, setActiveTab] = useState('');
    const [videoInfo, setVideoInfo] = useState([]);
    

    useEffect(() => {
        fetchDetails();
    }, [params.name]);
    
    const fetchDetails = async () => {
        console.log(params.name);
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        const recipeData = await data.json();
        const Ndata = await fetch(`https://api.spoonacular.com/recipes/${params.name}/nutritionWidget.json?apiKey=${process.env.REACT_APP_API_KEY}`);
        const nndata = await Ndata.json();
        setNutrition(nndata);
        setDetails(recipeData);
    
        if (recipeData.title) {
            youtubeHandler(recipeData.title);
        }
    };
    
    const youtubeHandler = async (str) => {
        const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?maxResults=5&q=${str}&key=AIzaSyAig0EbLu6qBOgt9yYdpox-zJ41y36XugA`);
        const data = await res.json();
        setVideoInfo(data);
        console.log(data);
        console.log(str);
    };
    
    

    return (
        <>
    <div>
        <DetailWrapper>
            <div>
                <h2>{details.title}</h2>
                <ImageWrapper>
                <img src={details.image} alt=""/>
                {/* <h3>{String(item.recipe.cuisineType).toUpperCase()}</h3> */}
                </ImageWrapper>
                <Button className={activeTab === "Youtube" ? "active" : ""} onClick={() =>{ youtubeHandler(details.title); setActiveTab("Youtube")}}>Search this on YouTube</Button>

                {activeTab === 'Youtube' && (

                    <div>
                        {videoInfo.items.map((item) => (
                            <div key={item.id.videoId}>
                                {/* <p>{item.snippet.title}</p> */}
                                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${item.id.videoId}`} ></iframe>
                            </div>
                        ))}
                    </div>
                )}


                
            </div>
            <Info>
                <Button className={activeTab==="Ingredients"?"active":""} onClick={() => setActiveTab("Ingredients")}>Ingredients</Button>
                <Button className={activeTab==="Instructions"?"active":""} onClick={() => setActiveTab("Instructions")}>Instructions</Button>
                <Button className={activeTab==="Nutrition"?"active":""} onClick={() => setActiveTab("Nutrition")}>Nutrition</Button>
                {activeTab==='Ingredients' && (
                    <ul>
                    {details.extendedIngredients.map((ingredient) => (
                        <li key={ingredient.id}>{ingredient.original}</li>
                    ))}
                </ul>
                )}

                {activeTab==='Instructions' && (
                    <div>
                        <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
                        <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
                    </div>    
                
                )}

                {activeTab==='Nutrition' && (
                    <div>
                        <ul>
                            <li>Calories: {nutrition.calories}</li>
                            <li>Carbs: {nutrition.carbs}</li>
                            <li>Fat: {nutrition.fat}</li>
                            {nutrition.good.map((nutri) => (
                                <li key={nutri.title}>{nutri.title}: {nutri.amount}</li>
                            ))}
                        </ul>
                    </div>    
                
                )}
            </Info>
        </DetailWrapper>
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