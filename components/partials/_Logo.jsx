import styles from "../../styles/components/partials/_logo.module.css"

function Logo()
{
    const component = 
    <div className={styles.Logo}>
        <div className={styles.Color_circle}>
            <div className={styles.int_circle}></div>
        </div>   
    </div>

    return component
}

export default Logo