import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Section from './Section'
import useStore from '../store'

const Buttons = ({ svg, name, href, onClick }) => {
	return (
		<Link to={href}>
			<button
				className='bg-transparent border border-white rounded-[5px] py-[6px] px-3 text-xs font-normal flex items-center'
				onClick={onClick}
			>
				{svg}
				<span className='ml-2'>{name}</span>
			</button>
		</Link>
	)
}

const ResultHeader = ({ data }) => {
	const url = data?.website_url
	// const url = localStorage.getItem('url')
	const urlName = url?.split('.')[0]

	const clearTemplate = useStore((state) => state.clearTemplate)

	/**
	 * We're using axios to make a GET request to the server, which will return a blob of data. We then
	 * create a link element, set the href to the blob, and then click the link to download the file
	 */
	const downloadFile = () => {
		axios({
			url: `/api/download_report?url=${url}`, //your url
			method: 'GET',
			responseType: 'blob', // important
		}).then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]))
			const link = document.createElement('a')
			link.href = url
			link.setAttribute('download', `CIBER__${urlName ?? url}_report.txt`) //or any other extension
			document.body.appendChild(link)
			link.click()
		})
	}

	return (
		<header className='bg-secondary text-white font-inter md:sticky md:top-0 md:z-50'>
			<Section>
				<div className='flex flex-col md:flex-row justify-between md:items-center pt-2 pb-4 gap-3'>
					<div className='flex flex-col'>
						<h1 className='text-xl font-bold'>Site Audit: {urlName}</h1>
						<p className='flex text-xs mt-2 items-center'>
							<svg
								width={12}
								height={12}
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M4.994 6.425a2.5 2.5 0 0 0 .808.686 2.554 2.554 0 0 0 2.984-.42l1.508-1.477A2.435 2.435 0 0 0 11 3.482a2.437 2.437 0 0 0-.736-1.72 2.541 2.541 0 0 0-1.756-.72 2.543 2.543 0 0 0-1.769.69l-.865.843'
									stroke='#fff'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M7.006 5.44a2.5 2.5 0 0 0-.808-.685 2.554 2.554 0 0 0-2.984.42L1.706 6.652A2.435 2.435 0 0 0 1 8.383c.006.646.27 1.263.736 1.72a2.54 2.54 0 0 0 1.756.72 2.543 2.543 0 0 0 1.769-.69l.86-.842'
									stroke='#fff'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
							<a
								className='ml-2'
								href={'http://www.' + url}
								target='_blank'
								rel='noreferrer'
							>
								http://www.{url}
							</a>
						</p>
						<p className='flex text-xs mt-3 items-center'>
							<svg
								width={10}
								height={11}
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M1 9.068c0-.325.132-.636.366-.866.235-.23.552-.358.884-.358H9'
									stroke='#fff'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<path
									d='M2.25.5H9v9.792H2.25c-.332 0-.65-.13-.884-.359A1.211 1.211 0 0 1 1 9.068V1.724c0-.325.132-.636.366-.866C1.601.63 1.918.5 2.25.5v0Z'
									stroke='#fff'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
							<span className='ml-2'>
								Last update: {new Date().toISOString().slice(0, 10)}
							</span>
						</p>
					</div>
					<div className='flex flex-col md:items-end'>
						<h1 className='font-bold text-xl'>Ciber</h1>
						<div className='flex gap-3 mt-3 flex-wrap'>
							{/* <Buttons
								svg={
									<svg
										width={12}
										height={12}
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M2 2h8c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1Z'
											stroke='#fff'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
										<path
											d='M11 3 6 6.5 1 3'
											stroke='#fff'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								}
								name='Contact for Detailed penetration'
								href='/contact'
							/> */}
							<Buttons
								svg={
									<svg
										width={12}
										height={12}
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<g
											clipPath='url(#a)'
											stroke='#fff'
											strokeWidth={1.5}
											strokeLinecap='round'
											strokeLinejoin='round'
										>
											<path d='M10.501 7.5v2a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-2M8.501 4l-2.5-2.5-2.5 2.5M6.001 1.5v6' />
										</g>
										<defs>
											<clipPath id='a'>
												<path
													fill='#fff'
													transform='translate(.001)'
													d='M0 0h12v12H0z'
												/>
											</clipPath>
										</defs>
									</svg>
								}
								name='Download Report'
								href='#'
								onClick={() => downloadFile()}
							/>
							<Buttons
								svg={
									<svg
										width={12}
										height={12}
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M9.18 3.32a4.5 4.5 0 1 1-6.365 0M6 1v5'
											stroke='#fff'
											strokeWidth={1.5}
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								}
								name='Exit'
								href='/'
								onClick={() => clearTemplate()}
							/>
						</div>
					</div>
				</div>
			</Section>
		</header>
	)
}

export default ResultHeader
