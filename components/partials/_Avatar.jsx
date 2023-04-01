import styles from "../../styles/components/partials/_avatar.module.css"
import Img from "../../public/default.jpg"
import Image from "next/image"

function AvatarFriend({user})
{
    const component =
    <div className={styles.AvatarFriend}>
        {/* <div className={styles.img} style={{backgroundImage: `url(${user ? user.avatar : ""})`}}></div> */}
        <div className={styles.img} style={{backgroundImage: `url(${Img})`}}>
            <Image
                src={Img}
                layout={"fill"}
                objectFit={"cover"}
                quality={100}
                sizes="100%"
                alt={`${user.nom} ${user.prenom}`}
                className={styles.user_image}
            />
        </div>
        <div className={styles.status}>
            <i className={user ? user.status ? styles.online : styles.offline : ""}></i>
        </div>
    </div>

    return component
}

export default AvatarFriend