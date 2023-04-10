import Loader from "./_Loader"
import styles from "../../styles/components/chat.module.css"
import Conversation from "./_Conversation"
import FriendDetails from "./_FriendDetails"
import FriendsDiscussion from "./_FriendsDiscussion"
import { dataStore } from "../../store/dataStore"
import { conversationStore } from "../../store/ConversationStore"
import new_message from "../../public/new_message_bro.svg"
import Image from "next/image"
import { useEffect, useState } from "react"


function Chat()
{
    const {loader} = dataStore((state) => state),
          {conversationSelected} = conversationStore((state) => state)
    
    const [renderConversationSelected, setRenderConversationSelected] = useState(conversationSelected)

    useEffect(() => {
        setRenderConversationSelected(conversationSelected)
    }, [conversationSelected])

    const component = 
    <div className={styles.Chat}>
        <div className={styles.Friends}>
            <FriendsDiscussion />
        </div>

        <div className={styles.Conversation_FriendDetails}>
        {
            renderConversationSelected._id !== 0
            ?
                <>
                    {
                        !loader ?
                            <>
                                <div className={styles.conversation}>
                                    <Conversation />
                                </div>
                            </>
                        :
                            <Loader screen="other"/>
                    }
                </> 
            :
                <>
                {
                    !loader 
                    ?
                        <div className={styles.noFriendSelected}>
                            <div className={styles.bloc_img}>
                                <Image 
                                    src={new_message} 
                                    alt={""}
                                    layout={"fill"}
                                    objectFit={"cover"}
                                    quality={100}
                                    sizes="100%"
                                    className={styles.img}
                                />
                            </div>
                            <p>
                                Clicker sur un ami pour démarrer une conversation.
                            </p>
                        </div>
                    :
                        <Loader screen="mobil"/>
                }
                </> 
        }
        </div>

        <div className={styles.PopupCreateConv}>
            <div className={styles.ipnuts}>
                <input></input>
            </div>
        </div>
    </div>

    return component
}

export default Chat