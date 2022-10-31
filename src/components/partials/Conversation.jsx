import "../../public/css/partials/_conversation.css"
import {IoIosCall} from "react-icons/io"
import {IoIosOptions} from "react-icons/io"
import {ImAttachment} from "react-icons/im"
import {BsFillEmojiHeartEyesFill} from "react-icons/bs"
import {FaMicrophone} from "react-icons/fa"
import {RiSendPlaneFill} from "react-icons/ri"
import AvatarFriend from "../pieces/avatarFriend"
import { useContext, useRef, useState, useEffect } from "react"
import { dataContext } from "../../data/context"
import axios from "axios"
import { routeApi } from "../../data/webApi"
import moment from "moment/moment"
import EmojiPicker from "emoji-picker-react"
import { socket } from "../../data/socketIo"

function Conversation()
{
    function handleSelectEmoji(e)
    {
        setMessage({
            type: "text",
            value: message ? message.value + e.emoji : e.emoji
        })
        setEmojiBlock(false)
    }

    function handleSelectFile(e)
    {
        fileInput.current.click()
    }

    function handleBlockEmoji()
    {
        emojiBlock === false 
        ?
            setEmojiBlock(true)
        : 
            setEmojiBlock(false)
    }

    // function handleChange(e)
    // {
    //     setMessage({
    //         type: e.target.type,
    //         value: e.target.value
    //     })

    //     setInputSent(e.target)
    // }

    function handleSendMessage(e)
    {
        if(message)
        {
            socket.emit("sendMessage", {
                from: userLogin.id,
                to: conversationSelected.friend._id,
                message: message,
                token,
                conversation_id: conversationSelected._id
            })
        }
    }


    const {
        conversationSelected, setConversationSelected,
        userLogin,
        token
    } = useContext(dataContext)
    const [message, setMessage] = useState(null)
    const [inputSent, setInputSent] = useState(null)
    const [emojiBlock, setEmojiBlock] = useState(false)
    const bodyBlock = useRef(),
          fileInput = useRef()


    useEffect(() => 
    {
        socket.on("sended_message", (data)=>
        {
            const conversation = (JSON.parse(localStorage.getItem("conversationSelected")))

            if(userLogin.id === data.sender_id && conversation._id === data.conversation_id)
            {
                const value = {
                    _id: conversation._id,
                    friend: conversationSelected.friend,
                    messages: data.messages
                }

                setConversationSelected(value)
                localStorage.setItem("conversationSelected", JSON.stringify(value))
                setEmojiBlock(false)
                setMessage(null)
            }
        })

        socket.on("receive_message", (data) =>
        {
            const conversation = (JSON.parse(localStorage.getItem("conversationSelected")))

            if(conversation._id === data.conversation_id)
            {
                const value = {
                    _id: conversation._id,
                    friend: conversation.friend,
                    messages: data.messages
                }

                setConversationSelected(value)
                localStorage.setItem("conversationSelected", JSON.stringify(value))
            }
        })
    }, [socket])

    useEffect(() => 
    {
        bodyBlock.current.scrollTo(0, bodyBlock.current.scrollHeight)
    }, [conversationSelected.messages])

    useEffect(() => 
    {
        socket.emit("login_after_reload_page",
        {
            conversation_id: conversationSelected._id,
            token: token
        })
    }, [])


    const component = 
    <div id="Conversation">
        <div className="Top">
            <div className="friend">
                <div className="avatar">
                    <AvatarFriend user={{avatar:conversationSelected.friend.avatar, status:conversationSelected.friend.status}}/>
                </div>

                <div className="name_online">
                    <strong>
                    {
                        conversationSelected.friend.name.prenom+" "+conversationSelected.friend.name.nom
                    }
                    </strong>
                    
                    <div className="online">
                        <span>{conversationSelected.friend.status ? "online" : "offline"}</span>
                        
                        {
                            !conversationSelected.friend.status ?
                                <span>last seen 3 hours ago</span>
                            : null
                        }
                    </div>
                </div>
            </div>

            <div className="options">
                <IoIosCall className="icon"/>
                <IoIosOptions className="icon option"/>
            </div>
        </div>

        <div className="Body" ref={bodyBlock}>
            {
                conversationSelected !== null 
                ?
                    conversationSelected.messages.map((message) => [
                        <div key={message._id} className={message.from === userLogin.id ? "me" : "friend"}>
                            <p>
                                {message.message}
                                <i></i>
                            </p>
                            <span>
                            {
                                moment(Date.now()).format("MMM Do YY") === moment(message.createdAt).format("MMM Do YY")
                                ?
                                    moment(message.createdAt).fromNow()
                                :
                                    moment(message.createdAt).format("DD/MM/YYYY - h:s")
                            }
                            </span>
                        </div>
                    ])
                : null
            }

            {
                <div className="image_seleted">
                    <div className="top"></div>

                    <div className="image"></div>

                    <div className="details_image">
                        <span>samy</span>
                    </div>
                </div>  
            }
        </div>

        <div className="Bottom">
            {
                emojiBlock
                ?
                    <div className="emoji">
                        <EmojiPicker 
                            width={"100%"}
                            height={"300px"}
                            emojiStyle={"apple"}
                            Theme={"dark"}
                            autoFocusSearch={true}
                            onEmojiClick={handleSelectEmoji}
                        />
                    </div>
                : null
            }

            <div className="int">
                <div className="file">
                    <input type="file" name="file" ref={fileInput}/>
                    <ImAttachment onClick={handleSelectFile} className="icon" title="Envoyer un fichier"/>
                </div>

                <input type="text" value={message ? message.value : ""} name="message" onChange={(e)=>setMessage({type: e.target.type, value: e.target.value})} className="message" placeholder="Tapez votre message..."/>

                <div className="options">
                    <BsFillEmojiHeartEyesFill onClick={handleBlockEmoji} className="icon" title="Envoyer un emoji"/>
                    <FaMicrophone className="icon" title="Envoyer un audio"/>
                </div>

                <button className="send" onClick={handleSendMessage}>
                    <RiSendPlaneFill title="Envoyer un message"/>
                </button>
            </div>
        </div>
    </div>

    return component
}

export default Conversation