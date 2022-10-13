import "../../public/css/partials/_header_login_register.css"
import "../../public/css/login.css"
import {Link} from 'react-router-dom'
import {route} from "../../data/web"
import Logo from "../pieces/logo"

function Login()
{
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
                    <label for="">email</label>
                    <input type="email" placeholder="exemple@gmail.com"/>
                </div>

                <div className="input_label">
                    <label for="">password</label>
                    <input type="email" placeholder="Mot de passe"/>
                </div>

                <div className="send">
                    <button>
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