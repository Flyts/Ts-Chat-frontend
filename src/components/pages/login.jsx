import "../../public/css/partials/_header_login_register.css"
import "../../public/css/login.css"
import {Link, useNavigate} from 'react-router-dom'
import {route} from "../../data/web"
import Logo from "../pieces/logo"
import { routeApi } from "../../data/webApi"
import axios from "axios"
import { dataContext } from "../../data/context"
import {useContext, useRef, useState} from "react"
import { BiLoaderAlt } from "react-icons/bi"

function Login()
{
    const {setUserLogin, setToken, setDataNotification} = useContext(dataContext)


    const [error, setError] = useState(""),
          [errorBloc, setErrorBloc] = useState(false),
          [loader, setLoader] = useState(false)

          const myForm = useRef()

    function SignIn(e)
    {
        const element = myForm.current,
        data = {
            email: element["email"].value,
            password: element["password"].value
        } 

        setLoader(true)

        axios.post(routeApi.SignIn,
            {...data},
            routeApi.configHeader
        )
        .then((res) => {
            localStorage.setItem("token", res.data.token)
            setUserLogin(res.data.user)
            localStorage.setItem("userLogin", JSON.stringify(res.data.user))
            setToken(res.data.token)
            setDataNotification({
                status: true,
                message: "Bonjour " + res.data.user.prenom + " " + res.data.user.nom,
                success: true
            })
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

    const component = 
    <div id="Bloc">
        <div className="Back"></div>

        <div className="Connect">
            <div className="logo">
                <Logo />
            </div> 

            <div className="title_and_txt">
                <h2>Connexion</h2>
                <p>Bonjour! Connectez-vous et commencez à discuter avec vos amis</p>
            </div>


            {
                errorBloc
                ?
                    Array.isArray(error)
                    ? 
                        <div className="Erros">
                        {
                            error.map((element) => 
                            [
                                <span key={element.param}>{element.msg}</span>
                            ])
                        }
                        </div>
                    :
                        <div className="Erros">    
                            <span>{error}</span>
                        </div>
                :
                    null
            }

            <form ref={myForm}>
                <div className="input_label">
                    <label htmlFor="Email">email</label>
                    <input type="email" name="email" id="Email" placeholder="exemple@gmail.com"/>
                </div>

                <div className="input_label">
                    <label htmlFor="Password">password</label>
                    <input type="password" name="password" id="Password" placeholder="Mot de passe"/>
                </div>

                <div className="send">
                    <button type="button" onClick={SignIn}>
                    {
                        !loader
                        ?
                            <span>Se connecter</span>
                        :
                            <BiLoaderAlt className="icon"/>
                    }
                    </button>
                </div>
            </form>

            <div className="foot">
                <span>Vous n’avez pas de compte ?</span>
                <Link to={route.register.link}>Inscrivez-vous</Link>
            </div>
        </div>
    </div>

    return component
}

export default Login