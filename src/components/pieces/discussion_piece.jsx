import axios from "axios";
import { useContext } from "react";
import { dataContext } from "../../data/context";
import { routeApi, configAuthHeader } from "../../data/webApi";
import "../../public/css/partials/_discussion.css"
import AvatarFriend from "./avatarFriend"

function Discussions({user})
{
    function handleSelectDiscussion(e)
    {
        const userSelected = JSON.stringify(user)

        setUserSelected(user)
        localStorage.setItem("userSelected", userSelected)

        axios.get(routeApi.getMessages, 
        {
            configAuthHeader,
            params: {
                from: userLogin.id,
                to: user._id
            }
        })
        .then((res) => {
            if(res.data.success === true)
            {
                setMessageFriend(res.data.messages)
                localStorage.setItem("messageFriend", JSON.stringify(res.data.messages))
            }
        })
        .catch((error) => console.error(error))
    }

    const {
        userSelected, setUserSelected,
        setMessageFriend,
        userLogin
    } = useContext(dataContext)

    const component = 
    <div className={user._id === (userSelected ? userSelected._id : null) ? "active" : ""}>
        <div id="Discussions" onClick={handleSelectDiscussion}>
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