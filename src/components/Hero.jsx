import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import useStore from '../store'
import Section from './Section'

const Hero = () => {
	let navigate = useNavigate()

	const [loading, setLoading] = React.useState(false)
	const addTemplates = useStore((state) => state.setTemplate)

	const addTemplate = (template) => {
		addTemplates(template)
	}

	const clearTemplate = useStore((state) => state.clearTemplate)

	const notify = () => toast.error('Request failed! Please try again.')

	const insertUser = (body) => {
		// make axios request to post user and get scanned result
		axios
			.post('/api/add', body)
			.then(({ status, data }) => {
				if (status === 200) {
					clearTemplate()
					addTemplate(data)
					setLoading(false)
					navigate('/result')
				} else {
					navigate('/')
					setLoading(false)
				}
			})
			.catch((error) => {
				console.log(error)
				setLoading(false)
				notify()
			})
	}
	return (
		<Section className={`mt-10 md:mt-5 mb-12`}>
			<div className='flex flex-col md:flex-row justify-between items-center font-teko'>
				<div className='md:w-1/2 flex flex-col justify-center '>
					<h1 className='text-7xl leading-tight font-bold text-btn'>
						Say <span className='text-[#2C40F6]'>Hello</span> to <br />
						<span className='text-[#2C40F6] font-bold text-8xl'>CIBER</span>
					</h1>
					<p className='text-2xl mt-2 mb-9 font-normal leading-tight text-[#495F6D] font-concert'>{`A cyber security and data intelligence Tool`}</p>
					<form
						className=''
						onSubmit={(e) => {
							// setShowDialog(true)
							e.preventDefault()
							const urlValue = document.getElementById('homepage-url').value
							const body = {
								url: urlValue,
							}
							insertUser(body)
							setLoading(true)
						}}
					>
						<div className='flex gap-3'>
							<input
								type='url'
								id='homepage-url'
								className='flex-1 block py-[13px] max-w-[275px] pl-6 pr-2 w-full text-lg text-gray-900 bg-white focus:bg-white rounded-lg border border-solid border-[#2C40F6] placeholder-[#495f6dbd] focus:outline-none focus:ring-0'
								placeholder='Target Website URL'
								required
								autoComplete='off'
							/>
							<button
								type='submit'
								className='text-white flex justify-center items-center gap-[6px] bg-primary font-bold rounded-lg text-lg px-5 min-w-[104px]'
								disabled={loading}
							>
								{loading ? (
									<>
										<svg
											role='status'
											className='inline w-4 h-4 text-white animate-spin mb-1'
											viewBox='0 0 100 101'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
												fill='#E5E7EB'
											/>
											<path
												d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
												fill='currentColor'
											/>
										</svg>
										<span className='text-white'>Scanning...</span>
									</>
								) : (
									<>
										<svg
											role='status'
											className='inline w-4 h-4 text-white mb-1'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M6.85 12.05a5.2 5.2 0 1 0 0-10.4 5.2 5.2 0 0 0 0 10.4ZM13.35 13.35l-2.827-2.827'
												stroke='#fff'
												strokeWidth={2}
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</svg>
										<span className='text-white'>Initiate Scan</span>
									</>
								)}
							</button>
						</div>
					</form>
					{/* <div className='flex justify-between items-center mt-[60px]'>
						<div className='flex flex-col'>
							<h3 className='text-[24px] leading-[29px] font-bold text-btn'>
								40k+
							</h3>
							<p className='text-[13px] mt-2 font-normal leading-[17px] text-[#495F6D]'>
								Happy Users
							</p>
						</div>
						<div className='w-[1px] h-[30px] bg-[#FF9B0B] rounded-lg' />
						<div className='flex flex-col'>
							<h3 className='text-[24px] leading-[29px] font-bold text-btn'>
								12k+
							</h3>
							<p className='text-[13px] mt-2 font-normal leading-[17px] text-[#495F6D]'>
								Active Users
							</p>
						</div>
						<div className='w-[1px] h-[30px] bg-[#FF9B0B] rounded-lg' />
						<div className='flex flex-col'>
							<h3 className='text-[24px] leading-[29px] font-bold text-btn'>
								2k+
							</h3>
							<p className='text-[13px] mt-2 font-normal leading-[17px] text-[#495F6D]'>
								Website checks
							</p>
						</div>
					</div> */}
				</div>
				<div className='hidden md:w-1/2 mt-5 md:flex justify-start xxxl:justify-start w-full'>
					<img src='/ninja.png' alt='hero' />
				</div>
			</div>
		</Section>
	)
}

export default Hero
