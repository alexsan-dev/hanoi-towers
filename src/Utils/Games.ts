import getCollection from './DB'

// CREAR JUEGO EN DB
const createOnlineGame = async (title: string, disks: number, uid: string) => {
	// CREAR
	const collection = await getCollection('games')
	const doc = await collection.add({
		title,
		disks,
		creator: uid,
	})

	// ID
	return doc.id
}

export default createOnlineGame
