import "../../public/css/partials/_header_login_register.css"
import "../../public/css/login.css"
import {Link, useNavigate} from 'react-router-dom'
import {route} from "../../data/web"
import Logo from "../pieces/logo"
import { routeApi } from "../../data/webApi"
import axios from "axios"
import { dataContext } from "../../data/context"
import {useContext} from "react"

function Login()
{
    const {setUserLogin, setToken} = useContext(dataContext)

    function SignIn(e)
    {
        const element = e.target,
        data = {
            email: element.form["email"].value,
            password: element.form["password"].value
        } 

        axios.post(routeApi.SignIn,
        {...data},
        {
            "Content-type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        })
        .then((res) => {
            localStorage.setItem("token", res.data.token)
            setUserLogin(res.data.user)
            setToken(res.data.token)
        })
        .catch((error) => console.error(error))
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

            <form>
                <div className="input_label">
                    <label for="Email">email</label>
                    <input type="email" name="email" id="Email" placeholder="exemple@gmail.com"/>
                </div>

                <div className="input_label">
                    <label for="Password">password</label>
                    <input type="password" name="password" id="Password" placeholder="Mot de passe"/>
                </div>

                <div className="send">
                    <button type="button" onClick={SignIn}>
                        Se connecter
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