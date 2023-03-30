import "../../public/css/discussion.css"
import { useContext } from "react"
import { dataContext } from "../../data/context"
import Notification from "../partials/Notification"
import SideBar from "../partials/SideBar"
import ContentCommunaute from "../contentPage/ContentCommunaute"

function Communaute()
{
    const {
        dataNotification,
    } = useContext(dataContext)

    const component = 
    <div id="Discussion">
        <div className="SideBar">
            <SideBar />
        </div>

        <ContentCommunaute/>

        {
            dataNotification.status ?
                <Notification data={dataNotification}></Notification>
            : null
        }
    </div>

    return component
}

export default Communaute