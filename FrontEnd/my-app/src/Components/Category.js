import {FaPizzaSlice, FaHamburger, FaReceipt} from "react-icons/fa";
import {GiNoodles, GiChopsticks} from "react-icons/gi";
import {NavLink} from "react-router-dom";
import styled from "styled-components";


function Category() {
  return (
    <List>
        <SLink to={"/cuisine/italian"}>
            <FaPizzaSlice/>
            <h4>Italian</h4>
        </SLink>
        <SLink to={"/cuisine/american"}>
            <FaHamburger/>
            <h4>American</h4>
        </SLink>
        <SLink to={"/cuisine/indian"}>
            <GiNoodles/>
            <h4>Indian</h4>
        </SLink>
        <SLink to={"/cuisine/japanese"}>
            <GiChopsticks/>
            <h4>Japanese</h4>
        </SLink>
    </List>
  )
}

export default Category

const List = styled.div`
    display: flex;
    justify-content: center;
    margin: 2rem 0rem;
`;

const SLink = styled(NavLink)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 2rem;
    text-decoration: none;
    background: linear-gradient(35deg, #494949, #313131);
    width: 6rem;
    height: 6rem;
    cursor: pointer;
    transform: scale(0.8);

    h4{
        color: white;
        font-size: 0.8rem;
    }

    svg{
        color: white;
        font-size: 1.5rem;
    }

    &.active{
        background: linear-gradient(to right, #f27121, #e94057);
        h4{
            color: white;
            
        }
    
        svg{
            color: white;
        }
    }
`

