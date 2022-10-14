import "../../public/css/dashboard.css"
import SideBar from "../partials/SideBar"
import FriendsDiscussion from "../partials/FriendsDiscussion"
import Conversation from "../partials/Conversation"
import FriendDetails from "../partials/FriendDetails"

function Dashboard()
{
    const component = 
    <div id="Dashboard">
        <div className="SideBar">
            <SideBar />
        </div>

        <div className="Friends">
            <FriendsDiscussion />
        </div>

        <div className="Conversation">
            <Conversation />
        </div>

        <div className="FriendDetails">
            <FriendDetails />
        </div>
    </div>

    return component
}

export default Dashboard