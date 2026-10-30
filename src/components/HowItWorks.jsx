import React from 'react'
import Section from './Section'

import { ReactComponent as UrlIcon } from '../assets/icons/url.svg'
import { ReactComponent as EmailIcon } from '../assets/icons/email.svg'
import { ReactComponent as ScannerIcon } from '../assets/icons/scanner.svg'

const HowItWorks = () => {
	return (
		<div className='bg-[#F8FAFB]'>
			<Section className='py-[45px] max-w-[926px] !px-6'>
				<h2 className='text-2xl leading-7 font-bold text-btn text-center'>
					How it works?
				</h2>
				<p className='text-[#495F6D] text-[14px] leading-5 font-normal text-center mt-[10px]'>
					Scan your website under 2 minutes.
				</p>
				<div className='mt-8 flex flex-col md:flex-row justify-between items-center gap-4'>
					<div className='flex flex-col items-center justify-center'>
						<UrlIcon />
						<p className='text-btn text-sm font-normal max-w-[115px] mt-6 text-center'>
							1. Enter your Target Web URL
						</p>
					</div>
					<div className='w-[2px] md:w-[80px] h-[80px] md:h-[2px] bg-[#FF9B0B] rounded-sm' />
					<div className='flex flex-col items-center justify-center'>
						<EmailIcon />
						<p className='text-btn text-sm font-normal max-w-[115px] mt-6 text-center'>
							2. Enter Your Email Address
						</p>
					</div>
					<div className='w-[2px] md:w-[80px] h-[80px] md:h-[2px] bg-[#FF9B0B] rounded-sm' />
					<div className='flex flex-col items-center justify-center'>
						<ScannerIcon />
						<p className='text-btn text-sm font-normal max-w-[115px] mt-6 text-center'>
							3. Check Link for Website Scanner
						</p>
					</div>
				</div>
			</Section>
		</div>
	)
}

export default HowItWorks
