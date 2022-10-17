import "../../public/css/partials/_sideBar.css"
import {Link} from "react-router-dom"
import {BsFillChatDotsFill} from "react-icons/bs"
import {FaUsers} from "react-icons/fa"
import {IoLogOut} from "react-icons/io5"
import {MdEdit} from "react-icons/md"
import { dataContext } from "../../data/context"
import {useContext} from "react"

function SideBar()
{
    const {userLogin, setUserLogin, setToken} = useContext(dataContext)

    function Logout()
    {
        localStorage.removeItem("token")
        setUserLogin({})
        setToken("")
    }

    const component = 
    <div id="SideBar">
        <div className="UserAvatar">
            <button style={{backgroundImage: `url(${userLogin.avatar})`}} title="Modifier le profil"></button>
            <div className="icon">
                <MdEdit/>
            </div>
        </div>

        <ul className="Menu">
            <li>
                <Link to={"/"} className="link" title="Discussions">
                    <BsFillChatDotsFill/>
                </Link>
                <i></i>
            </li>
            <li>
                <Link to={"/"} className="link" title="Groupes">
                    <FaUsers/>
                    <i></i>
                </Link>
            </li>
        </ul>

        <div className="Bottom">
            <IoLogOut onClick={Logout} className="icon" title="Se déconnecter"/>
        </div>
    </div>

    return component
}

export default SideBar