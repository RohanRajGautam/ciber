import React, { useEffect } from 'react'
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Scan = () => {
	let navigate = useNavigate()

	const [loading, setLoading] = React.useState(false)
	const [template, setTemplate] = React.useState('')

	useEffect(() => {
		const getScanResult = () => {
			setLoading(true)

			const options = {
				url: `${
					process.env.REACT_APP_WEB_SERVICE_URL || 'http://localhost:5000'
				}/scan`,
				method: 'get',
				headers: {
					'Content-Type': 'text/html; charset=UTF-8',
				},
			}
			return axios(options)
				.then((res) => {
					console.log(res)
					setTemplate(res.data)
					setLoading(false)
				})
				.catch((error) => {
					console.log(error)
					navigate('/')
					setLoading(false)
				})
		}
		getScanResult()
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	let html = template

	return loading ? (
		<div className='fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center'>
			<div className='loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4'></div>
			<h2 className='text-center text-white text-xl font-semibold'>
				Scanning for vulnerabilities
			</h2>
			<p className='w-1/3 text-center text-white'>
				This may take a few minutes, please don't close this page.
			</p>
		</div>
	) : (
		<div className='scan-body'>
			<div className='console'>
				<div className='consolebody'>{ReactHtmlParser(html)}</div>
			</div>

			<h4 className='try-again'>
				<Link to='/'>Try again</Link> with another url?
			</h4>
		</div>
	)
}

export default Scan
