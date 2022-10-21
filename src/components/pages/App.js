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
		  [userSelected, setUserSelected] = useState(null),
		  [messageFriend, setMessageFriend] = useState([])

	useEffect(() =>
	{
		const storage = JSON.parse(localStorage.getItem("userLogin"))
		setUserLogin(storage)

		setUserSelected(JSON.parse(localStorage.getItem("userSelected")))
		setMessageFriend(JSON.parse(localStorage.getItem("messageFriend")))
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
		userSelected, setUserSelected,
		messageFriend, setMessageFriend
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

