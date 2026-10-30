import React from 'react'
import Section from './Section'
import { useNavigate } from 'react-router-dom'
import AccordionLayout from './AccordionLayout'
import 'react-circular-progressbar/dist/styles.css'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'

// Animation
import { easeQuadInOut } from 'd3-ease'
import AnimatedProgressProvider from './AnimatedProgressProvider'

const ProgressBar = ({
	progressNumber,
	text,
	color,
	total,
	onClick,
	openTab,
	index,
}) => {
	return (
		<div
			className={`flex flex-col gap-2 justify-center items-center cursor-pointer ${
				openTab === index
					? `border-b-[5px] border-black rounded-[5px] pb-[5px]`
					: 'pb-[10px] '
			}`}
			onClick={onClick}
		>
			<div className='h-[50px] w-[50px]'>
				<AnimatedProgressProvider
					valueStart={0}
					valueEnd={progressNumber}
					duration={1.4}
					easingFunction={easeQuadInOut}
				>
					{(value) => {
						const roundedValue = Math.round(value)
						return (
							<CircularProgressbar
								value={value}
								text={roundedValue}
								counterClockwise={true}
								strokeWidth={12}
								maxValue={total}
								styles={buildStyles({
									// Text size
									textSize: '28px',

									// How long animation takes to go from one percentage to another, in seconds
									// pathTransitionDuration: 0.5,

									// Can specify path transition in more detail, or remove it entirely
									pathTransition: 'none',

									// Colors
									pathColor: color,
									textColor: color,
								})}
							/>
						)
					}}
				</AnimatedProgressProvider>
			</div>
			<h4
				className={`text-sm leading-[14px] font-normal`}
				style={{ color: `${color}` }}
			>
				{text}
			</h4>
		</div>
	)
}

const ResultBody = ({ data }) => {
	let navigate = useNavigate()
	const [activeIndex, setActiveIndex] = React.useState(0)
	const [openTab, setOpenTab] = React.useState(1)

	React.useEffect(() => {
		if (data && data.results && data.results.length === 0) {
			navigate('/')
		}
	}, [data, navigate])

	return (
		<Section className={`min-h-screen`}>
			<div className='py-8 font-inter'>
				<div className='py-2 flex sm:flex-row flex-col justify-between items-center border-b-4 border-[#EDEFF1] rounded-[4px] gap-4'>
					<div className='flex flex-row justify-between md:justify-start w-full flex-wrap md:gap-7 lg:gap-10'>
						<div
							className={`flex flex-col gap-2 justify-center items-center cursor-pointer ${
								openTab === 1
									? 'border-b-[5px] border-black rounded-[5px] pb-[5px] '
									: 'pb-[10px]'
							}`}
							onClick={() => setOpenTab(1)}
						>
							<div className='h-[50px] w-[50px] bg-[#E9EEF6] rounded-[50%] flex justify-center items-center'>
								<span className='text-[14px]'>{data?.total_checks}</span>
							</div>
							<h4 className={`text-sm leading-[14px] font-normal text-btn`}>
								All Issues
							</h4>
						</div>
						<ProgressBar
							progressNumber={
								data?.total_checks - data?.skipped_checks - data?.total_vul
							}
							text='Passed Checks'
							color='#31BF60'
							total={data?.total_checks}
							openTab={openTab}
							index={2}
							onClick={() => setOpenTab(2)}
						/>
						{!data?.skipped_checks && !data?.shipped_checks === '0' && (
							<ProgressBar
								progressNumber={data?.skipped_checks}
								text='Skipped Checks'
								color='#D39B2A'
								total={data?.total_checks}
								openTab={openTab}
								index={3}
								onClick={() => setOpenTab(3)}
							/>
						)}
						<ProgressBar
							progressNumber={data?.total_vul}
							text='Vulnerabilities'
							color='#F81E1E'
							total={data?.total_checks}
							openTab={openTab}
							index={4}
							onClick={() => setOpenTab(4)}
						/>
					</div>
					<div className='block relative max-w-[350px] w-full'>
						<span className='h-full absolute inset-y-0 left-0 flex items-center pl-4'>
							<svg
								width={14}
								height={15}
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M6.417 11.362a4.667 4.667 0 1 0 0-9.333 4.667 4.667 0 0 0 0 9.333ZM12.25 12.529 9.713 9.99'
									stroke='#C1C1C1'
									strokeWidth={1.5}
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</span>
						<input
							placeholder='Search by Issue'
							className='appearance-none border-[1.5px] rounded-[10px] border-background block pl-[37px] py-[10px] w-full bg-transparent text-sm placeholder-gray-400 text-[#888] focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none'
						/>
					</div>
				</div>
				<div className='py-4 transition-all'>
					<div className='inline-flex flex-wrap min-w-full'>
						<table className='min-w-full border-spacing-y-3 border-separate'>
							<thead>
								<tr>
									<th className='sm:pl-2 text-left text-sm font-normal text-[#495F6D]'>
										S. No.
									</th>
									<th className='px-3 text-left text-sm font-normal text-[#495F6D]'>
										Description of the issue
									</th>
									<th className='pr-3 md:pr-0 text-left text-sm font-normal text-[#495F6D]'>
										Status
									</th>
									<th className='pr-3 md:pr-4 text-right text-sm font-normal text-[#495F6D]'>
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{openTab === 1 &&
									data?.results?.map((output, i) => (
										<AccordionLayout
											title={output.name}
											index={i + 1}
											activeIndex={activeIndex}
											setActiveIndex={setActiveIndex}
											status={output.status}
											vulnerabilities={output.vul}
										/>
									))}
								{openTab === 2 &&
									data?.results
										?.filter((o) => o.vul.length === 0)
										.map((output, i) => (
											<AccordionLayout
												title={output.name}
												index={i + 1}
												activeIndex={activeIndex}
												setActiveIndex={setActiveIndex}
												status={output.status}
												vulnerabilities={output.vul}
											/>
										))}
								{openTab === 4 &&
									data?.results
										?.filter((o) => o.vul.length > 0)
										.map((output, i) => (
											<AccordionLayout
												title={output.name}
												index={i + 1}
												activeIndex={activeIndex}
												setActiveIndex={setActiveIndex}
												status={output.status}
												vulnerabilities={output.vul}
											/>
										))}
							</tbody>
						</table>
						{/* <div className='py-5 flex flex-row items-center justify-end gap-2'>
							<span className='text-sm xs:text-sm text-gray-900'>
								1-10 out of 10
							</span>
							<div className='inline-flex xs:mt-0 gap-2'>
								<button className=''>
									<svg
										width={16}
										height={16}
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M8 1.333a6.667 6.667 0 1 0 0 13.334A6.667 6.667 0 0 0 8 1.333Z'
											stroke='#495F6D'
											strokeWidth={1.5}
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
										<path
											d='M8 5.333 5.333 8 8 10.667M10.666 8H5.333'
											stroke='#495F6D'
											strokeWidth={1.5}
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</button>
								<button className=''>
									<svg
										width={16}
										height={16}
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M8 14.667A6.667 6.667 0 1 0 8 1.333a6.667 6.667 0 0 0 0 13.334Z'
											stroke='#495F6D'
											strokeWidth={1.5}
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
										<path
											d='M8 10.667 10.667 8 8 5.333M5.334 8h5.333'
											stroke='#495F6D'
											strokeWidth={1.5}
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</button>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</Section>
	)
}

export default ResultBody
