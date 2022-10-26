import { useContext } from "react"
import { dataContext } from "../../data/context"
import "../../public/css/partials/_friend_detail.css"
import AvatarFriend from "../pieces/avatarFriend"

function FriendDetails()
{
    const {conversationSelected} = useContext(dataContext)

    const component = 
    <div id="FriendDetails">
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