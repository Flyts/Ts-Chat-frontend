import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { dataContext } from "../../data/context"
import { socket } from "../../data/socketIo"
import { routeApi, configAuthHeader } from "../../data/webApi"
import "../../public/css/partials/_discussion.css"
import AvatarFriend from "./avatarFriend"

function Discussions({friend})
{
    const {
        conversationSelected, setConversationSelected,
        userLogin,
        setIdFriendSelected, idFriendSelected,
        setDataNotification,
        setLoader,
        token
    } = useContext(dataContext)


    function handleSelectDiscussion(e)
    {
        if(friend._id !== idFriendSelected)
        {
            setIdFriendSelected(friend._id)
            setLoader(true)
            localStorage.setItem("idFriendSelected", friend._id)

            socket.emit("join_or_create_conversation", {
                from: userLogin.id,
                to: friend._id,
                friend: friend,
                token
            })
        }
    }

    useEffect(()=>
    {
        socket.on("joined_conversation", (data) => 
        {
            const value = {
                _id: data.conversation[0]._id,
                friend: data.friend,
                messages: data.messages
            }

            localStorage.setItem("conversationSelected", JSON.stringify(value))
            setConversationSelected(value)
            setLoader(false)
        })

        socket.on("created_conversation", (data) => 
        {
            const value = {
                _id: data.conversation._id,
                friend: data.friend,
                messages: data.messages
            }

            setConversationSelected(value)
            localStorage.setItem("conversationSelected", JSON.stringify(value))
            setLoader(false)
            setDataNotification({
                status: true,
                message: data.message,
                success: true
            })
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