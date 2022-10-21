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

function Conversation()
{
    function handleSelectEmoji(e)
    {
        setMessage({
            type: "text",
            value: message ? message.value + e.emoji : e.emoji
        })
    }

    function handleSelectFile(e)
    {
    }

    function handleBlockEmoji(value)
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
            axios.post(
                routeApi.sendMessage,
                {
                    ...message,
                    from: userLogin.id,
                    to: userSelected._id
                },
                routeApi.configAuthHeader
            )
            .then((res) => {
                if(res.data.success === true)
                {
                    setEmojiBlock(false)
                    setMessage(null)
                    setMessageFriend(res.data.messages)
                    localStorage.setItem("messageFriend", JSON.stringify(res.data.messages))
                }
            })
            .catch((error) => console.error(error))
        }
    }


    const {
        userSelected, userLogin, 
        messageFriend, setMessageFriend
    } = useContext(dataContext)
    const [message, setMessage] = useState(null)
    const [inputSent, setInputSent] = useState(null)
    const [emojiBlock, setEmojiBlock] = useState(false)
    const bodyBlock = useRef()

    useEffect(() => 
    {
        bodyBlock.current.scrollTo(0, bodyBlock.current.scrollHeight)
    }, [messageFriend])


    const component = 
    <div id="Conversation">
        <div className="Top">
            <div className="friend">
                <div className="avatar">
                    <AvatarFriend user={{avatar:userSelected.avatar, status:userSelected.status}}/>
                </div>

                <div className="name_online">
                    <strong>
                    {
                        userSelected.name.prenom+" "+userSelected.name.nom
                    }
                    </strong>
                    
                    <div className="online">
                        <span>{userSelected.status ? "online" : "offline"}</span>
                        
                        {
                            !userSelected.status ?
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
                messageFriend !== null 
                ?
                    messageFriend.map((message) => [
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
                    <input type="file" name="file" />
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