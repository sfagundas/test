import React from 'react'

const CrmAccordion = ({ content }) => {
	return (
		<div
			style={{
				fontFamily: 'Montserrat, sans-serif',
				fontWeight: 300,
				fontSize: '8px',
				lineHeight: '120%',
				color: '#666',
				width: '100%',
				padding: '4px 0',
				background: '#FFFFFF', // Белый фон
				borderRadius: 4, // Скругленные углы
			}}
		>
			{content}
		</div>
	)
}

export default React.memo(CrmAccordion)
