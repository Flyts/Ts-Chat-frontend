import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { IoCreate, IoSearch } from "react-icons/io5"
import { routeApi } from "../../route/webApi"
import { dataContext } from "../../store/AuthStore"
import { conversationStore } from "../../store/ConversationStore"
import styles from "../../styles/components/partials/_friendsDiscussion.module.css"
import Discussions from "./_discussion_piece"


function FriendsDiscussion() 
{
    function handleSearchFriend(value) 
    {
        // if (value.length) {
        //     if (!allFriends) setAllFriends(friends)

        //     axios
        //     .get(
        //         routeApi.getSearchFriend,
        //         {
        //         params: {
        //             search: value,
        //             id: userLogin._id
        //         }
        //         },
        //         routeApi.configAuthHeader
        //     )
        //     .then((res) => {
        //         setFriends(res.data.users)
        //         setText(res.data.message)
        //     })
        //     .catch((errors) => console.error(errors))
        // } else {
        //     setFriends(allFriends)
        //     setAllFriends(null)
        //     setText(noUser)
        // }
    }

    function handleCreateConversation()
    {
        try 
        {
            axios.post(routeApi.create_conversation,
            {
                title: "Parle moi de toi!",
                userId: "64271baeb529b4d74f11677a"
            },
            {
            headers:{
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IisyNDM4MTg4NjA2NjMiLCJpYXQiOjE2ODAyODQ1OTB9.oBagIaEgRdg72eRG1zsXDYDk58OXZRUg3P68W6jmT7U",
            }
            })
            .then((res) => {
                const response = res.data.messages

                setConversations((prev) => [...prev, {
                    _id: response._id,
                    title: response.title,
                    messages: response.messages
                }])
            })
            .catch((err) => console.error(err))
        } 
        catch(err) 
        {
            console.error(err)
        }
    }

    const {
        conversations, setConversations
    } = conversationStore((state) => state)

    const [search, setSearch] = useState("")


    const component = 
    <div className={styles.Friends}>
        <div className={styles.Top}>
            <div className={styles.search}>
                <label className={styles.icon} htmlFor="Search">
                    <IoSearch />
                </label>

                <input
                    type="search"
                    onChange={(e) => {
                        setSearch(e.target.value)
                        handleSearchFriend(e.target.value)
                    }}
                    value={search}
                    name="search"
                    id="Search"
                    placeholder="Tapez votre recherche"
                />
            </div>
        </div>

        <div className={styles.Discussions}>
        {
            conversations && conversations.length 
            ? 
                conversations.map((conversation) => [
                    <Discussions conversations={conversation} key={conversation._id} />
                ])
            :
                <div className={styles.aucun}>
                    <h4>{"Pas d'utilisateur"}</h4>

                    <IoCreate 
                        className={styles.icon} 
                        title={"Créer une nouvelle conversation"}
                        onClick={handleCreateConversation}
                    />
                </div>
        }
        </div>
    </div>

    return component
}

export default FriendsDiscussion
