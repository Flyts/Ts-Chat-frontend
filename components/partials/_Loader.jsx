import styles from "../../styles/components/partials/_Loader.module.css"
import {BiLoaderAlt} from "react-icons/bi"

function Loader({screen}) 
{
    const component = 
    <div className={`${styles.Loader} ${screen === "mobil" ? styles.screen : null}`} >
        <BiLoaderAlt className={styles.icon}/>
    </div>

    return component
}

export default Loader