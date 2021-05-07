import * as THREE from 'three'
import EventsControls from './Controls'

// CREAR JUEGO
const createGame = (
	name: string,
	countDisk: number,
	camera: THREE.Camera | null,
	scene: THREE.Scene | null,
	renderer: THREE.Renderer | null,
	onWin?: () => void
) => {
	if (camera && scene && renderer) {
		// GLOBALES
		const stacksDisk: number[][] = []
		const heightRod = 110
		const heightDisk = 14
		let numberDisk = 0
		let beganRod = 0
		let nextRod = 0

		// PLANO
		const heightPlane = 160
		const geometry = new THREE.PlaneBufferGeometry(80, heightPlane, 1, 1)
		const plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }))

		// AGREGAR
		if (scene) scene.add(plane)

		// CILINDROS
		const loader = new THREE.TextureLoader()

		const geometry1 = new THREE.CylinderGeometry(6, 6, heightRod, 36)
		const geometry2 = new THREE.CylinderGeometry(40, 40, heightDisk, 36)
		const material = new THREE.MeshPhongMaterial({
			map: loader.load('/assets/wood.jpg'),
		})

		// CREAR CILINDROS
		for (let i = 0; i < 3; i++) {
			// ARO
			const rod = new THREE.Mesh(geometry1, material)
			rod.position.set(-100 * (i - 1), 0, 0)

			// AGREGAR
			if (scene) scene.add(rod)

			// BASE
			const base = new THREE.Mesh(geometry2, material)
			base.position.set(-100 * (i - 1), -heightRod / 2 - heightDisk / 2, 0)

			// AGREGAR
			if (scene) scene.add(base)

			// CAMBIAR DISCO
			stacksDisk[i] = []
			stacksDisk[i].push(countDisk)
		}

		const diskColors = ['#F44336', '#FF4081', '#9C27B0', '#448AFF', '#009688', '#4CAF50', '#FFEB3B']

		for (let i = 0; i < countDisk; i++) {
			const geometryN = new THREE.TorusGeometry(36 - 4 * i, (heightDisk + 2) / 2, 36, 36)
			const materialN = new THREE.MeshPhongMaterial({
				color: new THREE.Color(diskColors[i]),
			})
			const disk = new THREE.Mesh(geometryN, materialN)
			disk.rotation.x = Math.PI / 2
			disk.name = `disk${String(countDisk - 1 - i)}`
			disk.position.set(-100, -heightRod / 2 + heightDisk / 2 + i * heightDisk, 0)
			if (scene) scene.add(disk)
			stacksDisk[0].push(countDisk - 1 - i)
		}

		const EventsControl = new EventsControls(camera, renderer?.domElement)
		EventsControl.map = plane
		EventsControl.attach(scene?.getObjectByName('disk0'))

		EventsControl.attachEvent('mouseOver', () => {
			EventsControl.container.style.cursor = 'pointer'
		})

		EventsControl.attachEvent('mouseOut', () => {
			EventsControl.container.style.cursor = 'auto'
		})

		EventsControl.attachEvent('dragAndDrop', () => {
			if (camera) {
				EventsControl.container.style.cursor = 'move'
				// eslint-disable-next-line no-underscore-dangle
				const vector = new THREE.Vector3(EventsControl._mouse.x, EventsControl._mouse.y, 1)
					.unproject(camera)
					// @ts-ignore
					.multiplyScalar(camera.position.z / (camera?.far || 1))

				if (EventsControl.focused.position.y > (heightRod + heightDisk) / 2) {
					plane.position.x = vector.x
				} else {
					if (EventsControl.focused.position.x > 50) {
						nextRod = 2
					} else if (EventsControl.focused.position.x < -50) {
						nextRod = 0
					} else {
						nextRod = 1
					}

					plane.position.x = 100 * (nextRod - 1)
					plane.position.y =
						(stacksDisk[nextRod].length - 1 / 2) * heightDisk - heightRod / 2 + heightPlane / 2
					EventsControl.focused.position.x = plane.position.x
				}
			}
		})

		EventsControl.attachEvent('mouseUp', () => {
			EventsControl.container.style.cursor = 'auto'
			if (
				EventsControl.focused.position.y <= (heightRod + heightDisk) / 2 &&
				nextRod !== beganRod
			) {
				if (stacksDisk[nextRod][stacksDisk[nextRod].length - 1] < numberDisk) {
					EventsControl.returnPrevious()
					stacksDisk[beganRod].push(numberDisk)
					return
				}

				EventsControl.focused.position.y =
					stacksDisk[nextRod].length * heightDisk - heightRod / 2 - heightDisk / 2
				plane.position.y = EventsControl.focused.position.y + heightPlane / 2
				stacksDisk[nextRod].push(numberDisk)

				const item = stacksDisk[beganRod][stacksDisk[beganRod].length - 1]
				if (item < countDisk) {
					EventsControl.attach(scene?.getObjectByName(`disk${String(item)}`))
				}

				const item2 = stacksDisk[nextRod][stacksDisk[nextRod].length - 2]
				if (item2 < countDisk) {
					EventsControl.detach(scene?.getObjectByName(`disk${String(item2)}`))
				}

				if (stacksDisk[nextRod].length === countDisk + 1 && nextRod !== 0) {
					EventsControl.enabled = false
					if (onWin) onWin()
					setTimeout(() => {
						window.Alert({
							title: `Felicitaciones ${name}`,
							onConfirm: () => window.location.reload(),
							body:
								'Has completado todo el juego satisfactoriamente!, espera a que todos los jugadores finalicen.',
							type: 'window',
							fixed: true,
						})
					}, 300)
				}
			} else {
				EventsControl.returnPrevious()
				stacksDisk[beganRod].push(numberDisk)
			}
		})

		EventsControl.attachEvent('onclick', () => {
			if (EventsControl.focused.position.x > 50) {
				beganRod = 2
			} else if (EventsControl.focused.position.x < -50) {
				beganRod = 0
			} else {
				beganRod = 1
			}

			numberDisk = stacksDisk[beganRod].pop() || 0
		})
	}

	function render() {
		if (scene && camera && renderer) renderer.render(scene, camera)
	}

	function animate() {
		requestAnimationFrame(animate)
		render()
	}

	animate()
}

export default createGame
