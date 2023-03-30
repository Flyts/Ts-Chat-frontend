import {Routes, Route, Navigate} from "react-router-dom"
import {dataContext} from "../../data/context"
import {route} from "../../data/web"
import Login from "../pages/login.jsx"
import Register from "../pages/register.jsx"
import "../../public/css/utilities/colors.css"
import {useState, useEffect} from "react"
import Discussion from "../pages/discussion.jsx"
import EditAccount from "./editAccount"
import Communaute from "./Communaute"

function App() 
{
	const [userLogin, setUserLogin] = useState(null),
		  [token, setToken]         = useState(""),
		  [conversationSelected, setConversationSelected] = useState(null),
		  [idFriendSelected, setIdFriendSelected] = useState(""),
          [friends, setFriends] = useState([]),
		  [loader, setLoader] = useState(false),
		  [dataNotification, setDataNotification] = useState({
			status: false
		  }),
		  [loading, setLoading] = useState(true);

	useEffect(() =>
	{
		const storage = JSON.parse(localStorage.getItem("userLogin"))
		setUserLogin(storage)
		
		setConversationSelected(JSON.parse(localStorage.getItem("conversationSelected")))
		setIdFriendSelected(localStorage.getItem("idFriendSelected"))
		setFriends(JSON.parse(localStorage.getItem("friends")))
	}, [])

	useEffect(() => 
	{
		if(!token)
		{
			const token = localStorage.getItem("token")
			
			setToken(token)
		}
		setLoading(false)
	}, [])

	const component = 
	loading 
	? 
		null 
	:
		<dataContext.Provider value={{
			userLogin, setUserLogin, 
			token, setToken, 
			conversationSelected, setConversationSelected,
			idFriendSelected, setIdFriendSelected,
			friends, setFriends,
			dataNotification, setDataNotification,
			loader, setLoader
		}}>
			<Routes>
				<Route 
					path={route.discussion.link}
					element={
						token ? (
							<Discussion />
						) : (
							<Navigate replace to={route.login.link}/>
						)
					}
				/>

				<Route 
					exact={true}
					path={route.editAccount.link}
					element={
						token ? (
							<EditAccount />
						) : (
							<Navigate replace to={route.login.link}/>
						)
					}
				/>

				<Route 
					exact={true}
					path={route.communaute.link}
					element={
						token ? (
							<Communaute />
						) : (
							<Navigate replace to={route.login.link}/>
						)
					}
				/>
				
				<Route 
					path={route.login.link}
					element={
						!token ? (
							<Login />
						) : (
							<Navigate replace to={route.discussion.link} />
						)
					}
				/>

				<Route 
					path={route.register.link}
					element={
						!token ? (
							<Register />
						) : (
							<Navigate replace to={route.discussion.link} />
						)
					}
				/>
			</Routes>
		</dataContext.Provider>

	return component
}

export default App

