// REACT
import React, { useState, useEffect } from 'react'

// COLOR
// @ts-ignore
import { hexToCSSFilter } from 'hex-to-css-filter'

// ASSETS
import BikeAnim from 'Assets/bike.gif'

// ESTILOS
import Styles from './Bike.module.scss'

interface BikeProps {
	userName: string | undefined
	userPic: string | undefined
	stopAnim?: boolean
	color: string
}

const Bike: React.FC<BikeProps> = (props: BikeProps) => {
	// FILTRO
	const [filter, setFilter] = useState<string>('')

	// RECORRIDO
	const [cLength, setCLength] = useState<number>(0)

	// AGREGAR FILTRO
	useEffect(() => {
		setFilter(hexToCSSFilter(props.color))
	}, [props.color])

	// ANIMAR
	useEffect(() => {
		// INTERVALO
		let interval: ReturnType<typeof setTimeout> | null = null

		// DETENER ANIMACIÓN
		if (!props.stopAnim) {
			interval = setInterval(() => {
				setCLength(Math.floor(Math.random() * 30))
			}, Math.floor(Math.random() * (2500 - 1000) + 1000))
		} else if (interval) clearInterval(interval)

		// LIMPIAR
		return () => {
			if (interval) clearInterval(interval)
		}
	}, [props.stopAnim])

	return (
		<div className={Styles.container} style={{ transform: `translateX(-${cLength}%)` }}>
			<img src={props.userPic || ''} alt={props.userName} />
			{/* 
            //@ts-ignore */}
			<img src={BikeAnim} alt='' style={{ filter: filter?.filter?.slice(0, -1) }} />
			<img src={BikeAnim} alt='Cover' className={Styles.cover} />
			<span style={{ background: props.color }} />
		</div>
	)
}

// DEF PROPS
Bike.defaultProps = {
	stopAnim: false,
}

export default Bike
