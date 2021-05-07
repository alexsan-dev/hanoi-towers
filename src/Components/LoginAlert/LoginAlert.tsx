import React from 'react'
import { Es } from 'Env/Strings'
import { googleSigning } from 'Utils/Auth'

const loginAlert = (lang: Es) => {
	window.Alert({
		...lang.login,
		type: 'window',
		fixed: true,
		customElements: (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					marginTop: '20px',
				}}>
				<button
					type='button'
					onClick={() => googleSigning()}
					style={{
						display: 'flex',
						alignItems: 'center',
						backgroundColor: '#03A9F4',
						color: '#fff',
						cursor: 'pointer',
						fontWeight: 'bold',
						appearance: 'none',
						border: 'none',
						outline: 'none',
						fontSize: '1.2em',
						padding: '10px 15px',
						borderRadius: '8px',
						margin: '0 auto',
					}}>
					<span
						style={{ filter: 'invert(100%)', marginRight: '10px' }}
						className='material-icons-two-tone'>
						face
					</span>
					{lang.loginBtn}
				</button>
			</div>
		),
	})
}

export default loginAlert
