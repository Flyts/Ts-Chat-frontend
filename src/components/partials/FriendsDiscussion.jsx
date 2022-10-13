import "../../public/css/partials/_friendsDiscussion.css" 
import {IoSearch} from "react-icons/io5"

function FriendsDiscussion()
{
    const component = 
    <div id="Friends">
        <div className="Top">
            <div className="search">
                <IoSearch/>
                <input type="search" placeholder="Tapez votre recherche"/>
            </div>
        </div>

        <div className="Discussions">
            <div className="bloc">
                <div className="head">
                    <div className="avatar_name">
                        <div className="avatar"></div>
                        <div className="name_online">
                            <strong>Samy Tshibanda</strong>
                            <span>Online</span>
                        </div>
                    </div>

                    <div className="send_time">
                        <span>3h ago</span>
                    </div>
                </div>

                <div className="body">
                    <div className="message">
                        <span>bla bla bla bla bla bla bla bla bla bla bla...</span>
                    </div>

                    <div className="number">
                        <i>2</i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    return component
}

export default FriendsDiscussion