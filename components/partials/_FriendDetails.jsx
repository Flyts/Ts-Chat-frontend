import { useContext } from "react"
import { BsArrowLeftSquare } from "react-icons/bs"
import { dataContext } from "../../store/AuthStore"
import styles from "../../styles/components/partials/_friendDetails.module.css"

function FriendDetails()
{
    function handleCloseInfoFriend()
    {
        document.body.classList.remove("Show_info_friend")
    }


    const {conversationSelected} = useContext(dataContext)

    const component = 
    <div className={styles.FriendDetails}>
        <div className={styles.Close}>
            <button className={styles.retour} title="Retour" onClick={handleCloseInfoFriend}>
                <BsArrowLeftSquare/>
            </button>
        </div>

        <div className={styles.Avatar}>
            {/* <AvatarFriend user={{avatar: conversationSelected.friend.avatar, status: conversationSelected.status}}/> */}
        </div>

        <div className={styles.Name}>
            <span>
            {
                "Samy Tshibanda"
            }
            </span>
        </div>

        <div className={styles.Pays}>
            {/* <span>{conversationSelected.friend.sexe}</span> */}
            <span>{"Homme"}</span>
        </div>

        <p className={styles.Description}>
            {
                "sa"
            }
        </p>

        <div className={styles.Contacts}>
            <div className={styles.int}>
            {/* {
                conversationSelected.friend.phone ?
                <>
                    <strong>Phone</strong>
                    <span>{conversationSelected.friend.phone}</span>
                </>
                : null
            } */}
            </div>

            <div className={styles.int}>
            {/* {
                conversationSelected.friend.email ?
                <>
                    <strong>E-mail</strong>
                    <span>{conversationSelected.friend.email}</span>
                </>
                : null
            } */}
            </div>
        </div>
    </div>

    return component
}

export default FriendDetails