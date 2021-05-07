// REACT
import React, { useEffect, useRef } from 'react'

// HOOKS
import { useStrings } from 'Hooks/Context'

// ESTILOS
import Styles from './InstallButton.module.scss'

interface BeforeInstallPromptEvent extends Event {
	readonly platforms: Array<string>
	readonly userChoice: Promise<{
		outcome: 'accepted' | 'dismissed'
		platform: string
	}>
	prompt(): Promise<void>
}

const InstallButton = () => {
	// STRINGS
	const lang = useStrings()

	// REFERENCIAS
	const deferredPrompt: React.MutableRefObject<BeforeInstallPromptEvent | null> = useRef(null)

	// INSTALACIÓN MANUAL
	const installApp = async () => {
		if (deferredPrompt.current) deferredPrompt.current.prompt()
		deferredPrompt.current = null
	}

	// EVITAR INSTALACIÓN AUTOMÁTICA
	useEffect(() => {
		// @ts-ignore
		window.addEventListener('beforeinstallprompt', (evt: BeforeInstallPromptEvent) => {
			evt.preventDefault()
			deferredPrompt.current = evt
		})
	}, [])

	return (
		<button
			type='button'
			style={
				window.matchMedia('(display-mode: standalone)').matches ? { display: 'none' } : undefined
			}
			className={Styles.button}
			onClick={installApp}>
			<span className='material-icons-two-tone'>security_update</span>
			<span>{lang.home.install}</span>
		</button>
	)
}

export default InstallButton
