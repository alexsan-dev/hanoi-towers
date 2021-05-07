// REACT
import React from 'react'

// HOOKS
import { useUser, useStrings } from 'Hooks/Context'

// LOGOUT
import { logout } from 'Utils/Auth'

// ESTILOS
import Styles from './LogoutButton.module.scss'

// PROPIEDADES
interface LogoutButtonProps {
	blockLogout?: boolean
}

const LogoutButton: React.FC<LogoutButtonProps> = (props: LogoutButtonProps) => {
	// USUARIO
	const user = useUser()

	// STRINGS
	const lang = useStrings()

	return (
		<div>
			{user !== null && (
				<button
					type='button'
					onClick={props.blockLogout ? undefined : logout}
					className={Styles.logoutBtn}>
					<img src={user?.picture || ''} alt='User' />
					<strong>
						{!props.blockLogout && <span className='material-icons-two-tone'>door_back</span>}
						{props.blockLogout
							? `${user.name.split(' ')[0]} ${user.name.split(' ')[2]}`
							: lang.logout}
					</strong>
				</button>
			)}
		</div>
	)
}

LogoutButton.defaultProps = {
	blockLogout: false,
}

export default LogoutButton
