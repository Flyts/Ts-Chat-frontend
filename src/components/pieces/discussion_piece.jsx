import "../../public/css/partials/_discussion.css"
import AvatarFriend from "./avatarFriend"

function Discussions({user})
{
    const component = 
    <div>
        <div id="Discussions">
            <div className="Head">
                <div className="avatar_name">
                    <div className="avatar">
                        <AvatarFriend user={{avatar: user.avatar, status: user.status}}/>
                    </div>

                    <div className="name_online">
                        <strong>{user.name.nom +" "+ user.name.prenom}</strong>
                        <span>
                            {
                                user.status ? "Online" : "Offline"
                            }
                        </span>
                    </div>
                </div>

                <div className="send_time">
                    <span>3h ago</span>
                </div>
            </div>

            <div className="Body">
                <div className="message">
                    <span>abcdefghijklmnopqrstuvwxyz1234</span>
                </div>

                <div className="number">
                    2
                </div>
            </div>
        </div>
    </div>

    return component
}

export default Discussions