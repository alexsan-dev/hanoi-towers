import { useEffect } from 'react'

// USUARIO
import setActiveUser, { setUnActiveUser } from '../Helpers/User'

// ACTIVAR USUARIO
const useSetActiveUser = (user: User | null, gameID: string) => {
	useEffect(() => {
		setActiveUser(user, gameID)

		return () => {
			setUnActiveUser(user, gameID)
		}
	}, [user, gameID])
}

export default useSetActiveUser
