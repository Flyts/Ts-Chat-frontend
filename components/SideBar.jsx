import styles from "../styles/components/sideBar.module.css"
import {BsFillChatDotsFill} from "react-icons/bs"
import {FaUsers} from "react-icons/fa"
import {IoLogOut} from "react-icons/io5"
import {MdEdit} from "react-icons/md"
import {useContext} from "react"
import {GiThreeFriends} from "react-icons/gi"
import Link from "next/link"
import { dataContext } from "../store/AuthStore"
import { route } from "../route/web"
import Img from "../public/default.jpg"

function SideBar()
{
    function Logout()
    {
        // setUserLogin(null)
        // setToken("")
        // setConversationSelected(null)
        // setIdFriendSelected(null)
        // setFriends([])
    }

    const component = 
    <div className={styles.SideBar}>
        <div className={styles.UserAvatar}>
            <Link href={route.editAccount.link}>
                {/* <button style={{backgroundImage: `url(${userLogin.avatar})`}} title="Modifier le profil"></button> */}
                <button style={{backgroundImage: `url(${Img})`}} title="Modifier le profil"></button>

                <div className={styles.icon}>
                    <MdEdit/>
                </div>
            </Link>
        </div>

        <ul className={styles.Menu}>
            <li>
                <Link href={route.discussion.link} className={styles.link} title="Discussions">
                    <BsFillChatDotsFill/>
                </Link>
                <i></i>
            </li>
            <li>
                <Link href={"/"} className={styles.link} title="Groupes">
                    <FaUsers/>
                    <i></i>
                </Link>
            </li>
            <li>
                <Link href={route.communaute.link} className={styles.link} title="Communauté">
                    <GiThreeFriends/>
                    <i></i>
                </Link>
            </li>
        </ul>
        
        <div className="Bottom">
            <IoLogOut onClick={Logout} className={styles.icon} title="Se déconnecter"/>
        </div>
    </div>

    return component
}

export default SideBar