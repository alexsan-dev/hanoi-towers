// REACT
import React from 'react'

// COMPONENTES
import InstallButton from 'Components/InstallButton/InstallButton'
import LogoutButton from 'Components/LogoutButton/LogoutButton'

// HOOKS
import { useStrings, useUser } from 'Hooks/Context'
import { useHistory } from 'react-router-dom'
import useGame from './Hooks/Game'

// ESTILOS
import Styles from './Index.module.scss'

const IndexView = () => {
	// USUARIO
	const user = useUser()

	// STRINGS
	const lang = useStrings()

	// HISTORY
	const history = useHistory()

	// JUEGO
	useGame(user, lang, history)

	return (
		<div>
			<h1 className={Styles.title}>{lang.home.title}</h1>
			<p className={Styles.description}>
				{lang.home.description},{' '}
				<a
					target='_blank'
					rel='noreferrer noopener'
					href='https://github.com/alexsan-dev'
					title='Github'>
					https://github.com/alexsan-dev
				</a>
			</p>
			<LogoutButton />
			<InstallButton />
		</div>
	)
}

export default IndexView
