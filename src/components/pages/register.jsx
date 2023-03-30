import Logo from "../pieces/logo"
import {Link} from "react-router-dom"
import {route} from "../../data/web"
import { dataContext } from "../../data/context"
import {useContext, useRef, useState} from "react"
import axios from "axios"
import { routeApi } from "../../data/webApi"
import { BiLoaderAlt } from "react-icons/bi"

function Register()
{
    function CreateUser(e)
    {
        const element = myForm.current,
        data = {
            nom: element["nom"].value,
            prenom: element["prenom"].value,
            email: element["email"].value,
            sexe: element["sexe"].value,
            password: element["password"].value,
            confirm_password: element["confirm_password"].value
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

    const {
        setUserLogin,
        setToken
    } = useContext(dataContext)

    const [error, setError] = useState(""),
          [errorBloc, setErrorBloc] = useState(false),
          [loader, setLoader] = useState(false)

    const myForm = useRef()

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

                <div className="input_label">
                    <input type="password" name="confirm_password" placeholder="Confirmer votre mot de passe"/>
                </div>

                <div className="send">
                    <button type="button" onClick={CreateUser}>
                    {
                        !loader
                        ?
                            <span>S'inscrire</span>
                        :
                            <BiLoaderAlt className="icon"/>
                    }
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