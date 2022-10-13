import {Routes, Route, Navigate} from "react-router-dom"
import {dataContext} from "../../data/context"
import {route} from "../../data/web"
import Dashboard from "../pages/dashboard.jsx"
import Login from "../pages/login.jsx"
import Register from "../pages/register.jsx"
import "../../public/css/utilities/colors.css"

function App() {
	const component = 
	<dataContext.Provider value={{}}>
		<Routes>
			<Route 
				path={route.dashboard.link}
				element={<Dashboard />}
			/>

			<Route 
				path={route.login.link}
				element={<Login />}
			/>

			<Route 
				path={route.register.link}
				element={<Register />}
			/>
		</Routes>
	</dataContext.Provider>

	return component
}

export default App;
