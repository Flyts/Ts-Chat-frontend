import "../../public/css/dashboard.css"
import SideBar from "../partials/SideBar"
import FriendsDiscussion from "../partials/FriendsDiscussion"

function Dashboard()
{
    const component = 
    <div id="Dashboard">
        <div className="SideBar">
            <SideBar />
        </div>

        <div className="Friends">
            <FriendsDiscussion></FriendsDiscussion>
        </div>

        <div className="Conversation"></div>
        <div className="FriendDetails"></div>
    </div>

    return component
}

export default Dashboard