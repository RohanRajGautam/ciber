import React from 'react'
import { LoginForm } from './Form'

const ToggleModal = ({ showDialog, setShowDialog }) => {
	if (!showDialog) {
		return null
	}

	let getWebsiteUrl

	if (document.getElementById('homepage-url')) {
		getWebsiteUrl = document.getElementById('homepage-url').value
	}

	const styles = {
		errorMsg: 'text-red-400 text-xs italic',
		label: 'font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase',
		button:
			'flex justify-center items-center gap-3 shadow-md font-medium py-2 px-4 text-green-100 cursor-pointer bg-primary rounded-[10px] text-lg tr-mt absolute text-center w-full',
	}
	return (
		<>
			<div
				id='defaultModal'
				// tabIndex={-1}
				aria-hidden='true'
				className='h-full overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full'
			>
				<div
					className='bg-background opacity-50 h-full w-full absolute inset-0 -z-10'
					onClick={() => setShowDialog(false)}
				/>
				<div className='mx-auto mt-[10%] relative p-4 w-full max-w-2xl h-full md:h-auto'>
					<div className='relative bg-white rounded-[20px] shadow'>
						<div className='flex justify-end items-end p-4 rounded-t'>
							<button
								type='button'
								className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full border text-sm p-1.5 ml-auto inline-flex items-center '
								data-modal-toggle='defaultModal'
								onClick={() => setShowDialog(false)}
							>
								<svg
									className='w-5 h-5'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
										clipRule='evenodd'
									/>
								</svg>
							</button>
						</div>
						<div className='text-center px-4'>
							<h3 className='text-xl font-semibold text-btn '>
								Scan Your Website
							</h3>
							<p className='text-base leading-relaxed text-[#495F6D] mt-3 max-w-lg mx-auto'>
								You’re nearly there. To see your results, Please provide us with
								your official email address.
							</p>
						</div>
						<div className='pt-5 px-4 md:px-8 lg:px-32 pb-12 md:pb-32'>
							<LoginForm styles={styles} getWebsiteUrl={getWebsiteUrl} />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ToggleModal
