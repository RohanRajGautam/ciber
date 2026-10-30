import React, { Fragment } from 'react'
import ReactTooltip from 'react-tooltip'

const AccordionLayout = ({
	title,
	index,
	status,
	activeIndex,
	setActiveIndex,
	vulnerabilities,
}) => {
	const handleSetIndex = (index) =>
		activeIndex !== index && setActiveIndex(index)

	const noVul = vulnerabilities?.length === 0

	return (
		<Fragment key={index}>
			<ReactTooltip place='top' effect='float' />
			<tr
				className={`${
					activeIndex === index && !noVul ? 'rounded-l-lg' : 'rounded-b-none'
				} bg-white text-[#495F6D] shadow rounded-t-lg`}
				onClick={() => {
					activeIndex === index ? setActiveIndex(null) : handleSetIndex(index)
				}}
			>
				<td
					className={`px-3 text-center md:text-left md:px-5 py-3 text-[14px] leading-[14px] font-normal ${
						activeIndex === index && !noVul ? 'rounded-t-lg' : 'rounded-l-lg'
					}`}
				>
					{index}
				</td>
				<td className='px-3 text-left md:px-5 py-3 text-[14px] leading-[14px] font-normal'>
					<p className='text-gray-900 whitespace-no-wrap'>{title}</p>
				</td>
				<td className='md:text-left md:px-5 py-3 text-[14px] leading-[14px] font-normal cursor-pointer relative'>
					<span
						className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inline-block p-1 font-semibold leading-tight h-[18px] w-[18px]'
						data-tip={status}
					>
						<span
							aria-hidden
							className='absolute inset-0 shadow rounded-full'
						/>
						<span
							className='absolute h-[10px] w-[10px] rounded-full'
							style={{
								backgroundColor: noVul ? '#31BF60' : '#F81E1E',
							}}
						/>
					</span>
				</td>
				<td
					className={`pr-3 sm:px-3 cursor-pointer text-center md:text-left md:px-5 py-3 bg-white text-[14px] text-[#495F6D] leading-[14px] font-normal rounded-r-lg  ${
						activeIndex === index && !noVul ? 'rounded-b-none' : 'rounded-b-lg'
					}`}
				>
					{noVul ? (
						<p className='text-[green] whitespace-no-wrap flex items-center justify-end gap-0 md:gap-2'>
							Passed Check
						</p>
					) : (
						<span className='text-[red] whitespace-no-wrap flex items-center justify-end gap-0 md:gap-2'>
							<p>{activeIndex === index ? 'See Less ' : 'See More'}</p>
							{activeIndex === index ? (
								<svg
									width={9}
									height={5}
									fill='#F81E1E'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M8.25 4.25 4.75.75l-3.5 3.5'
										stroke='#F81E1E'
										strokeWidth={1.5}
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							) : (
								<svg
									width={6}
									height={10}
									fill='#F81E1E'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='m1 8.586 3.5-3.427L1 1.73'
										stroke='#F81E1E'
										strokeWidth={1.5}
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							)}
						</span>
					)}
				</td>
			</tr>
			{activeIndex === index && !noVul && (
				<tr className='w-full rounded-b-lg shadow bg-white text-[#495F6D] relative -top-[12px] translate-y-0 transition-all'>
					<td
						className='w-full rounded-b-lg shadow px-3 text-left md:px-5 py-3'
						colSpan={4}
					>
						<span className='flex flex-col gap-5'>
							<span className='w-full text-sm font-bold text-[red]'>
								{vulnerabilities[0].threat_name}
							</span>
							<span className='flex gap-7 md:gap-10 flex-wrap md:flex-nowrap'>
								<span className='w-full md:w-1/2'>
									<h3 className='text-sm font-bold'>Analysis:</h3>
									<p className='text-sm font-normal max-w-xl mt-3 text-[red] break-words'>
										{vulnerabilities[0].vul_definition}
									</p>
								</span>
								<span className='w-full md:w-1/2'>
									<h3 className='text-sm font-bold'>Ciber Recommends:</h3>
									<p className='text-sm font-normal max-w-xl mt-3 text-[green] break-words'>
										{vulnerabilities[0].vul_remediation}
									</p>
								</span>
							</span>
						</span>
					</td>
				</tr>
			)}
		</Fragment>
	)
}

export default AccordionLayout
