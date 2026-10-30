import React from 'react'
import Section from './Section'

const HomeDetails = () => {
	return (
		<Section className='py-10 md:py-24'>
			<div className='flex items-center justify-center gap-4 md:gap-5 lg:gap-10 flex-col md:flex-row'>
				<div className='flex items-center justify-center mt-6 lg:mt-0 w-full md:w-1/2'>
					<img src='/second-hero.png' alt='home-details' />
				</div>
				<div className='w-full md:w-1/2'>
					<div className='text-left md:text-left'>
						<h1 className='text-3xl font-bold text-btn leading-tight'>
							Welcome to CIBER
							<br /> open Beta v1.0.0
						</h1>
						<p className='my-5 text-[#495f6dbd] text-[14px] font-normal'>
							CIBER scans websites for known vulnerabilities and creates a
							report detailing of any cyber security threats. Currently, it
							scans for 20 known threats and vulnerabilities and suggests
							mitigation measures. This beta is intended to build a database for
							early adopters and grant them first access to any future updates.
							The next release is going to incorporate diagnosis of technical
							SEO issues and mitigation measures.
							<br />
							<br />
							<i>Note:</i> Beta 1.0.0 is not tracking any user information or
							saving any data. Emails of early adopters will be secured by{' '}
							<a href='https://webpoint.io' target='_blank' rel='noreferrer'>
								Webpoint Solutions, LLC
							</a>
							. Security tests are also non-intrusive.
						</p>
						<button
							className='mx-auto md:mx-0 w-full max-w-[127px] flex items-center gap-1 px-6 py-2 text-[14px] font-medium text-white transition-colors duration-200 transform bg-primary rounded-2xl lg:w-auto hover:bg-primary focus:outline-none focus:bg-primary'
							// onClick={() => setShowDialog(true)}
						>
							Start Now{' '}
							<svg
								width='7'
								height='10'
								viewBox='0 0 7 10'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M1.91406 9L5.91129 5L1.91406 1'
									stroke='white'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</Section>
	)
}

export default HomeDetails
