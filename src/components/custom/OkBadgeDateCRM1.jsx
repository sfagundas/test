import React from 'react'

const OkBadgeDate = ({ date }) => {
	const formatDate = inputDate => {
		const [year, month, day] = inputDate.split('-')
		return `${day}.${month}.${year}`
	}

	const targetDate = new Date(date)
	const currentDate = new Date()

	targetDate.setHours(0, 0, 0, 0)
	currentDate.setHours(0, 0, 0, 0)

	const timeDifference = targetDate - currentDate
	const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

	let badgeBg = '#FFFFFF' // фон по умолчанию
	let textColor = '#000000' // текст по умолчанию

	if (daysDifference === 0) {
		badgeBg = '#FFC107' // Сегодня
		textColor = '#000000'
	} else if (daysDifference > 0) {
		if (daysDifference <= 3) {
			badgeBg = '#0D6EFD' // До даты 3 дня
			textColor = '#FFFFFF'
		} else {
			badgeBg = '#F8F9FA' // До даты еще далеко
			textColor = '#000000'
		}
	} else {
		badgeBg = '#DC3545' // Дата прошла
		textColor = '#FFFFFF'
	}

	const formattedDate = formatDate(date)

	return (
		<div
			style={{
				width: 65,
				height: 18,
				borderRadius: 10,
				backgroundColor: badgeBg,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				fontFamily: 'Montserrat',
				fontWeight: 400,
				fontSize: 8,
				lineHeight: '100%',
				letterSpacing: '0.5px',
				color: textColor,
				padding: '0 4px', // немного внутреннего отступа
			}}
		>
			{formattedDate}
		</div>
	)
}

export default OkBadgeDate
