import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as LogoIcon } from '../assets/icons/logo.svg'

import Section from './Section'

const Header = ({ setShowDialog }) => {
	const [state, setState] = useState(false)

	// Replace / path with your path
	// const navigation = [
	// 	{ title: 'Home', path: '/' },
	// 	{ title: 'Features', path: '/' },
	// 	{ title: 'Pricing', path: '/' },
	// 	{ title: 'Company', path: '/' },
	// ]

	return (
		<Section>
			<nav className='w-full md:static font-inter pt-8'>
				<div className='items-center max-w-screen-xl mx-auto md:flex'>
					<div className='flex items-center justify-between md:block'>
						<Link to='/'>
							<LogoIcon />
						</Link>
						<div className='md:hidden'>
							<button
								className='text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border'
								onClick={() => setState(!state)}
							>
								{state ? (
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-6 w-6'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path
											fillRule='evenodd'
											d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
											clipRule='evenodd'
										/>
									</svg>
								) : (
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-6 w-6'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M4 8h16M4 16h16'
										/>
									</svg>
								)}
							</button>
						</div>
					</div>
					{/* <div
						className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
							state ? 'block' : 'hidden'
						}`}
					>
						<ul className='justify-end items-center space-y-8 md:flex md:space-x-6 md:space-y-0'>
							{navigation.map((item, idx) => {
								return (
									<li key={idx} className='text-gray-600 hover:text-indigo-600'>
										<Link to={item.path}>{item.title}</Link>
									</li>
								)
							})}
						</ul>
					</div> */}
					{/* <div className='hidden md:inline-block ml-auto'>
						<button
							className='py-[6px] px-4 text-primary hover:bg-primary hover:text-white text-[13px] font-normal bg-transparent border border-primary rounded-2xl shadow'
							onClick={() => setShowDialog(true)}
						>
							Get Started
						</button>
					</div> */}
				</div>
			</nav>
		</Section>
	)
}

export { Header }
