import { useEffect } from 'react'

// INICIAR CONTADOR
const useTimer = (startGame: boolean, setTime: React.Dispatch<React.SetStateAction<Timer>>) => {
	let interval: NodeJS.Timeout | null = null
	useEffect(() => {
		// CONTADOR
		let seconds: number = 0
		let minutes: number = 0

		// INTERVAL
		if (startGame)
			interval = setInterval(() => {
				if (startGame) {
					seconds++
					if (seconds >= 60) {
						minutes++
						seconds = 0
					}

					// ASIGNAR
					setTime({ minutes, seconds })
				}
			}, 1000)
		else if (interval) clearInterval(interval)

		// LIMPIAR
		return () => {
			if (interval) clearInterval(interval)
		}
	}, [startGame, setTime])
}

export default useTimer
