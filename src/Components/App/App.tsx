// REACT
import React from 'react'

// ROUTER
import { BrowserRouter } from 'react-router-dom'

// PROVIDERS
import withAlerts from '@weareluastudio/lualert'
import MainProvider from 'Providers/Main'

// RUTAS
import Router from 'Router/Router'

// PROVIDERS
import SceneProvider from 'Providers/Scene'
import AuthProvider from 'Providers/Auth'

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<MainProvider>
				<SceneProvider>
					<AuthProvider>
						<Router />
					</AuthProvider>
				</SceneProvider>
			</MainProvider>
		</BrowserRouter>
	)
}

export default withAlerts(App, {
	confirmText: 'Aceptar',
	cancelText: 'Cancelar',
	confirmColor: '#03A9F4',
	zIndex: 5002,
})
