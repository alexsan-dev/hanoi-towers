import React from 'react'
import { Es } from 'Env/Strings'

// ROUTER
import * as H from 'history'

// COMPONENTES
import TextField from 'Components/TextField/TextField'

// HELPERS
import createOnlineGame from 'Utils/Games'

// MENU DE CREAR PARTIDA
const createGameMenu = (lang: Es, history: H.History<H.LocationState>, uid: string) => {
	let disks: number = 0
	let title: string = ''
	const saveDisk = (value: string) => {
		disks = Math.min(7, +value)
	}
	const saveTitle = (value: string) => {
		title = value
	}

	// MENU
	const inputs = (
		<div style={{ marginTop: '17px' }}>
			<TextField
				Icon={<span className='material-icons-two-tone'>subtitles</span>}
				type='text'
				onChange={saveTitle}
				helper={lang.promptFields.titleHelp}
				focusColor='#2196F3'
				color='#333'
				label={lang.promptFields.title}
			/>
			<div style={{ marginTop: '12px' }}>
				<TextField
					Icon={<span className='material-icons-two-tone'>album</span>}
					type='number'
					onChange={saveDisk}
					helper={lang.promptFields.diskHelp}
					focusColor='#2196F3'
					color='#333'
					label={lang.promptFields.disk}
				/>
			</div>
		</div>
	)

	// ALERTA
	window.Alert({
		...lang.initPrompt,
		type: 'confirm',
		customElements: inputs,
		confirmText: lang.welcomeBtns.create,
		onConfirm: () =>
			createOnlineGame(title.trim(), disks, uid).then((id: string) => history.push(`/${id}`)),
	})
}

export default createGameMenu
