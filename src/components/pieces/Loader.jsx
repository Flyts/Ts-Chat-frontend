import "../../public/css/partials/_loader.css"
import {BiLoaderAlt} from "react-icons/bi"

function Loader() 
{
    const component = 
    <div id="Loader">
        <BiLoaderAlt className="icon"/>
    </div>

    return component
}

export default Loader