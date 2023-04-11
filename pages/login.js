import Link from "next/link"
import { BiLoaderAlt } from "react-icons/bi"
import { routeWeb } from "../route/web"
import { configHeader, routeApi } from "../route/webApi"
import styles from "../styles/login.module.css"
import Logo from "../components/partials/_Logo"
import { useRef, useState } from "react"
import axios from "axios"
import { useEffect } from "react"
import Cookies from "js-cookie"
import { tokenKey, userKey } from "../utils/constants"

function Login()
{
    function SignIn()
    {
        const form = myForm.current,
        data = {
            email: form["email"].value,
            password: form["password"].value
        } 

        setLoader(true)

        axios.post(routeApi.SignIn,
            {...data},
            configHeader
        )
        .then((res) => 
        {
            // localStorage.setItem("token", res.data.token)
            // setUserLogin(res.data.user)
            // localStorage.setItem("userLogin", JSON.stringify(res.data.user))
            // setToken(res.data.token)
            // setDataNotification({
            //     status: true,
            //     message: "Bonjour " + res.data.user.prenom + " " + res.data.user.nom,
            //     success: true
            // })
            // setLoader(false)
        })
        .catch((errors) => 
        {
            // if(errors.response.data.success === false) 
            // {
                // setError(errors.response.data.message)
            // }
            // else
            // {
                // setError(errors.response.data.errors)
            // }

            // setErrorBloc(true)
            // setLoader(false)
        })
    }

    useEffect(() => 
    {
        const data = {
            user: {
                "prenom": "Pascal",
                "nom": "Kasonga",
                "tel": "+243852797112",
                "password": "$2b$10$K5h0yuouVZRXgVCJD64Iwe9sw1kuPyQYTDt7WZJ89XwZioZIT9tRC",
                "conversations": [],
                "_id": "64344b0305633fff43e26e26",
                "createdAt": "2023-04-10T17:44:35.849Z",
                "updatedAt": "2023-04-10T17:44:35.849Z",
            },
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IisyNDM4NTI3OTcxMTIiLCJpYXQiOjE2ODExNDg2NzV9.HtmODbB1WCZpdvtXNwKNQH0sWZX-imkTKrsVXYiOa5M",
        }
        Cookies.set(userKey, JSON.parse(data.user))
        Cookies.set(tokenKey, data.token)
    }, [])


    const [error, setError] = useState(null),
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
                <h2>Connexion</h2>
                <p>Bonjour! Connectez-vous et commencez à discuter avec vos amis</p>
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
                <div className={styles.input_label}>
                    <label htmlFor="Email">email</label>
                    <input type="email" name="email" id="Email" placeholder="exemple@gmail.com"/>
                </div>

                <div className={styles.input_label}>
                    <label htmlFor="Password">password</label>
                    <input type="password" name="password" id="Password" placeholder="Mot de passe"/>
                </div>

                <div className={styles.send}>
                    <button type="button" onClick={!loader ? SignIn : null}>
                    {
                        !loader
                        ?
                            <span>Se connecter</span>
                        :
                            <BiLoaderAlt className={styles.icon}/>
                    }
                    </button>
                </div>
            </form>

            <div className={styles.foot}>
                <span>Vous n’avez pas de compte ?</span>
                <Link href={routeWeb.register.link}>Inscrivez-vous</Link>
            </div>
        </div>
    </div>

    return component
}

export default Login