// REACT
import React from 'react'

// ROUTER
import { RouteComponentProps } from 'react-router-dom'

// VISTAS
import OfflineView from 'Views/Offline/Offline'

const Online: React.FC<RouteComponentProps<{ disks: string }>> = (
	props: RouteComponentProps<{ disks: string }>
) => {
	return <OfflineView disks={props.match.params.disks} />
}

export default Online
