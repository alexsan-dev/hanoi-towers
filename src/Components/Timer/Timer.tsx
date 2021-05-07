import React from 'react'

// ESTILOS
import Styles from './Timer.module.scss'

interface TimerProps {
	startGame: boolean
	timer: Timer
}
const TimerView: React.FC<TimerProps> = (props: TimerProps) => {
	return (
		<>
			{props.startGame && (
				<div className={Styles.timer}>
					<strong>
						{props.timer.minutes < 10 ? `0${props.timer.minutes}` : props.timer.minutes}
					</strong>
					:
					<strong>
						{props.timer.seconds < 10 ? `0${props.timer.seconds}` : props.timer.seconds}
					</strong>
				</div>
			)}
		</>
	)
}

export default TimerView
