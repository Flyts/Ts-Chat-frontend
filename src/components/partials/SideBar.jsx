import "../../public/css/partials/_sideBar.css"
import {Link} from "react-router-dom"
import {BsFillChatDotsFill} from "react-icons/bs"
import {FaUsers} from "react-icons/fa"
import {IoLogOut} from "react-icons/io5"
import {MdEdit} from "react-icons/md"
import { dataContext } from "../../data/context"
import {useContext} from "react"
import {route} from "../../data/web"
import {GiThreeFriends} from "react-icons/gi"

function SideBar()
{
    const {
            userLogin, setUserLogin, 
            setToken, 
            setConversationSelected,
            setIdFriendSelected,
            setFriends
        } = useContext(dataContext)

    function Logout()
    {
        localStorage.clear()

        setUserLogin(null)
        setToken("")
        setConversationSelected(null)
        setIdFriendSelected(null)
        setFriends([])
    }

    const component = 
    <div id="SideBar">
        <div className="UserAvatar">
            <Link to={route.editAccount.link}>
                <button style={{backgroundImage: `url(${userLogin.avatar})`}} title="Modifier le profil"></button>
                <div className="icon">
                    <MdEdit/>
                </div>
            </Link>
        </div>

        <ul className="Menu">
            <li>
                <Link to={route.discussion.link} className="link" title="Discussions">
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
            <li>
                <Link to={route.communaute.link} className="link" title="Communauté">
                    <GiThreeFriends/>
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