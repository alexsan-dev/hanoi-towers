// RESOLVER CON RECURSION

const solveTowers = (
	source: string,
	destination: string,
	extra: string,
	n: number,
	stack: StackDisk[],
	colors: string[]
) => {
	if (n <= 0) return
	solveTowers(source, extra, destination, n - 1, stack, colors)
	stack.push({
		n,
		color: colors[n - 1],
		towerTo: destination,
		towerFrom: source,
	})
	solveTowers(extra, destination, source, n - 1, stack, colors)
}

export default solveTowers
