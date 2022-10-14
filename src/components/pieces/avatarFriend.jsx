import "../../public/css/partials/_avatarFriend.css"
import avatarFriend from "../../public/img/friend.jpeg"

function AvatarFriend({status})
{
    const component =
    <div id="AvatarFriend">
        <div className="img" style={{backgroundImage: `url(${avatarFriend})`}}></div>
        <div className="status">
            <i className={status === 1 ? "online" : "offline"}></i>
        </div>
    </div>

    return component
}

export default AvatarFriend