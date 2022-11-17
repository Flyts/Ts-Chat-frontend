import axios from "axios"
import { useContext, useRef, useState, useEffect } from "react"
import { BiImageAdd } from "react-icons/bi"
import { dataContext } from "../../data/context"
import { routeApi } from "../../data/webApi"
import "../../public/css/partials/_editInfo.css"
import Loader from "../pieces/Loader"

function EditInfo()
{
    const {
            userLogin, setUserLogin,
            setDataNotification
          } = useContext(dataContext)

    const [photoChoose, setPhotoChoose] = useState(""),
          [photoSelected, setPhotoSelected] = useState(""),
          [error, setError] = useState("jfkekzeb"),
          [errorBloc, setErrorBloc] = useState(false),
          [loaderChangeImg, setLoaderChangeImg] = useState(false),
          [loaderChangeInfo, setLoaderChangeInfo] = useState(false),
          [nom, setNom] = useState(userLogin.nom),
          [prenom, setPrenom] = useState(userLogin.prenom),
          [description, setDescription] = useState(userLogin.desciption)

    const modelImg  = useRef(),
          inputFile = useRef() 

    function HandleChooseImg()
    {
        inputFile.current.click()
    }

    function handleSendPhoto()
    {
        if(photoChoose.length !== 0)
        {   
            setLoaderChangeImg(true)

            axios.post(routeApi.editInfoUserImg,
                {
                    "photo": photoSelected,
                    "id": userLogin._id
                },
                routeApi.configAuthFormDataHeader
            )
            .then((res) => 
            {
                if(res.data.user)
                {
                    setUserLogin(res.data.user)
                    localStorage.setItem("userLogin", JSON.stringify(res.data.user))

                    setDataNotification({
                        status: true,
                        message: res.data.message,
                        success: true
                    })

                    setLoaderChangeImg(false)
                    setErrorBloc(false)
                }
            })
            .catch((error) => {
                setError(error.response.data.errors.message)
                setErrorBloc(true)
                setLoaderChangeImg(false)
            })
        }
    }

    function handleChangeInfoUser()
    {
        setLoaderChangeInfo(true)

        axios.post(routeApi.editInfoUserInfo,
            {
                id: userLogin._id,
                nom: nom,
                prenom: prenom,
                description: description
            },
            routeApi.configAuthFormDataHeader
        )
        .then((res) => 
        {
            if(res.data.user)
            {
                setUserLogin(res.data.user)
                localStorage.setItem("userLogin", JSON.stringify(res.data.user))

                setDataNotification({
                    status: true,
                    message: res.data.message,
                    success: true
                })

                setLoaderChangeInfo(false)
                setErrorBloc(false)
            }
        })
        .catch((error) => 
        {
            setError(error.response.data.errors)
            setErrorBloc(true)
            setLoaderChangeInfo(false)
        })
    }

    useEffect(() => 
    {
        if(photoChoose.length !== 0)
        {
            const reader = new FileReader()
    
            reader.onload = function(evt) 
            {
                const img = evt.target.result

                setPhotoSelected(img)
                modelImg.current.style.backgroundImage = "url("+ img +")"
            }
            reader.readAsDataURL(photoChoose[0])
        }
    }, [photoChoose])

    const component = 
    <div id="EditInfo">
        {
            errorBloc
            ?
                Array.isArray(error)
                ? 
                    <div className="Erros">
                    {
                        error.map((element) => 
                        [
                            <span>{element.msg}</span>
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


        <div className="Bloc">
            <div className="Img">
                <div className="model-img" style={{backgroundImage: `url(${userLogin.avatar})`}} ref={modelImg}></div>

                <div className="input">
                    <input type="file" onChange={(e) => setPhotoChoose(e.target.files)} ref={inputFile}/>

                    <button onClick={HandleChooseImg}>
                        <BiImageAdd className="icon" title="Selectionner une image"/>
                    </button>
                </div>

                <button onClick={handleSendPhoto} className="btn-change">Changer photo</button>

                {
                    loaderChangeImg ? <Loader/> : null
                }
            </div>

            <form>
                <div className="deux_input">
                    <div className="part">
                        <label htmlFor="Nom">Nom</label>
                        <input type="text" id="Nom" name="nom" placeholder="Tapez votre Nom" value={nom} onChange={(e) => setNom(e.target.value)}/>
                    </div>

                    <div className="part">
                        <label htmlFor="Prenom">Prénom</label>
                        <input type="text" id="Prenom" name="prenom" placeholder="Tapez votre Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)}/>
                    </div>
                </div>

                <div className="input_label">
                    <label htmlFor="Desciption">Desciption</label>
                    <textarea id="Desciption" name="decription" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                {/* <div className="input_label">
                    <input type="password" name="confirm-password" placeholder="Confirmer votre mot de passe"/>
                </div> */}

                <div className="send">
                    <button type="button" onClick={handleChangeInfoUser}>
                        Changer info
                    </button>
                </div>

                {
                    loaderChangeInfo ? <Loader/> : null
                }
            </form>
        </div>
    </div>

    return component
} 

export default EditInfo