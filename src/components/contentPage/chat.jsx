import { useContext } from "react"
import { dataContext } from "../../data/context"
import Conversation from "../partials/Conversation"
import FriendDetails from "../partials/FriendDetails"
import Loader from "../pieces/Loader"
import new_message from "../../public/img/new_message_bro.svg"
import "../../public/css/partials/_chat.css"
import FriendsDiscussion from "../partials/FriendsDiscussion"

function Chat()
{
    const {
        conversationSelected, 
        dataNotification,
        loader
    } = useContext(dataContext)

    const component = 
    <div id="Chat">
        <div className="Friends">
            <FriendsDiscussion />
        </div>

        <div className="Conversation_FriendDetails">
            {
                conversationSelected ?
                <>
                {
                    !loader ?
                    <>
                        <div className="conversation">
                            <Conversation />
                        </div>

                        <div className="friendDetails">
                            <FriendDetails />
                        </div>
                    </>
                    :
                    <Loader screen="other"/>
                }
                </> 
                :
                <>
                    <div className="noFriendSelected">
                        <div className="img" style={{backgroundImage: `url(${new_message})`}}></div>
                        <p>
                            Clicker sur un ami pour démarrer une conversation.
                        </p>
                    </div>

                    <Loader screen="mobil"/>
                </> 
            }
        
        </div>
    </div>

    return component
}

export default Chat