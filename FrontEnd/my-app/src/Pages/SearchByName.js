import Pages from "./Pages";
import {BrowserRouter} from "react-router-dom"
import Search from "../Components/Search";
import Category from "../Components/Category"
function SearchByName() {
  return (
    <div>
        <Search/> 
        <Category/>
        <Pages/>
    </div>
  )
}

export default SearchByName
