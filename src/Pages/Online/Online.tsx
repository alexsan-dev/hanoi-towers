// REACT
import React from 'react'

// ROUTER
import { RouteComponentProps } from 'react-router-dom'

// VISTAS
import OnlineView from 'Views/Online/Online'

const Online: React.FC<RouteComponentProps<{ id: string }>> = (
	props: RouteComponentProps<{ id: string }>
) => {
	return <OnlineView id={props.match.params.id} />
}

export default Online
