import React from 'react'

const Section = ({ children, className }) => {
	return (
		<div
			className={`max-w-screen-xl px-4 md:px-6 lg:px-36 mx-auto ${className}`}
		>
			{children}
		</div>
	)
}

export default Section
