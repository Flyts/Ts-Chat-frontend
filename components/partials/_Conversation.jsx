import EmojiPicker from "emoji-picker-react"
import { useContext, useEffect, useRef, useState } from "react"
import { BiLoaderAlt } from "react-icons/bi"
import { BsArrowLeftSquare, BsFillEmojiHeartEyesFill } from "react-icons/bs"
import { FaMicrophone } from "react-icons/fa"
import { GrContactInfo } from "react-icons/gr"
import { IoMdClose } from "react-icons/io"
import { RiSendPlaneFill } from "react-icons/ri"
import { ImAttachment } from "react-icons/im"
import { dataContext } from "../../store/AuthStore"
import styles from "../../styles/components/partials/_conversation.module.css"
import AvatarFriend from "./_Avatar"
import { dataStore } from "../../store/dataStore"
import { conversationStore } from "../../store/ConversationStore"
import formatSizeUnits from "../../data/functions"


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
            setLoaderSendMessage(true)

            if(filesSelected)
            {
                const reader = new FileReader()

                reader.onload = function(evt) 
                {
                    const file = evt.target.result
    
                    socket.emit("sendMessage", {
                        from: userLogin._id,
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
                    from: userLogin._id,
                    to: conversationSelected.friend._id,
                    message: message ? message : null,
                    file: null,
                    token,
                    conversation_id: conversationSelected._id
                })
            }
        }
    }

    
    const {loader} = dataStore((state) => state),
          {conversationSelected} = conversationStore((state) => state)

    const [message, setMessage] = useState("")
    const [inputSent, setInputSent] = useState(null)
    const [emojiBlock, setEmojiBlock] = useState(false)
    const [filesSelected, setFilesSelected] = useState("")
    const [activeSelectImgBlc, setActiveSelectImgBlc] = useState(false)
    const [loaderSendMessage, setLoaderSendMessage] = useState(false)

    const bodyBlock = useRef(),
          fileInput = useRef(),
          sizeFile = useRef(),
          typeFile = useRef(),
          blocToDisplayImg = useRef()


    useEffect(() => 
    {
        // socket.on("sended_message", (data)=>
        // {
        //     const conversation = (JSON.parse(localStorage.getItem("conversationSelected")))

        //     if(userLogin._id === data.sender_id && conversation._id === data.conversation_id)
        //     {
        //         const value = {
        //             _id: conversation._id,
        //             friend: conversationSelected.friend,
        //             messages: data.messages
        //         }

        //         setConversationSelected(value)
        //         localStorage.setItem("conversationSelected", JSON.stringify(value))

        //         setEmojiBlock(false)
        //         setMessage("")
        //         setFilesSelected()
        //         setActiveSelectImgBlc(false)
        //         setLoaderSendMessage(false)
        //     }
        // })

        // socket.on("receive_message", (data) =>
        // {
        //     const conversation = (JSON.parse(localStorage.getItem("conversationSelected")))

        //     if(conversation._id === data.conversation_id)
        //     {
        //         const value = {
        //             _id: conversation._id,
        //             friend: conversation.friend,
        //             messages: data.messages
        //         }

        //         setConversationSelected(value)
        //         localStorage.setItem("conversationSelected", JSON.stringify(value))
        //     }
        // })

        // socket.on("error_get_messages", (error) => {
        //     console.error(error)
        // })

        // socket.on("error_sended_message", (error) => {
        //     console.error(error)
        // })
    }, [])

    useEffect(() => 
    {
        bodyBlock.current.scrollTo(0, bodyBlock.current.scrollHeight)
    }, [conversationSelected.messages])

    useEffect(() => 
    {
        // socket.emit("login_after_reload_page",
        // {
        //     conversation_id: conversationSelected._id,
        //     token: token
        // })
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
    <div className={`${styles.Conversation} ${!activeSelectImgBlc ? null : styles.Active_img_selected}`}>
        <div className={styles.Top}>
            <div className={styles.friend}>
                <button className={styles.retour} title="Retour" onClick={handleCloseDiscution}>
                    <BsArrowLeftSquare/>
                </button>

                <div className={styles.avatar}>
                    {/* <AvatarFriend user={{avatar:conversationSelected.friend.avatar, status:conversationSelected.friend.status}}/> */}
                    <AvatarFriend user={{avatar: [], status: true}}/>
                </div>

                <div className={styles.name_online}>
                    <strong>
                    {
                        "Tshibanda Samy"
                    }
                    </strong>
                    
                    <div className={styles.online}>
                        <span>{true ? "online" : "offline"}</span>
                        
                        {
                            !true ?
                                <span>last seen 3 hours ago</span>
                            : null
                        }
                    </div>
                </div>
            </div>

            <div className={styles.options}>
                {/* <IoIosCall className="icon"/> */}
                <GrContactInfo onClick={handleShowInfoFriend} className={`${styles.icon} ${styles.option}`} title={"Info "+ "Tshibanda Samy"}/>
            </div>
        </div>

        <div className={styles.Body} ref={bodyBlock}>
            {
                conversationSelected !== null 
                ?
                    conversationSelected.messages.map((message) => [
                        <div key={message._id} className={message.from === userLogin._id ? styles.me : styles.friend}>
                            <div className={styles.txt_img}>
                                {
                                    message.type_file === "image" ?
                                        {/* <div className={styles.img} style={{backgroundImage: `url(${message.link_file})`}}></div> */}
                                    : null
                                }
                                
                                {
                                    message.message ?
                                        message.type_file === "image"
                                        ?
                                            <strong className={styles.content_img}>{message.message}</strong>
                                        : 
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

        <div className={styles.Bottom}>
            <div className={styles.image_seleted}>
                <div className={styles.top}>
                    <button onClick={handleCloseBlockImg} title="Fermer le bloc image">
                        <IoMdClose />
                    </button>
                </div>

                <div className={styles.image} ref={blocToDisplayImg}></div>

                <div className={styles.details_image}>
                    <div className={styles.part}>
                        <strong>Size : </strong>
                        <span ref={sizeFile}></span>
                    </div>

                    <div className={styles.part}>
                        <strong>Type : </strong>
                        <span ref={typeFile}></span>
                    </div>
                </div>
            </div>  

            {
                emojiBlock
                ?
                    <div className={styles.emoji}>
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

            <div className={styles.int}>
                <div className={styles.file}>
                    <input type="file" name="file" onChange={(e) => setFilesSelected(e.target.files)} ref={fileInput}/>
                    <ImAttachment onClick={handleSelectFile} className={styles.icon} title="Envoyer un fichier"/>
                </div>

                <input type="text" value={message} name="message" onChange={(e)=>setMessage(e.target.value)} className={styles.message} placeholder="Tapez votre message..."/>

                <div className={styles.options}>
                    <BsFillEmojiHeartEyesFill onClick={handleBlockEmoji} className={styles.icon} title="Envoyer un emoji"/>
                    <FaMicrophone className={styles.icon} title="Envoyer un audio"/>
                </div>

                {
                    loaderSendMessage ?
                        <button className={styles.send}>
                            <BiLoaderAlt className={styles.icon}/>
                        </button>
                    :
                        <button className={styles.send} title="Envoyer votre message" onClick={handleSendMessage}>
                            <RiSendPlaneFill/>
                        </button>
                }
            </div>
        </div>
    </div>

    return component
}

export default Conversation