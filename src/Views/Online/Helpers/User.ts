import getCollection from 'Utils/DB'

// ACTIVAR
const setActiveUser = async (user: User | null, gameID: string) => {
	if (user) {
		// COLECCIÓN
		const collection = await getCollection('games')
		const doc = collection.doc(gameID)

		// DATOS
		const data = (await doc.get()).data() as OnlineGame
		const users = data.users || []
		const currentUser = users.find((dUser) => dUser.uid === user.uid)

		// VERIFICAR
		if (!currentUser)
			users.push({
				picture: user.picture,
				uid: user.uid,
				name: user.name,
			})

		// AGREGAR
		doc.set({ users }, { merge: true })
	}
}

export const setUnActiveUser = async (user: User | null, gameID: string) => {
	if (user) {
		// COLECCIÓN
		const collection = await getCollection('games')
		const doc = collection.doc(gameID)

		// DATOS
		const data = (await doc.get()).data() as OnlineGame
		let users = data.users || []
		const currentUser = users.find((dUser) => dUser.uid === user.uid)

		// VERIFICAR
		if (currentUser) users = users.filter((gUser) => gUser.uid !== currentUser.uid)

		// AGREGAR
		doc.set({ users }, { merge: true })
	}
}

export const setFinishGame = async (user: User | null, gameID: string, time: Timer) => {
	if (user) {
		// COLECCIÓN
		const collection = await getCollection('games')
		const doc = collection.doc(gameID)

		// DATOS
		const data = (await doc.get()).data() as OnlineGame
		let users = data.users || []
		const currentUser = users.find((dUser) => dUser.uid === user.uid)

		// VERIFICAR
		if (currentUser)
			users = users.map((mUser) => (mUser.uid === user.uid ? { ...mUser, end: true, time } : mUser))

		// AGREGAR
		doc.set({ users }, { merge: true })
	}
}

export default setActiveUser
