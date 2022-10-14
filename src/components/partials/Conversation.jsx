import "../../public/css/partials/_conversation.css"
import {IoIosCall} from "react-icons/io"
import {IoIosOptions} from "react-icons/io"
import {ImAttachment} from "react-icons/im"
import {BsFillEmojiHeartEyesFill} from "react-icons/bs"
import {FaMicrophone} from "react-icons/fa"
import {RiSendPlaneFill} from "react-icons/ri"
import AvatarFriend from "../pieces/avatarFriend"

function Conversation()
{
    const component = 
    <div id="Conversation">
        <div className="Top">
            <div className="friend">
                <div className="avatar">
                    <AvatarFriend status={1}/>
                </div>

                <div className="name_online">
                    <strong>Samy Tshibanda</strong>
                    
                    <div className="online">
                        <span>online</span>
                        <span>last seen 3 hours ago</span>
                    </div>
                </div>
            </div>

            <div className="options">
                <IoIosCall className="icon"/>
                <IoIosOptions className="icon"/>
            </div>
        </div>

        <div className="Body">
            <div className="friend">
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    <i></i>
                </p>
                <span>Yesterday 14:26 PM</span>
            </div>

            <div className="me">
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    <i></i>
                </p>
                <span>Yesterday 14:26 PM</span>
            </div>

            <div className="friend">
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    <i></i>
                </p>
                <span>Yesterday 14:26 PM</span>
            </div>

            <div className="me">
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    <i></i>
                </p>
                <span>Yesterday 14:26 PM</span>
            </div>

            <div className="friend">
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    <i></i>
                </p>
                <span>Yesterday 14:26 PM</span>
            </div>

            <div className="me">
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    <i></i>
                </p>
                <span>Yesterday 14:26 PM</span>
            </div>
        </div>

        <div className="Bottom">
            <div className="int">
                <div className="file">
                    <input type="file" name="file" />
                    <ImAttachment className="icon" title="Envoyer un fichier"/>
                </div>

                <input type="text" name="message" className="message" placeholder="Tapez votre message..."/>

                <div className="options">
                    <BsFillEmojiHeartEyesFill className="icon" title="Envoyer un emoji"/>
                    <FaMicrophone className="icon" title="Envoyer un audio"/>
                </div>

                <button className="send">
                    <RiSendPlaneFill title="Envoyer un message"/>
                </button>
            </div>
        </div>
    </div>

    return component
}

export default Conversation