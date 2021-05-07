// REACT
import React from 'react'
import ReactDOM from 'react-dom'

// ESTILOS
import './index.css'

// APP
import App from 'Components/App/App'

// SW
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'

// RENDER
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)

serviceWorkerRegistration.register()
reportWebVitals()
