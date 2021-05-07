// ESTILOS
export const welcomeBtnsContainer: React.CSSProperties = {
	display: 'grid',
	gridTemplateColumns: 'auto auto auto',
	gridTemplateRows: 'auto',
	gridColumnGap: '10px',
	width: 'max-content',
	justifyContent: 'center',
	alignItems: 'center',
	margin: '0 auto',
	marginTop: '15px',
}
export const welcomeBtn: React.CSSProperties = {
	appearance: 'none',
	border: 'none',
	outline: 'none',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	color: '#fff',
	background: '#03A9F4',
	fontSize: '1.4em',
	fontWeight: 'bold',
	width: '110px',
	height: '100px',
	borderRadius: '10px',
	cursor: 'pointer',
}

const welcomeBtnSpan: React.CSSProperties = {
	fontSize: '1.2em',
	filter: 'invert(100%)',
}

export default welcomeBtnSpan
