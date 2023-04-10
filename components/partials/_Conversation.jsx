import EmojiPicker from "emoji-picker-react"
import { useContext, useEffect, useRef, useState } from "react"
import { BiLoaderAlt } from "react-icons/bi"
import { BsArrowLeftSquare, BsFillEmojiHeartEyesFill } from "react-icons/bs"
import { FaMicrophone } from "react-icons/fa"
import { GrContactInfo } from "react-icons/gr"
import { IoMdClose } from "react-icons/io"
import { RiSendPlaneFill } from "react-icons/ri"
import { ImAttachment } from "react-icons/im"
import { authStore, dataContext } from "../../store/AuthStore"
import styles from "../../styles/components/partials/_conversation.module.css"
import AvatarFriend from "./_Avatar"
import { dataStore } from "../../store/dataStore"
import { conversationStore } from "../../store/ConversationStore"
import formatSizeUnits from "../../data/functions"
import axios from "axios"
import { routeApi } from "../../route/webApi"
import moment from "moment"


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

    // function handleSendMessage()
    // {
    //     if(message || filesSelected.length !== 0)
    //     {
    //         setLoaderSendMessage(true)

    //         if(filesSelected)
    //         {
    //             const reader = new FileReader()

    //             reader.onload = function(evt) 
    //             {
    //                 const file = evt.target.result
    
    //                 socket.emit("sendMessage", {
    //                     from: userLogin._id,
    //                     to: conversationSelected.friend._id,
    //                     message: message ? message : null,
    //                     file,
    //                     token,
    //                     conversation_id: conversationSelected._id
    //                 })
    //             }
    //             reader.readAsDataURL(filesSelected[0])
    //         }
    //         else
    //         {
    //             socket.emit("sendMessage", {
    //                 from: userLogin._id,
    //                 to: conversationSelected.friend._id,
    //                 message: message ? message : null,
    //                 file: null,
    //                 token,
    //                 conversation_id: conversationSelected._id
    //             })
    //         }
    //     }
    // }

    function handleSendMessage(e)
    {
        if(message && message.length > 1)
        {
            if(e.key === "Enter" || !e.key)
            {
                const addSendedMessage = [
                    ...conversationSelected.messages,
                    {
                        text: message,
                        from: "me",
                        createdAt: moment().format()
                    }
                ]
    
                setLoaderSendMessage(true)
                setMessage("")
                setConversationSelected({
                    _id: conversationSelected._id,
                    title: conversationSelected.title,
                    messages: addSendedMessage,
                    create_at: conversationSelected.createdAt,
                    update_at: conversationSelected.updatedAt,
                })
    
                axios.post(routeApi.send_message, 
                {
                    conversationId: conversationSelected._id,
                    message: {
                      from: "me",
                      text: message
                    }
                },
                {
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                }
                )
                .then((res) => 
                {
                    const response = res.data
    
                    const addReceivedMessages = [
                        ...addSendedMessage,
                        {
                            text: response.text,
                            from: response.from,
                            createdAt: response.createdAt
                        }
                    ]
    
                    const data = {
                        _id: conversationSelected._id,
                        title: conversationSelected.title,
                        messages: addReceivedMessages,
                        create_at: conversationSelected.createdAt,
                        update_at: conversationSelected.updatedAt,
                    }
    
                    setConversationSelected(data)
    
                    setLoaderSendMessage(false)
                })
                .catch((err) => console.error(err))
            }
        }
    }
    
    const {loader} = dataStore((state) => state),
          {
            conversations, 
            conversationSelected, setConversationSelected
          } = conversationStore((state) => state),
          {token} = authStore((state) => state) 

    const [message, setMessage] = useState("")
    const [inputSent, setInputSent] = useState(null)
    const [emojiBlock, setEmojiBlock] = useState(false)
    const [filesSelected, setFilesSelected] = useState("")
    const [activeSelectImgBlc, setActiveSelectImgBlc] = useState(false)
    const [loaderSendMessage, setLoaderSendMessage] = useState(false)
    const [renderConversationSelected, setRenderConversationSelected] = useState(conversationSelected)

    const bodyBlock = useRef(),
          fileInput = useRef(),
          sizeFile = useRef(),
          typeFile = useRef(),
          blocToDisplayImg = useRef()


    useEffect(() => 
    {
        bodyBlock.current.scrollTo(0, bodyBlock.current.scrollHeight)
    }, [conversationSelected])

    useEffect(() => 
    {
        setRenderConversationSelected(conversationSelected)
    }, [conversationSelected])



    const component = 
    <div className={`${styles.Conversation} ${!activeSelectImgBlc ? null : styles.Active_img_selected}`}>
        <div className={styles.Top}>
            <div className={styles.friend}>
                <button className={styles.retour} title="Retour" onClick={handleCloseDiscution}>
                    <BsArrowLeftSquare/>
                </button>

                <div className={styles.avatar}>
                    <AvatarFriend user={{avatar: [], status: true}}/>
                </div>

                <div className={styles.name_online}>
                    <strong>
                    {
                        conversationSelected.title
                    }
                    </strong>
                    
                    <div className={styles.online}>
                        <span>
                            {
                                "Online"
                            }
                        </span>
                        
                        {/* {
                            true ?
                                <span>last seen 3 hours ago</span>
                            : null
                        } */}
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
            renderConversationSelected._id 
            ?
                renderConversationSelected.messages.map((message, key) => [
                    <div key={key} className={message.from === "me" ? styles.me : styles.friend}>
                        <div className={styles.txt_img}>
                            {/* {
                                message.type_file === "image" ?
                                    <div className={styles.img} style={{backgroundImage: `url(${message.link_file})`}}></div>
                                : null
                            } */}
                            
                            {/* {
                                message.message ?
                                    message.type_file === "image"
                                    ?
                                        <strong className={styles.content_img}>{message.message}</strong>
                                    : 
                                        <strong>{message.message}</strong>
                                : null
                            } */}
                            {
                                <strong>
                                {
                                    message.text[0].toUpperCase()
                                }
                                {
                                    message.text.substring(1, message.text.length)
                                }
                                </strong>
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
                    <button onClick={handleCloseBlockImg} title="Fermer le bloc d'image">
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
                {/* <div className={styles.file}>
                    <input type="file" name="file" onChange={(e) => setFilesSelected(e.target.files)} ref={fileInput}/>
                    <ImAttachment onClick={handleSelectFile} className={styles.icon} title="Envoyer un fichier"/>
                </div> */}

                <input 
                    type="text" 
                    value={message} 
                    onChange={(e)=>setMessage(e.target.value)} 
                    onKeyDown={!loaderSendMessage ? (e) => handleSendMessage(e) : null}
                    className={styles.message} 
                    placeholder="Tapez votre message..."    
                />

                <div className={styles.options}>
                    {/* <BsFillEmojiHeartEyesFill onClick={handleBlockEmoji} className={styles.icon} title="Envoyer un emoji"/> */}
                    {/* <FaMicrophone className={styles.icon} title="Envoyer un audio"/> */}
                </div>

                {
                    <button className={styles.send} title="Envoyer votre message" onClick={!loaderSendMessage ? (e) => handleSendMessage(e) : null}>
                        {
                            !loaderSendMessage
                            ?
                                <RiSendPlaneFill/>
                            : 
                                <BiLoaderAlt className={styles.icon}/>
                        }
                    </button>
                }
            </div>
        </div>
    </div>

    return component
}

export default Conversation