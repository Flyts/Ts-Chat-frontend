import { useRef, useState } from "react"
import Logo from "../components/partials/_Logo"
import { BiLoaderAlt } from "react-icons/bi"
import Link from "next/link"
import { routeWeb } from "../route/web"
import styles from "../styles/login.module.css"


function Register()
{
    function CreateUser(e)
    {
        const form = myForm.current,
        data = {
            prenom: form["prenom"].value,
            nom: form["nom"].value,
            tel: form["tel"].value,
            // sexe: form["sexe"].value,
            password: form["password"].value,
            // confirm_password: form["confirm_password"].value
        } 

        setLoader(true)

        axios.post(routeApi.createUser,
            {...data},
            routeApi.configHeader
        )
        .then((res) => 
        {
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("userLogin", JSON.stringify(res.data.user))
            setUserLogin(res.data.user)
            setToken(res.data.token)
            setLoader(false)
        })
        .catch((errors) => {
            if(errors.response.data.success === false) 
            {
                setError(errors.response.data.message)
            }
            else
            {
                setError(errors.response.data.errors)
            }

            setErrorBloc(true)
            setLoader(false)
        })
    }

    const [error, setError] = useState(""),
          [errorBloc, setErrorBloc] = useState(false),
          [loader, setLoader] = useState(false)

    const myForm = useRef()

    const component = 
    <div className={styles.Bloc}>
        <div className={styles.Back}></div>

        <div className={styles.Connect}>
            <div className={styles.logo}>
                <Logo />
            </div> 

            <div className={styles.title_and_txt}>
                <h2>Inscription</h2>
            </div>


            {
                errorBloc
                ?
                    Array.isArray(error)
                    ? 
                        <div className={styles.Erros}>
                        {
                            error.map((element) => 
                            [
                                <span key={element.param}>{element.msg}</span>
                            ])
                        }
                        </div>
                    :
                        <div className={styles.Erros}>    
                            <span>{error}</span>
                        </div>
                :
                    null
            }

            <form ref={myForm}>
                <div className={styles.deux_input}>
                    <div className={styles.part}>
                        <label htmlFor="Nom">Nom</label>
                        <input type="text" id="Nom" name="nom" placeholder="Tapez votre Nom"/>
                    </div>

                    <div className={styles.part}>
                        <label htmlFor="Prenom">Prénom</label>
                        <input type="text" id="Prenom" name="prenom" placeholder="Tapez votre Prénom"/>
                    </div>
                </div>

                <div className={styles.input_label}>
                    <label htmlFor="Email">email</label>
                    <input type="email" name="email" id="Email" placeholder="Tapez votre adresse mail"/>
                </div>

                <div className={styles.input_label}>
                    <label htmlFor="Sexe">sexe</label>
                    <select name="sexe" id="Sexe">
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                    </select>
                </div>

                <div className={styles.input_label}>
                    <label htmlFor="Password">password</label>
                    <input type="password" name="password" id="Password" placeholder="Tapez votre mot de passe"/>
                </div>

                <div className={styles.input_label}>
                    <input type="password" name="confirm_password" placeholder="Confirmer votre mot de passe"/>
                </div>

                <div className={styles.send}>
                    <button type="button" onClick={!loader ? CreateUser : null}>
                    {
                        !loader
                        ?
                            <span>{"S'inscrire"}</span>
                        :
                            <BiLoaderAlt className={styles.icon}/>
                    }
                    </button>
                </div>
            </form>

            <div className={styles.foot}>
                <span>Vous avez un compte ?</span>
                <Link href={routeWeb.login.link}>Connectez-vous</Link>
            </div>
        </div>
    </div>

    return component
}

export default Register