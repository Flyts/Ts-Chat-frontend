import styles from "../../styles/components/partials/_discussion_piece.module.css"
import { conversationStore } from "../../store/ConversationStore"
import moment from "moment"
import AvatarFriend from "./_Avatar"
import { useEffect, useState } from "react"


function Discussions({data})
{
    const {choosedConversation, index } = data

    function handleSelectDiscussion()
    {
        if(choosedConversation._id !== renderConversationSelected._id)
        {
            if(renderConversationSelected._id !== 0)
            {
                let selectedConversation = [...renderConversations]

                selectedConversation[conversationIndex].messages = ["data 1", "data 2"]
                

                console.log("Conv selected", selectedConversation)
                console.log("Render Conv messages", renderConversationSelected.messages)
                // setConversations(selectedConversation)
            }

            const data = {
                _id: choosedConversation._id,
                title: choosedConversation.title,
                messages: choosedConversation.messages,
                create_at: choosedConversation.createdAt,
                update_at: choosedConversation.updatedAt,
            }
            setConversationSelected(data)

            setConversationIndex(index)
        }


    }

    const { 
        conversationSelected, setConversationSelected,
        conversations, setConversations,
        conversationIndex, setConversationIndex
    } = conversationStore(state => state)

    const [renderConversationSelected, setRenderConversationSelected] = useState(conversationSelected),
          [renderConversations, setRenderConversations] = useState(conversations)

    useEffect(() => {
        setRenderConversationSelected(conversationSelected)
    }, [conversationSelected])

    useEffect(() => {
        setRenderConversations(conversations)
    }, [conversations])


    const component = 
    <div className={renderConversationSelected._id ? choosedConversation._id === renderConversationSelected._id ? styles.active : null : null}>
        <div className={styles.Discussions} onClick={handleSelectDiscussion}>
            <div className={styles.Head}>
                <div className={styles.avatar_name}>
                    <div className={styles.avatar}>
                        <AvatarFriend user={{
                            avatar: choosedConversation.avatar, 
                            status: choosedConversation._id == renderConversationSelected._id ? true : false
                        }}/>
                    </div>

                    <div className={styles.name_online}>
                        <strong>{choosedConversation.title}</strong>
                        <span>
                            {
                                choosedConversation._id == renderConversationSelected._id
                                ?
                                    "Online"
                                :
                                    "offline"
                            }
                        </span>
                    </div>
                </div>

                <div className={styles.send_time}>
                    <span>
                    {
                        moment(Date.now()).format("MMM Do YY") === moment(choosedConversation.createdAt).format("MMM Do YY")
                        ?
                            moment(choosedConversation.create_at).format("H:mm")
                        :
                            moment(choosedConversation.createdAt).format("DD/MM/YYYY - H:mm:ss")
                    }
                    </span>
                </div>
            </div>

            {
                choosedConversation.messages.length > 0
                ?
                    {/* <div className={styles.Body}>
                        <div className={styles.message}>
                            <span>
                            {
                                conversation.messages[conversation.messages.length -1].text.length <= 20 
                                ?
                                    conversation.messages[conversation.messages.length -1].text
                                : 
                                    conversation.messages[conversation.messages.length -1].text.substring(0, 19) + '...'
                            }
                            </span>
                        </div>

                        <div className={styles.number}>
                            {conversation.messages.length}
                        </div>
                    </div> */}
                : null
            }
        </div>
    </div>

    return component
}

export default Discussions