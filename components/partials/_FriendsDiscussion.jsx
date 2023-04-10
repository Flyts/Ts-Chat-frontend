import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { IoCreate, IoSearch } from "react-icons/io5"
import { routeApi } from "../../route/webApi"
import { dataContext } from "../../store/AuthStore"
import { conversationStore } from "../../store/ConversationStore"
import styles from "../../styles/components/partials/_friendsDiscussion.module.css"
import Discussions from "./_discussion_piece"
import { RiSendPlaneFill } from "react-icons/ri"
import { MdModeEditOutline } from "react-icons/md"
import Loader from "./_Loader"
import { dataStore } from "../../store/dataStore"


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
        setLoaderConvToTrue()
        
        axios.post(routeApi.create_conversation,
        {
            title: "Conv",
            userId: "64271baeb529b4d74f11677a"
        },
        {
            headers:{
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IisyNDM4MTg4NjA2NjMiLCJpYXQiOjE2ODAyODQ1OTB9.oBagIaEgRdg72eRG1zsXDYDk58OXZRUg3P68W6jmT7U",
            }
        })
        .then((res) => {
            const response = res.data

            setConversations([
                ...conversations,
                {
                    _id: response._id,
                    title: response.title,
                    messages: response.messages,
                    create_at: response.createdAt,
                    update_at: response.updatedAt,
                }
            ])

            resetLoaderConv()
        })
        .catch((err) => console.error(err))
    }

    function handleSeeCreateConversationBtn(e)
    {
        if(e)
        {
            setActiveBtnCreateConversation(true)
        }
        else
        {
            setActiveBtnCreateConversation(false)
        }
    }

    const { conversations, setConversations } = conversationStore(state => state),
          { loaderConv, setLoaderConvToTrue, resetLoaderConv } = dataStore(state => state)

    const [search, setSearch] = useState(""),
          [activeBtnCreateConversation, setActiveBtnCreateConversation] = useState(false),
          [renderConversations, setRenderConversations] = useState(conversations)

    
    useEffect(() => {
        setRenderConversations([...conversations])
    }, [conversations])


    const component = 
    <div className={styles.Friends}>
        {
            !loaderConv
            ?
                <>        
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

                    <div 
                        className={styles.Discussions} 
                        onMouseEnter={() => handleSeeCreateConversationBtn(1)}
                        onMouseLeave={() => handleSeeCreateConversationBtn(0)}
                    >
                    {
                        renderConversations && renderConversations.length 
                        ? 
                            <>
                                {
                                    renderConversations.map((choosedConversation, index) => [
                                        <Discussions data={{choosedConversation, index}} key={choosedConversation._id} />
                                    ])
                                }

                                <button 
                                    className={`${styles.create_btn} ${activeBtnCreateConversation ? styles.active : null}`} 
                                    title="Créer une conversation"
                                    onClick={!loaderConv ? handleCreateConversation : null}
                                >
                                    <MdModeEditOutline/>
                                </button>
                            </>
                        :
                            <div className={styles.aucun}>
                                <h4>{"Pas de conversation"}</h4>

                                <IoCreate 
                                    className={styles.icon} 
                                    title={"Créer une nouvelle conversation"}
                                    onClick={!loaderConv ? handleCreateConversation : null}
                                />
                            </div>
                    }
                    </div>
                </>
            :
                <Loader/>
        }
    </div>

    return component
}

export default FriendsDiscussion
