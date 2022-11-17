import "../../public/css/discussion.css"
import SideBar from "../partials/SideBar"
import {useContext} from "react"
import { dataContext } from "../../data/context"
import Notification from "../partials/Notification"
import Chat from "../contentPage/chat"

function Discussion()
{
    const {
        dataNotification,
    } = useContext(dataContext)

    const component = 
    <div id="Discussion">
        <div className="SideBar">
            <SideBar />
        </div>

        <Chat/>

        {
            dataNotification.status ?
                <Notification data={dataNotification}></Notification>
            : null
        }
    </div>

    return component
}

export default Discussion