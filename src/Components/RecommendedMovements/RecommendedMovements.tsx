// REACT
import React, { useEffect, useState } from 'react'

// TOOLS
import diskColors from 'Utils/Colors'
import solveTowers from 'Utils/Solve'

// ESTILOS
import Styles from './RecommendedMovements.module.scss'

interface StackDiskID extends StackDisk {
	id: number
}
interface RecommendedMovementsProps {
	disks: number
}
const RecommendedMovements: React.FC<RecommendedMovementsProps> = (
	props: RecommendedMovementsProps
) => {
	// MOVIMIENTOS
	const [movements, setMovements] = useState<StackDiskID[]>([])

	// RESOLVER
	useEffect(() => {
		// PILA DE MOVIMIENTOS
		const stackDisks: StackDisk[] = []

		// ALGORITMO RECURSIVO
		solveTowers(
			'Torre 01',
			'Torre 02',
			'Torre 03',
			props.disks,
			stackDisks,
			[...diskColors].slice(0, props.disks).reverse()
		)

		// MOSTRAR
		setMovements(stackDisks.map((stackDisk: StackDisk, id: number) => ({ ...stackDisk, id })))
	}, [props.disks])

	return (
		<ul className={Styles.container}>
			{movements.map((stackDisk: StackDiskID) => (
				<li key={stackDisk.id}>
					<strong style={{ background: stackDisk.color }}>{`Disco ${stackDisk.n}`}</strong>
					<span>
						de <strong>{stackDisk.towerFrom}</strong> a <strong>{stackDisk.towerTo}</strong>
					</span>
				</li>
			))}
		</ul>
	)
}

export default RecommendedMovements
