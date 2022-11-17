import "../../public/css/partials/_conversation.css"
import {IoIosCall} from "react-icons/io"
import {IoMdClose} from "react-icons/io"
import {GrContactInfo} from "react-icons/gr"
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
import formatSizeUnits from "../../data/functions"
import {BsArrowLeftSquare} from "react-icons/bs"

function Conversation()
{
    function handleCloseBlockImg()
    {
        setFilesSelected(null)
        setActiveSelectImgBlc(false)
    }

    function handleSelectEmoji(e)
    {
        setMessage(message + e.emoji)

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

    function handleCloseDiscution()
    {
        setLoader(false)
        document.body.classList.remove("Select_discution")

        setConversationSelected(null)
        setIdFriendSelected(null)
        localStorage.removeItem("conversationSelected")
    }

    function handleShowInfoFriend()
    {
        document.body.classList.add("Show_info_friend")
    }

    function handleSendMessage(e)
    {
        if(message || filesSelected.length !== 0)
        {
            if(filesSelected)
            {
                const reader = new FileReader()

                reader.onload = function(evt) 
                {
                    const file = evt.target.result
    
                    socket.emit("sendMessage", {
                        from: userLogin.id,
                        to: conversationSelected.friend._id,
                        message: message ? message : null,
                        file,
                        token,
                        conversation_id: conversationSelected._id
                    })
                }
                reader.readAsDataURL(filesSelected[0])
            }
            else
            {
                socket.emit("sendMessage", {
                    from: userLogin.id,
                    to: conversationSelected.friend._id,
                    message: message ? message : null,
                    file: null,
                    token,
                    conversation_id: conversationSelected._id
                })
            }

            // socket.emit("sendMessage", {
            //     from: userLogin.id,
            //     to: conversationSelected.friend._id,
            //     message: message,
            //     file: filesSelected[0],
            //     token,
            //     conversation_id: conversationSelected._id
            // })
        }
    }


    const {
        conversationSelected, setConversationSelected,
        userLogin,
        token,
        setIdFriendSelected,
        setLoader
    } = useContext(dataContext)

    const [message, setMessage] = useState("")
    const [inputSent, setInputSent] = useState(null)
    const [emojiBlock, setEmojiBlock] = useState(false)
    const [filesSelected, setFilesSelected] = useState("")
    const [activeSelectImgBlc, setActiveSelectImgBlc] = useState(false)

    const bodyBlock = useRef(),
          fileInput = useRef(),
          sizeFile = useRef(),
          typeFile = useRef(),
          blocToDisplayImg = useRef()


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
                setMessage("")
                setFilesSelected()
                setActiveSelectImgBlc(false)
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

        socket.on("error_get_messages", (error) => {
            console.error(error)
        })

        socket.on("error_sended_message", (error) => {
            console.error(error)
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

    useEffect(() => {
        if(filesSelected)
        {
            if(filesSelected.length !== 0)
            {
                setActiveSelectImgBlc(true)

                let files_Selected = filesSelected[0]
                let fileReader     = new FileReader()

                fileReader.onload = function(FileLoadEvent)
                {
                    let srcData = FileLoadEvent.target.result

                    blocToDisplayImg.current.style.backgroundImage = 'url(' +srcData+ ')'
                }
                fileReader.readAsDataURL(files_Selected)

                sizeFile.current.innerText = formatSizeUnits(files_Selected.size)
                typeFile.current.innerText = files_Selected.type
            }
            else
            {
                setActiveSelectImgBlc(false)
            }
        }
    }, [filesSelected])


    const component = 
    <div id="Conversation" className={!activeSelectImgBlc ? null : "Active_img_selected"}>
        <div className="Top">
            <div className="friend">
                <button className="retour" title="Retour" onClick={handleCloseDiscution}>
                    <BsArrowLeftSquare/>
                </button>

                <div className="avatar">
                    <AvatarFriend user={{avatar:conversationSelected.friend.avatar, status:conversationSelected.friend.status}}/>
                </div>

                <div className="name_online">
                    <strong>
                    {
                        conversationSelected.friend.prenom+" "+conversationSelected.friend.nom
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
                {/* <IoIosCall className="icon"/> */}
                <GrContactInfo onClick={handleShowInfoFriend} className="icon option" title={"Info "+ conversationSelected.friend.prenom+" "+conversationSelected.friend.nom}/>
            </div>
        </div>

        <div className="Body" ref={bodyBlock}>
            {
                conversationSelected !== null 
                ?
                    conversationSelected.messages.map((message) => [
                        <div key={message._id} className={message.from === userLogin.id ? "me" : "friend"}>
                            <div className="txt_img">
                                {
                                    message.type_file === "image" ?
                                        <div className="img" style={{backgroundImage: `url(${message.link_file})`}}></div>
                                    : null
                                }
                                
                                {
                                    message.message ?
                                        <strong>{message.message}</strong>
                                    : null
                                }
                                <i></i>
                            </div>
                            <span>
                            {
                                moment(Date.now()).format("MMM Do YY") === moment(message.createdAt).format("MMM Do YY")
                                ?
                                    moment(Date.now()).format("h") === moment(message.createdAt).format("h")
                                    ?
                                        moment(message.createdAt).fromNow()
                                    :
                                        moment(Date.now()).format("h:s")
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
            <div className="image_seleted">
                <div className="top">
                    <button onClick={handleCloseBlockImg} title="Fermer le bloc image">
                        <IoMdClose />
                    </button>
                </div>

                <div className="image" ref={blocToDisplayImg}></div>

                <div className="details_image">
                    <div className="part">
                        <strong>Size : </strong>
                        <span ref={sizeFile}></span>
                    </div>

                    <div className="part">
                        <strong>Type : </strong>
                        <span ref={typeFile}></span>
                    </div>
                </div>
            </div>  

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
                    <input type="file" name="file" onChange={(e) => setFilesSelected(e.target.files)} ref={fileInput}/>
                    <ImAttachment onClick={handleSelectFile} className="icon" title="Envoyer un fichier"/>
                </div>

                <input type="text" value={message} name="message" onChange={(e)=>setMessage(e.target.value)} className="message" placeholder="Tapez votre message..."/>

                <div className="options">
                    <BsFillEmojiHeartEyesFill onClick={handleBlockEmoji} className="icon" title="Envoyer un emoji"/>
                    <FaMicrophone className="icon" title="Envoyer un audio"/>
                </div>

                <button className="send" onClick={handleSendMessage}>
                    <RiSendPlaneFill title="Envoyer votre message"/>
                </button>
            </div>
        </div>
    </div>

    return component
}

export default Conversation