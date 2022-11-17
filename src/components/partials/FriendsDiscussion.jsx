import "../../public/css/partials/_friendsDiscussion.css" 
import {IoSearch} from "react-icons/io5"
import Discussions from "../pieces/discussion_piece"
import axios from "axios"
import { useEffect, useContext, useState } from "react"
import { routeApi } from "../../data/webApi"
import { dataContext } from "../../data/context"
import Loader from "../pieces/Loader"

function FriendsDiscussion()
{
    function handleSearchFriend(value)
    {
        if(value.length)
        {
            if(!allFriends) setAllFriends(friends)

            axios.get(
                routeApi.getSearchFriend, 
                {
                    params: {
                        search: value,
                        id: userLogin._id
                    }
                },
                routeApi.configAuthHeader
            )
            .then((res) => {
                setFriends(res.data.users)
                setText(res.data.message)
            })
            .catch((errors) => console.error(errors))
        }
        else
        {
            setFriends(allFriends)
            setAllFriends(null)
            setText(noUser)
        }
    }

    const {
        userLogin,
        friends, setFriends
    } = useContext(dataContext)
    
    const noUser = "Pas d'utilisateur"
    const [search, setSearch] = useState("")
    const [allFriends, setAllFriends] = useState(null)
    const [text, setText] = useState(noUser)

    useEffect(() => 
    {
        axios.get(
            routeApi.getFriends+"/"+userLogin._id, 
            routeApi.configAuthHeader
        )
        .then((res) => 
        {
            setFriends(res.data.users)
            localStorage.setItem("friends", JSON.stringify(res.data.users))
        })
        .catch((error) => console.error(error))
    }, [])

    const component = 
    <div id="Friends">
        <div className="Top">
            <div className="search">
                <label className="icon" htmlFor="Search"><IoSearch/></label>
                <input type="search" onChange={(e) => 
                {
                    setSearch(e.target.value)
                    handleSearchFriend(e.target.value)
                }} value={search} name="search" id="Search" placeholder="Tapez votre recherche"/>
            </div>
        </div>

        <div className="Discussions">
            {
                friends && friends.length?
                    friends.map((user) => [
                        <Discussions friend={user} key={user._id}/>
                    ])
                : 
                    <div className="aucun">
                        <h4>{text}</h4>
                    </div> 
            }
        </div>
    </div>

    return component
}

export default FriendsDiscussion