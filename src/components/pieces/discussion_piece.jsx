import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { dataContext } from "../../data/context"
import { socket } from "../../data/socketIo"
import { routeApi, configAuthHeader } from "../../data/webApi"
import "../../public/css/partials/_discussion.css"
import AvatarFriend from "./avatarFriend"

function Discussions({friend})
{
    function handleSelectDiscussion(e)
    {
        // axios.get(routeApi.getMessages, 
        // {
        //     configAuthHeader,
        //     params: {
        //         from: userLogin.id,
        //         to: user._id
        //     }
        // })
        // .then((res) => {
        //     if(res.data.success === true)
        //     {
        //         setMessageFriend(res.data.messages)
        //         localStorage.setItem("messageFriend", JSON.stringify(res.data.messages))
        //     }
        // })
        // .catch((error) => console.error(error))

        if(friend._id !== idFriendSelected)
        {
            setIdFriendSelected(friend._id)
            localStorage.setItem("idFriendSelected", friend._id)

            setFriendSelect(friend)
            // axios.post(routeApi.createConversation, 
            // {
            //     from: userLogin.id,
            //     to: friend._id
            // }, 
            // {
            //     configAuthHeader
            // })
            // .then((res)=> {
            //     setMessageFriend(res.data.messages)
            //     localStorage.setItem("messageFriend", JSON.stringify(res.data.messages))
            // })
            // .catch((error) => console.error(error))

            socket.emit("join_or_create_conversation", {
                from: userLogin.id,
                to: friend._id
            })
        }
    }

    const {
        conversationSelected, setConversationSelected,
        userLogin,
        setIdFriendSelected, idFriendSelected
    } = useContext(dataContext)

    const [friendSelect, setFriendSelect] = useState(null)


    useEffect(()=>
    {
        socket.on("joined_conversation", (data) => 
        {
            const value = {
                _id: data.conversation[0]._id,
                friend: friendSelect,
                messages: data.messages
            }

            console.log(friendSelect);

            setConversationSelected(value)
            localStorage.setItem("conversationSelected", JSON.stringify(value))
        })

        socket.on("created_conversation", (data) => 
        {
            console.log(data)
        })

        socket.on("error_join_or_create_conversation", (data) => 
        {
            console.error(data)
        })
    }, [socket])


    const component = 
    <div className={friend._id === idFriendSelected ? "active" : ""}>
        <div id="Discussions" onClick={handleSelectDiscussion}>
            <div className="Head">
                <div className="avatar_name">
                    <div className="avatar">
                        <AvatarFriend user={{avatar: friend.avatar, status: friend.status}}/>
                    </div>

                    <div className="name_online">
                        <strong>{friend.name.nom +" "+ friend.name.prenom}</strong>
                        <span>
                            {
                                friend.status ? "Online" : "Offline"
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