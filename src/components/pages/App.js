import {Routes, Route, Navigate} from "react-router-dom"
import {dataContext} from "../../data/context"
import {route} from "../../data/web"
import Dashboard from "../pages/dashboard.jsx"
import Login from "../pages/login.jsx"
import Register from "../pages/register.jsx"
import "../../public/css/utilities/colors.css"
import {useState, useEffect} from "react"

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
		  })

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
	}, [])

	const component = 
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
				path={route.dashboard.link}
				element={
					token ? (
						<Dashboard />
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
						<Navigate replace to={route.dashboard.link} />
					)
				}
			/>

			<Route 
				path={route.register.link}
				element={
					!token ? (
						<Register />
					) : (
						<Navigate replace to={route.dashboard.link} />
					)
				}
			/>
		</Routes>
	</dataContext.Provider>

	return component
}

export default App

