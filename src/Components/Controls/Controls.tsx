import React from 'react'

// ASSETS
import Arrows from 'Assets/arrows.png'

// HOOKS
import { useStrings } from 'Hooks/Context'

// ESTILOS
import Styles from './Controls.module.scss'

interface ControlsProps {
	opacity?: number
}

const Controls: React.FC<ControlsProps> = (props: ControlsProps) => {
	// STRINGS
	const lang = useStrings()

	return (
		<div className={Styles.container} style={{ opacity: `${props.opacity}` }}>
			<p>
				{lang.controls}
				<span>{lang.controlsSub}</span>
			</p>
			<img src={Arrows} alt='Arrows' />
		</div>
	)
}

Controls.defaultProps = {
	opacity: 0.6,
}

export default Controls
