import React, { useEffect } from 'react'
import { Es } from 'Env/Strings'

// ROUTER
import * as H from 'history'

// COMPONENTES
import loginAlert from 'Components/LoginAlert/LoginAlert'
import createOfflineGame from '../Components/CreateOfflineGame'
import createJoinMenu from '../Components/CreateJoinMenu'
import createGameMenu from '../Components/CreateMenu'

// ESTILOS
import welcomeBtnSpan, { welcomeBtnsContainer, welcomeBtn } from '../Styles/Main'

// INICIAR JUEGO
const useGame = (user: User | null, lang: Es, history: H.History<H.LocationState>) => {
	// JUEGO
	useEffect(() => {
		if (user) {
			// GUARDAR NOMBRE
			const name: string = user.name.split(' ')[0]

			// ALERTA DE INICIO
			window.Alert({
				...lang.welcome,
				title: lang.welcome.title.replace('{{name}}', name),
				type: 'window',
				fixed: true,
				customElements: (
					<div style={welcomeBtnsContainer}>
						<button
							type='button'
							onClick={() => createGameMenu(lang, history, user.uid)}
							style={welcomeBtn}>
							<span style={welcomeBtnSpan} className='material-icons-two-tone'>
								add_circle
							</span>
							{lang.welcomeBtns.create}
						</button>
						<button
							type='button'
							onClick={() => createJoinMenu(lang, history)}
							style={{ ...welcomeBtn, backgroundColor: '#0288D1' }}>
							<span style={welcomeBtnSpan} className='material-icons-two-tone'>
								group_add
							</span>
							{lang.welcomeBtns.join}
						</button>
						<button
							type='button'
							onClick={() => createOfflineGame(lang, history)}
							style={{ ...welcomeBtn, backgroundColor: '#4CAF50' }}>
							<span style={welcomeBtnSpan} className='material-icons-two-tone'>
								cloud_off
							</span>
							{lang.welcomeBtns.offline}
						</button>
					</div>
				),
				cancelBtn: <></>,
			})
		} else loginAlert(lang)
	}, [user, history])
}

export default useGame
