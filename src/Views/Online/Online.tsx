// REACT
import React, { useState } from 'react'

// COMPONENTES
import HomeButton from 'Components/HomeButton/HomeButton'
import Bike from 'Components/Bike/Bike'

// HOOKS
import { useCamera, useScene, useRenderer, useUser, useStrings } from 'Hooks/Context'
import useOnlineGame, { useGameLoader, useStartGame } from './Hooks/Game'
import useSetActiveUser from './Hooks/User'
import useTimer from './Hooks/Timer'

// HELPERS
import colors from './Helpers/Colors'
import { setFinishGame } from './Helpers/User'

// ESTILOS
import Styles from './Online.module.scss'

// PROPIEDADES
interface OnlineViewProps {
	id: string
}

const OnlineView: React.FC<OnlineViewProps> = (props: OnlineViewProps) => {
	// JUEGO
	const [onlineGame, setOnlineGame] = useState<OnlineGame | null>(null)

	// INICIAR JUEGO
	const [startGame, setStartGame] = useState<boolean>(false)
	const [pauseGame, setPauseGame] = useState<boolean>(false)

	// TEMPORIZADOR
	const [timer, setTimer] = useState<Timer>({
		minutes: 0,
		seconds: 0,
	})

	// USUARIO
	const user = useUser()

	// STRINGS
	const lang = useStrings()

	// CÁMARA
	const camera = useCamera()

	// ESCENA
	const scene = useScene()

	// RENDER
	const renderer = useRenderer()

	// NOMBRE CORTO
	const name: string | undefined = user ? user.name.split(' ')[0] : undefined

	// CARGAR JUEGO
	useGameLoader(name, onlineGame, camera, scene, renderer, () => {
		setPauseGame(true)
		setTimer((prevTimer: Timer) => {
			setFinishGame(user, props.id, prevTimer)
			return prevTimer
		})
	})

	// CARGAR
	useOnlineGame(props.id, setOnlineGame)

	// ALERTA DE INICIO
	useStartGame(user, onlineGame, lang, setStartGame, props.id)

	// CARGAR USUARIO
	useSetActiveUser(user, props.id)

	// TIMER
	useTimer(startGame && !pauseGame, setTimer)

	return (
		<div>
			<HomeButton promptToExit />
			<h1 className={Styles.title}>
				{onlineGame?.title}
				<p className={Styles.desc}>ID: {props.id}</p>
			</h1>
			{startGame && (
				<div className={Styles.timer}>
					<strong>{timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes}</strong>:
					<strong>{timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}</strong>
				</div>
			)}
			{startGame &&
				onlineGame?.users.map((gUser, index: number) => (
					<Bike
						userPic={gUser.picture || undefined}
						userName={gUser.name}
						color={colors[index]}
						stopAnim={gUser.end}
						key={gUser.uid}
					/>
				))}
		</div>
	)
}

export default OnlineView
