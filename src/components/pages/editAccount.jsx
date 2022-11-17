import "../../public/css/partials/_editAccount.css"
import "../../public/css/discussion.css"
import { useContext } from "react"
import { dataContext } from "../../data/context"
import SideBar from "../partials/SideBar"
import Notification from "../partials/Notification"
import EditInfo from "../contentPage/EditInfo"

function EditAccount()
{
    const {
        dataNotification,
    } = useContext(dataContext)

    const component = 
    <div id="Discussion">
        <div className="SideBar">
            <SideBar />
        </div>

        <EditInfo/>

        {
            dataNotification.status ?
                <Notification data={dataNotification}></Notification>
            : null
        }
    </div>

    return component
}

export default EditAccount