// REACT
import React, { ComponentProps, useCallback, useState } from 'react'

// CONTEXT
import AuthContext from 'Context/Auth'

// HOOKS
import { getUser } from 'Utils/Auth'
import useAuth from 'Hooks/Auth'

const AuthProvider = ({ children }: ComponentProps<'div'>): JSX.Element => {
	// ESTADO
	const [user, setUser] = useState<User | null>(null)

	// HOOKS
	useAuth(
		useCallback((fireUser: firebase.default.User | null) => {
			if (fireUser) getUser(fireUser.uid).then(setUser)
			else setUser(null)
		}, [])
	)

	return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

export default AuthProvider
