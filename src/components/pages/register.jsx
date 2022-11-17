import Logo from "../pieces/logo"
import {Link} from "react-router-dom"
import {route} from "../../data/web"
import { dataContext } from "../../data/context"
import {useContext} from "react"
import axios from "axios"
import { routeApi } from "../../data/webApi"

function Register()
{
    function CreateUser(e)
    {
        const element = e.target,
        data = {
            nom: element.form["nom"].value,
            prenom: element.form["prenom"].value,
            email: element.form["email"].value,
            sexe: element.form["sexe"].value,
            password: element.form["password"].value
        } 

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
        })
        .catch((error) => console.error(error))
    }

    const {
        setUserLogin,
        setToken
    } = useContext(dataContext)

    const component = 
    <div id="Bloc">
        <div className="Back"></div>

        <div className="Connect">
            <div className="logo">
                <Logo />
            </div> 

            <div className="title_and_txt">
                <h2>Inscription</h2>
            </div>

            <form>
                <div className="deux_input">
                    <div className="part">
                        <label htmlFor="Nom">Nom</label>
                        <input type="text" id="Nom" name="nom" placeholder="Tapez votre Nom"/>
                    </div>

                    <div className="part">
                        <label htmlFor="Prenom">Prénom</label>
                        <input type="text" id="Prenom" name="prenom" placeholder="Tapez votre Prénom"/>
                    </div>
                </div>

                <div className="input_label">
                    <label htmlFor="Email">email</label>
                    <input type="email" name="email" id="Email" placeholder="Tapez votre adresse mail"/>
                </div>

                <div className="input_label">
                    <label htmlFor="Sexe">sexe</label>
                    <select name="sexe" id="Sexe">
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                    </select>
                </div>

                <div className="input_label">
                    <label htmlFor="Password">password</label>
                    <input type="password" name="password" id="Password" placeholder="Tapez votre mot de passe"/>
                </div>

                {/* <div className="input_label">
                    <input type="password" name="confirm-password" placeholder="Confirmer votre mot de passe"/>
                </div> */}

                <div className="send">
                    <button type="button" onClick={CreateUser}>
                        S'inscrire
                    </button>
                </div>
            </form>

            <div className="foot">
                <span>Vous avez un compte ?</span>
                <Link to={route.login.link}>Connectez-vous</Link>
            </div>
        </div>
    </div>

    return component
}

export default Register