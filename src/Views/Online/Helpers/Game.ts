import getCollection from 'Utils/DB'

// LEER JUEGO
const readOnlineGame = async (
	id: string,
	setOnlineGame: React.Dispatch<React.SetStateAction<OnlineGame | null>>
) => {
	const collection = await getCollection('games')
	const doc = collection.doc(id)

	// SNAP
	return doc.onSnapshot((snap) => {
		const data = snap.data() as OnlineGame
		setOnlineGame(data)
	})
}

// REINICIAR JUEGO
export const restartGame = async (id: string) => {
	const collection = await getCollection('games')
	const doc = collection.doc(id)

	doc.set({ users: [] }, { merge: true })
}

export default readOnlineGame
