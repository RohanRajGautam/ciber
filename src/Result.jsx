import React from 'react'
import useStore from './store'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Footer from './components/Footer'
import { useNavigate } from 'react-router-dom'
import ResultBody from './components/ResultBody'
import ResultHeader from './components/ResultHeader'

const Result = () => {
	let navigate = useNavigate()
	const getScanResult = useStore((state) => state.template)

	const notify = () => toast.error('Request failed! Please try again.')

	useEffect(() => {
		if (!getScanResult[0].results) {
			navigate('/')
			notify()
		}
	}, [getScanResult, navigate])

	return (
		<div className='bg-[#F8FAFB]'>
			<ResultHeader data={getScanResult[0]} />
			<ResultBody data={getScanResult[0]} />
			<Footer />
		</div>
	)
}

export default Result
