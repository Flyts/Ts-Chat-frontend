import "../../public/css/partials/_loader.css"
import {BiLoaderAlt} from "react-icons/bi"

function Loader({screen}) 
{
    const component = 
    <div id="Loader" className={screen === "mobil" ? screen : null}>
        <BiLoaderAlt className="icon"/>
    </div>

    return component
}

export default Loader