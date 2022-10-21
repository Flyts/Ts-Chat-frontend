import { useContext } from "react"
import { dataContext } from "../../data/context"
import "../../public/css/partials/_friend_detail.css"
import AvatarFriend from "../pieces/avatarFriend"

function FriendDetails()
{
    const {userSelected} = useContext(dataContext)

    const component = 
    <div id="FriendDetails">
        <div className="Avatar">
            <AvatarFriend user={{avatar: userSelected.avatar, status: userSelected.status}}/>
        </div>

        <div className="Name">
            <span>
            {
                userSelected.name.prenom+" "+userSelected.name.nom
            }
            </span>
        </div>

        <div className="Pays">
            <span>{userSelected.sexe}</span>
        </div>

        <p className="Description">
            {
                userSelected.desciption
            }
        </p>

        <div className="Contacts">
            <div className="int">
            {
                userSelected.phone ?
                <>
                    <strong>Phone</strong>
                    <span>{userSelected.phone}</span>
                </>
                : null
            }
            </div>

            <div className="int">
            {
                userSelected.email ?
                <>
                    <strong>E-mail</strong>
                    <span>{userSelected.email}</span>
                </>
                : null
            }
            </div>
        </div>
    </div>

    return component
}

export default FriendDetails