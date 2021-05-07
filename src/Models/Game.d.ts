interface OnlineGame {
	title: string
	disks: number
	creator: string
	users: {
		name: string
		uid: string
		picture: string | null
		end?: boolean
		time?: Timer
	}[]
}

interface Timer {
	seconds: number
	minutes: number
}

interface StackDisk {
	n: number
	color: string
	towerFrom: string
	towerTo: string
}
