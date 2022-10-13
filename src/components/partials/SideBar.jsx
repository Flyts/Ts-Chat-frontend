import "../../public/css/partials/_sideBar.css"
import avatar from "../../public/img/avatar.jpg"
import {Link} from "react-router-dom"
import {BsFillChatDotsFill} from "react-icons/bs"
import {FaUsers} from "react-icons/fa"
import {IoLogOut} from "react-icons/io5"
import {MdEdit} from "react-icons/md"

function SideBar()
{
    const component = 
    <div id="SideBar">
        <div className="UserAvatar">
            <button style={{backgroundImage: `url(${avatar})`}} title="Modifier le profil"></button>
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
            <IoLogOut className="icon" title="Se déconnecter"/>
        </div>
    </div>

    return component
}

export default SideBar