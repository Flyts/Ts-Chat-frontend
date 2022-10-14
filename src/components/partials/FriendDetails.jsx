import "../../public/css/partials/_friend_detail.css"
import AvatarFriend from "../pieces/avatarFriend"

function FriendDetails()
{
    const component = 
    <div id="FriendDetails">
        <div className="Avatar">
            <AvatarFriend/>
        </div>

        <div className="Name">
            <span>Samy Tshibanda</span>
        </div>

        <div className="Pays">
            <span>Homme</span>
        </div>

        <p className="Description">
            Salut! je viens de m'inscrire sur Ts Chat. 
        </p>

        <div className="Contacts">
            <div className="int">
                <strong>Phone</strong>
                <span>+243 824 176 842</span>
            </div>

            <div className="int">
                <strong>E-mail</strong>
                <span>samytshibanda@gmail.com</span>
            </div>
        </div>
    </div>

    return component
}

export default FriendDetails