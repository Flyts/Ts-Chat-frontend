import { useContext } from "react"
import { dataContext } from "../../store/AuthStore"
import styles from "../../styles/components/partials/_discussion.module.css"


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
            document.body.classList.add("Select_discution")
            setLoader(true)
            setIdFriendSelected(friend._id)
            localStorage.setItem("idFriendSelected", friend._id)

            socket.emit("join_or_create_conversation", {
                from: userLogin._id,
                to: friend._id,
                friend: friend,
                token
            })
        }
    }

    useEffect(()=>
    {
        // socket.on("joined_conversation", (data) => 
        // {
        //     const value = {
        //         _id: data.conversation[0]._id,
        //         friend: data.friend,
        //         messages: data.messages
        //     }

        //     localStorage.setItem("conversationSelected", JSON.stringify(value))
        //     setConversationSelected(value)
        //     setLoader(false)
        // })

        // socket.on("created_conversation", (data) => 
        // {
        //     const value = {
        //         _id: data.conversation._id,
        //         friend: data.friend,
        //         messages: data.messages
        //     }

        //     setConversationSelected(value)
        //     localStorage.setItem("conversationSelected", JSON.stringify(value))
        //     setLoader(false)
        //     setDataNotification({
        //         status: true,
        //         message: data.message,
        //         success: true
        //     })
        // })

        // socket.on("error_join_or_create_conversation", (data) => 
        // {
        //     console.error(data)
        // })
    }, [])


    const component = 
    <div className={friend._id === idFriendSelected ? styles.active : ""}>
        <div className={styles.Discussions} onClick={handleSelectDiscussion}>
            <div className={styles.Head}>
                <div className={styles.avatar_name}>
                    <div className={styles.avatar}>
                        {/* <AvatarFriend user={{avatar: friend.avatar, status: friend.status}}/> */}
                    </div>

                    <div className={styles.name_online}>
                        <strong>{"Tshibanda samuel"}</strong>
                        <span>
                            {
                                "Online"
                            }
                        </span>
                    </div>
                </div>

                <div className={styles.send_time}>
                    <span>3h ago</span>
                </div>
            </div>

            <div className={styles.Body}>
                <div className={styles.message}>
                    <span>abcdefghijklmnopqrstuvwxyz1234</span>
                </div>

                <div className={styles.number}>
                    2
                </div>
            </div>
        </div>
    </div>

    return component
}

export default Discussions