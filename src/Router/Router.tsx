// REACT
import React from 'react'

// ROUTER
import { Switch, Route } from 'react-router-dom'

// PAGINAS
import Index from 'Pages/Index/Index'
import Online from 'Pages/Online/Online'

// RUTAS
import ROUTES from 'Env/Routes'

const Router = () => {
	return (
		<Switch>
			<Route exact path={ROUTES.index} component={Index} />
			<Route exact path={ROUTES.onlineGame} component={Online} />
		</Switch>
	)
}

export default Router
