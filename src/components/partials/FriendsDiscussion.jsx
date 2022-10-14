import "../../public/css/partials/_friendsDiscussion.css" 
import {IoSearch} from "react-icons/io5"
import Discussions from "../pieces/discussion_piece"

function FriendsDiscussion()
{
    let table = [1, 0, 1]

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
                table.map((element) => [
                    <Discussions status={element}/>
                ])
            }
        </div>
    </div>

    return component
}

export default FriendsDiscussion