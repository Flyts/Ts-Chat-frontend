import "../../public/css/partials/_friendsDiscussion.css" 
import {IoSearch} from "react-icons/io5"
import Discussions from "../pieces/discussion_piece"
import axios from "axios"
import { useEffect, useContext, useState } from "react"
import { routeApi } from "../../data/webApi"
import { dataContext } from "../../data/context"

function FriendsDiscussion()
{
    const {userLogin} = useContext(dataContext),
          [friends, setFriends] = useState([])

    useEffect(() => 
    {
        axios.get(
            routeApi.getFriends+"/"+userLogin.id, 
            routeApi.configAuthHeader
        )
        .then((data)   => setFriends(data.data.users))
        .catch((error) => console.error(error))
    }, [])

    const component = 
    <div id="Friends">
        <div className="Top">
            <div className="search">
                <label className="icon" for="Search"><IoSearch/></label>
                <input type="search" name="search" id="Search" placeholder="Tapez votre recherche"/>
            </div>
        </div>

        <div className="Discussions">
            {
                friends.map((user) => [
                    <Discussions user={user} key={user._id}/>
                ])
            }
        </div>
    </div>

    return component
}

export default FriendsDiscussion