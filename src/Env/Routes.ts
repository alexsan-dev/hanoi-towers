interface RoutesProps {
	index: string
	offlineGame: string
	onlineGame: string
}

const ROUTES: RoutesProps = {
	index: '/',
	offlineGame: '/offline/:disks',
	onlineGame: '/:id',
}

export default ROUTES
