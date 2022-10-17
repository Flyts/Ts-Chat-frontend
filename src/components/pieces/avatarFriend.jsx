import "../../public/css/partials/_avatarFriend.css"

function AvatarFriend({user})
{
    const component =
    <div id="AvatarFriend">
        <div className="img" style={{backgroundImage: `url(${user ? user.avatar : ""})`}}></div>
        <div className="status">
            <i className={user ? user.status ? "online" : "offline" : ""}></i>
        </div>
    </div>

    return component
}

export default AvatarFriend