import React from 'react'
import { Es } from 'Env/Strings'

// ROUTER
import * as H from 'history'

// COMPONENTES
import TextField from 'Components/TextField/TextField'

// MENU DE CREAR PARTIDA
const createJoinMenu = (lang: Es, history: H.History<H.LocationState>) => {
	let id: string = ''
	const saveID = (value: string) => {
		id = value
	}

	// MENU
	const inputs = (
		<div style={{ marginTop: '17px' }}>
			<TextField
				Icon={<span className='material-icons-two-tone'>phonelink_ring</span>}
				type='text'
				onChange={saveID}
				helper={lang.promptFields.linkHelp}
				focusColor='#2196F3'
				color='#333'
				label={lang.promptFields.link}
			/>
		</div>
	)

	// ALERTA
	window.Alert({
		...lang.joinPrompt,
		type: 'confirm',
		customElements: inputs,
		confirmText: lang.welcomeBtns.join,
		onConfirm: () => history.push(`/${id.trim()}`),
	})
}

export default createJoinMenu
