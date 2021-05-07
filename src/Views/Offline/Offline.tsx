// REACT
import React, { useEffect, useState } from 'react'

// COMPONENTES
import RecommendedMovements from 'Components/RecommendedMovements/RecommendedMovements'
import InstallButton from 'Components/InstallButton/InstallButton'
import LogoutButton from 'Components/LogoutButton/LogoutButton'
import loginAlert from 'Components/LoginAlert/LoginAlert'
import HomeButton from 'Components/HomeButton/HomeButton'
import Controls from 'Components/Controls/Controls'
import TimerView from 'Components/Timer/Timer'
import createGame from 'Components/Game/Game'

// HOOKS
import { useCamera, useRenderer, useScene, useStrings, useUser } from 'Hooks/Context'
import useTimer from 'Views/Online/Hooks/Timer'

// ESTILOS
import Styles from './Offline.module.scss'

// PROPIEDADES
interface OfflineViewProps {
	disks: string
}

let firstInstance: boolean = true
const OfflineView: React.FC<OfflineViewProps> = (props: OfflineViewProps) => {
	// INICIAR JUEGO
	const [startGame, setStartGame] = useState<boolean>(false)
	const [pauseGame, setPauseGame] = useState<boolean>(false)

	// TEMPORIZADOR
	const [timer, setTimer] = useState<Timer>({
		minutes: 0,
		seconds: 0,
	})

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

	// DISCOS
	const limitedDisks: number = Math.min(7, +props.disks)

	// ALERTA DE INICIO
	useEffect(() => {
		if (!user) loginAlert(lang)
		else {
			window.Alert({
				...lang.startGame,
				type: 'confirm',
				onConfirm: () => {
					setStartGame(true)
				},
				cancelBtn: <></>,
			})
		}
	}, [user])

	// CARGAR JUEGO
	const userName = user?.name
	useEffect(() => {
		if (firstInstance && camera && scene && renderer && userName) {
			createGame(
				userName.split(' ')[0],
				limitedDisks,
				camera,
				scene,
				renderer,
				() => {
					setPauseGame(true)
				},
				true
			)
			firstInstance = false
		}
	}, [userName, props.disks, camera, scene, renderer, firstInstance])

	// TIMER
	useTimer(startGame && !pauseGame, setTimer)

	return (
		<div>
			<HomeButton promptToExit />
			<TimerView startGame={startGame} timer={timer} />
			<Controls />
			<div className={Styles.header}>
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
			</div>
			<RecommendedMovements disks={limitedDisks} />
			<LogoutButton blockLogout />
			<InstallButton />
		</div>
	)
}

export default OfflineView
