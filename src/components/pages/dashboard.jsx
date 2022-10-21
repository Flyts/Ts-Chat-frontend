import "../../public/css/dashboard.css"
import SideBar from "../partials/SideBar"
import FriendsDiscussion from "../partials/FriendsDiscussion"
import Conversation from "../partials/Conversation"
import FriendDetails from "../partials/FriendDetails"
import { routeApi } from "../../data/webApi"
import {useContext} from "react"
import axios from "axios"
import { dataContext } from "../../data/context"
import new_message from "../../public/img/new_message_bro.svg"

function Dashboard()
{
    const {userSelected} = useContext(dataContext)
    const component = 
    <div id="Dashboard">
        <div className="SideBar">
            <SideBar />
        </div>

        <div className="Friends">
            <FriendsDiscussion />
        </div>

        <div className="Conversation_FriendDetails">
        {
            userSelected ?
            <>
                <div className="conversation">
                    <Conversation />
                </div>

                <div className="friendDetails">
                    <FriendDetails />
                </div>
            </>
            :
            <>
                <div className="noFriendSelected">
                    <div className="img" style={{backgroundImage: `url(${new_message})`}}></div>
                    <p>
                        Clicker sur un ami pour démarrer un conversation.
                    </p>
                </div>
            </> 
        }
        </div>
    </div>

    return component
}

export default Dashboard