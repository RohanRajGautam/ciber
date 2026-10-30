import React from 'react'
import RoutesTree from './RoutesTree'
import { ToastContainer } from 'react-toastify'

import './App.css'
import 'react-toastify/dist/ReactToastify.css'

function App() {
	return (
		<div>
			<ToastContainer
				position='bottom-center'
				autoClose={5000}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<RoutesTree />
		</div>
	)
}

export default App
