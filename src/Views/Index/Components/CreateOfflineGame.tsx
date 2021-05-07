import React from 'react'
import { Es } from 'Env/Strings'

// ROUTER
import * as H from 'history'

// COMPONENTES
import TextField from 'Components/TextField/TextField'

// MENU DE CREAR PARTIDA
const createOfflineGame = (lang: Es, history: H.History<H.LocationState>) => {
	let disks: number = 0
	const saveDisk = (value: string) => {
		disks = Math.min(7, +value)
	}

	// MENU
	const inputs = (
		<div style={{ marginTop: '17px' }}>
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
		...lang.offlinePrompt,
		type: 'confirm',
		customElements: inputs,
		cancelBtn: <></>,
		confirmText: lang.welcomeBtns.create,
		onConfirm: () => history.push(`/offline/${disks}`),
	})
}

export default createOfflineGame
