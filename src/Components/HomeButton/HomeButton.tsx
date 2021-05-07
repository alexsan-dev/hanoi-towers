// REACT
import React from 'react'

// ASSETS
import Logo from 'Assets/logo.png'

// HOOKS
import { useStrings } from 'Hooks/Context'

// ESTILOS
import Styles from './HomeButton.module.scss'

// PROPIEDADES
interface HomeButtonProps {
	promptToExit?: boolean
}

const HomeButton: React.FC<HomeButtonProps> = (props: HomeButtonProps) => {
	// STRINGS
	const lang = useStrings()

	// REGRESAR
	const backToHome = () => {
		if (props.promptToExit)
			window.Alert({
				...lang.homeButton,
				type: 'confirm',
				onConfirm: () => {
					window.location.href = '/'
				},
			})
		else window.location.href = '/'
	}

	return (
		<button onClick={backToHome} className={Styles.home} type='button'>
			<img src={Logo} alt='logo' className={Styles.logo} />
		</button>
	)
}

HomeButton.defaultProps = {
	promptToExit: false,
}

export default HomeButton
