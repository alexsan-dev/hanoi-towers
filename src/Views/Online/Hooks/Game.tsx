import React, { useEffect } from 'react'

// ASSETS
import Winner from 'Assets/winner.gif'
import Profile from 'Assets/profile.png'

// COMPONENTES
import createGame from 'Components/Game/Game'
import loginAlert from 'Components/LoginAlert/LoginAlert'

// STRINGS
import { Es } from 'Env/Strings'

// HELPERS
import readOnlineGame, { restartGame } from '../Helpers/Game'

// LEER JUEGO
const useOnlineGame = (
	id: string,
	setOnlineGame: React.Dispatch<React.SetStateAction<OnlineGame | null>>
) => {
	useEffect(() => {
		// LEER
		let listener: (() => void) | null = null
		readOnlineGame(id, setOnlineGame).then((snapListener) => {
			listener = snapListener
		})

		// LIMPIAR
		return () => {
			if (listener) listener()
		}
	}, [id, setOnlineGame])
}

// CARGAR JUEGO
let firstInstance: boolean = true
export const useGameLoader = (
	name: string | undefined,
	onlineGame: OnlineGame | null,
	camera: THREE.Camera | null,
	scene: THREE.Scene | null,
	renderer: THREE.Renderer | null,
	onWin?: () => void
) => {
	useEffect(() => {
		if (onlineGame && name && firstInstance) {
			createGame(name, onlineGame.disks, camera, scene, renderer, onWin)
			firstInstance = false
		}
	}, [onlineGame, name, camera, scene, renderer, onWin])
}

// INICIAR
let firstInstanceStart: boolean = true
export const useStartGame = (
	user: User | null,
	onlineGame: OnlineGame | null,
	lang: Es,
	setStartGame: React.Dispatch<React.SetStateAction<boolean>>,
	gameID: string
) => {
	useEffect(() => {
		if (user) {
			// ALERTA DE INICIAR
			if (firstInstanceStart)
				window.Alert({
					...lang.startGame,
					type: 'confirm',
					onConfirm: () => {
						firstInstanceStart = false
						setStartGame(true)
					},
					cancelBtn: <></>,
				})

			if (onlineGame && onlineGame.users) {
				// USUARIO TERMINO PARTIDA
				const currentUser = onlineGame.users.find((oUser) => oUser.uid === user.uid)
				if (currentUser?.end)
					window.Alert({
						title: `Felicitaciones ${user.name.split(' ')[0]}`,
						onConfirm: () => window.location.reload(),
						body:
							'Has completado todo el juego satisfactoriamente!, espera a que todos los jugadores finalicen.',
						type: 'window',
						fixed: true,
					})

				// TODOS LOS USUARIOS TERMINARON
				if (onlineGame.users.every((oUser) => oUser.end)) {
					const orderedTimes = onlineGame.users.sort((oUser, nextUser) => {
						const firstTime = (oUser?.time?.minutes || 0) * 100 + (oUser?.time?.seconds || 0)
						const secondTime = (nextUser?.time?.minutes || 0) * 100 + (nextUser?.time?.seconds || 0)
						return firstTime - secondTime
					})

					if (orderedTimes.length > 0)
						setTimeout(() => {
							// ALERTA DE GANADORES
							window.Alert({
								title: '',
								body: '',
								type: onlineGame.creator === user.uid ? 'confirm' : 'window',
								confirmText: 'Reiniciar partida',
								cancelBtn: <></>,
								fixed: true,
								onConfirm: () =>
									restartGame(gameID).then(() => {
										window.location.reload()
									}),
								customElements: (
									<div
										style={{
											position: 'relative',
											display: 'flex',
											justifyContent: 'center',
										}}>
										<div
											style={{
												position: 'absolute',
												top: '65px',
											}}>
											<div
												style={{
													position: 'absolute',
													left: '-75px',
													top: '60px',
													display: 'flex',
													flexDirection: 'column',
													alignItems: 'center',
												}}>
												<p style={{ textTransform: 'capitalize' }}>
													{orderedTimes[1]
														? `${orderedTimes[1].name
																.split(' ')[0]
																.toLowerCase()} ${orderedTimes[1].name
																.split(' ')[2]
																?.toLowerCase()}`
														: ''}
												</p>
												<img
													style={{
														borderRadius: '100%',
														height: '70px',
														width: '70px',
														objectFit: 'cover',
													}}
													src={orderedTimes[1] ? orderedTimes[1].picture || Profile : Profile}
													alt='Second'
												/>
											</div>
											<div
												style={{
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													flexDirection: 'column',
													marginTop: '-70px',
												}}>
												<strong style={{ textTransform: 'capitalize', marginBottom: '10px' }}>
													{orderedTimes[0]
														? `${orderedTimes[0].name
																.split(' ')[0]
																.toLowerCase()} ${orderedTimes[0].name
																.split(' ')[2]
																?.toLowerCase()}`
														: ''}
												</strong>
												<img
													style={{ borderRadius: '100%', margin: '0px 10px', objectFit: 'cover' }}
													src={orderedTimes[0] ? orderedTimes[0].picture || Profile : Profile}
													alt='First'
												/>
											</div>
											<div
												style={{
													position: 'absolute',
													right: '-75px',
													top: '60px',
													display: 'flex',
													flexDirection: 'column',
													alignItems: 'center',
												}}>
												<p style={{ textTransform: 'capitalize' }}>
													{orderedTimes[2]
														? `${orderedTimes[2].name
																.split(' ')[0]
																.toLowerCase()} ${orderedTimes[2].name
																.split(' ')[2]
																?.toLowerCase()}`
														: ''}
												</p>
												<img
													style={{
														borderRadius: '100%',
														objectFit: 'cover',
														height: '70px',
														width: '70px',
													}}
													src={orderedTimes[2] ? orderedTimes[2].picture || Profile : Profile}
													alt='Third'
												/>
											</div>
										</div>
										<img src={Winner} alt='First Anim' />
									</div>
								),
							})
						}, 500)
				}
			}
		} else loginAlert(lang)
	}, [user, onlineGame])
}

export default useOnlineGame
