import React from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import useStore from '../store'
import { useNavigate } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'

const formSchema = Yup.object().shape({
	url: Yup.string()
		.matches(
			/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
			'Enter correct url!'
		)
		.matches(
			/^(?!gmail\b)(?!yahoo\b)(?!outlook\b)(?!icloud\b)(?!msn\b)(?!aol\b)/i,
			'Specified url is not allowed!'
		)
		.required('Please enter website'),
	email: Yup.string()
		// .email('Invalid email')
		.matches(
			/^[aA-zZ0-9.\s+-]+$/,
			'Please enter your work email *username* only'
		)
		.required('Please enter your work email username'),
})

export const LoginForm = ({ styles, getWebsiteUrl }) => {
	let navigate = useNavigate()

	const [loading, setLoading] = React.useState(false)
	const addTemplates = useStore((state) => state.setTemplate)

	const addTemplate = (template) => {
		addTemplates(template)
	}

	const clearTemplate = useStore((state) => state.clearTemplate)

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
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<>
			<Formik
				initialValues={{
					url: getWebsiteUrl ? getWebsiteUrl : '',
					email: '',
				}}
				validationSchema={formSchema}
				onSubmit={(values) => {
					const body = {
						url: values.url,
						email: values.email + '@' + values.url,
					}
					insertUser(body)
					// alert(JSON.stringify(values, null, 2))
					setLoading(true)
					// localStorage.setItem('url', values.url)
					// localStorage.setItem('email', values.email)
				}}
			>
				{({ values, errors, touched }) => (
					<Form>
						<div className='w-full'>
							<label className={styles.label} htmlFor='Url'>
								<span className='text-red-400 mr-1'>*</span> Website
							</label>
							<div className='flex relative'>
								<span className='rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm'>
									www.
								</span>
								<Field
									id='url'
									name='url'
									className='rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none '
									placeholder={getWebsiteUrl ? getWebsiteUrl : 'webpoint.io'}
									autoComplete='off'
								/>
							</div>
							<ErrorMessage
								component='a'
								className={styles.errorMsg}
								name='url'
							/>
						</div>
						<div className='w-full mt-3'>
							<label className={styles.label} htmlFor='Email'>
								<span className='text-red-400 mr-1'>*</span> Website Email
							</label>
							<div className='flex relative '>
								<Field
									type='text'
									id='email'
									className='rounded-l-lg rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none '
									name='email'
									placeholder='james'
									autoComplete='off'
								/>
								<span className='rounded-r-md inline-flex items-center px-3 bg-white text-gray-500 text-sm w-7/12'>
									@
									<Field
										name='url'
										className='pointer-events-none w-full'
										placeholder={getWebsiteUrl ? getWebsiteUrl : 'webpoint.io'}
										tabIndex='-1'
										autoComplete='off'
									/>
								</span>
							</div>
							<ErrorMessage
								component='a'
								className={styles.errorMsg}
								name='email'
							/>
						</div>
						<div className='mt-6 relative'>
							{loading ? (
								<button type='submit' className={styles.button} disabled>
									<div className='lds-ellipsis'>
										<div></div>
										<div></div>
										<div></div>
										<div></div>
									</div>
									<span className='text-white'>Scanning</span>
								</button>
							) : (
								<button type='submit' className={styles.button}>
									<svg
										width={15}
										height={15}
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
								</button>
							)}
						</div>
					</Form>
				)}
			</Formik>
		</>
	)
}
