import { useContext } from "react"
import { BsArrowLeftSquare } from "react-icons/bs"
import { dataContext } from "../../data/context"
import "../../public/css/partials/_friend_detail.css"
import AvatarFriend from "../pieces/avatarFriend"

function FriendDetails()
{
    function handleCloseInfoFriend()
    {
        document.body.classList.remove("Show_info_friend")
    }


    const {conversationSelected} = useContext(dataContext)

    const component = 
    <div id="FriendDetails">
        <div className="Close">
            <button className="retour" title="Retour" onClick={handleCloseInfoFriend}>
                <BsArrowLeftSquare/>
            </button>
        </div>

        <div className="Avatar">
            <AvatarFriend user={{avatar: conversationSelected.friend.avatar, status: conversationSelected.status}}/>
        </div>

        <div className="Name">
            <span>
            {
                conversationSelected.friend.name.prenom+" "+conversationSelected.friend.name.nom
            }
            </span>
        </div>

        <div className="Pays">
            <span>{conversationSelected.friend.sexe}</span>
        </div>

        <p className="Description">
            {
                conversationSelected.friend.desciption
            }
        </p>

        <div className="Contacts">
            <div className="int">
            {
                conversationSelected.friend.phone ?
                <>
                    <strong>Phone</strong>
                    <span>{conversationSelected.friend.phone}</span>
                </>
                : null
            }
            </div>

            <div className="int">
            {
                conversationSelected.friend.email ?
                <>
                    <strong>E-mail</strong>
                    <span>{conversationSelected.friend.email}</span>
                </>
                : null
            }
            </div>
        </div>
    </div>

    return component
}

export default FriendDetails