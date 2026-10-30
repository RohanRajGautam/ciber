import React from 'react'

import Hero from './components/Hero'
import { Header } from './components/Header'
import HowItWorks from './components/HowItWorks'
import HomeDetails from './components/HomeDetails'
import Footer from './components/Footer'
// import ToggleModal from './components/ToggleModal'

function Home() {
	// const [showDialog, setShowDialog] = useState(false)

	return (
		<div className=''>
			<div className='bg-white relative'>
				<Header />
				<Hero />
				{/* {showDialog && (
					<ToggleModal showDialog={showDialog} setShowDialog={setShowDialog} />
				)} */}
			</div>
			<HowItWorks />
			<HomeDetails />
			<Footer />
		</div>
	)
}

export default Home
