import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './Home'
import Scan from './Scan'
import Result from './Result'

const RoutesTree = () => {
	return (
		<div>
			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route exact path='/scan' element={<Scan />} />
				<Route exact path='/result' element={<Result />} />
			</Routes>
		</div>
	)
}

export default RoutesTree
