// REACT
import React, { useEffect } from 'react'

// COMPONENTES
import InstallButton from 'Components/InstallButton/InstallButton'
import LogoutButton from 'Components/LogoutButton/LogoutButton'
import loginAlert from 'Components/LoginAlert/LoginAlert'
import HomeButton from 'Components/HomeButton/HomeButton'
import createGame from 'Components/Game/Game'

// HOOKS
import { useCamera, useRenderer, useScene, useStrings, useUser } from 'Hooks/Context'

// ESTILOS
import Styles from './Offline.module.scss'

// PROPIEDADES
interface OfflineViewProps {
	disks: string
}

let firstInstance: boolean = true
const OfflineView: React.FC<OfflineViewProps> = (props: OfflineViewProps) => {
	// STRING
	const lang = useStrings()

	// USUARIO
	const user = useUser()

	// CÁMARA
	const camera = useCamera()

	// ESCENA
	const scene = useScene()

	// RENDER
	const renderer = useRenderer()

	// ALERTA DE INICIO
	useEffect(() => {
		if (!user) loginAlert(lang)
		else window.hideAlert()
	}, [user])

	// CARGAR JUEGO
	const userName = user?.name
	useEffect(() => {
		if (firstInstance && camera && scene && renderer && userName) {
			createGame(userName.split(' ')[0], +props.disks, camera, scene, renderer, undefined, true)
			firstInstance = false
		}
	}, [userName, props.disks, camera, scene, renderer, firstInstance])

	return (
		<div>
			<HomeButton promptToExit />
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

export default OfflineView
