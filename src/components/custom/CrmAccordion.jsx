import React, { useState, useRef, useEffect } from 'react'
import downArrow from '../../images/downArrow.png'

const CrmAccordion = ({ content }) => {
	const [open, setOpen] = useState(false)
	const contentRef = useRef(null)
	const [height, setHeight] = useState(0)
	const hasContent = content && content.trim() !== ''
	const BUTTON_SIZE = 12

	useEffect(() => {
		if (open && hasContent && contentRef.current) {
			setHeight(contentRef.current.scrollHeight)
		} else {
			setHeight(0)
		}
	}, [open, hasContent, content])

	return (
		<div
			style={{ width: '100%', boxSizing: 'border-box', margin: 0, padding: 0 }}
		>
			{/* Контейнер кнопки и текста — flex, column */}
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 0,
				}}
			>
				{/* Кнопка открытия */}
				{!open && (
					<button
						onClick={() => setOpen(true)}
						style={{
							width: BUTTON_SIZE,
							height: BUTTON_SIZE,
							border: 'none',
							padding: 0,
							backgroundColor: 'transparent',
							cursor: 'pointer',
							display: 'block',
						}}
					>
						<img
							src={downArrow}
							alt='toggle'
							style={{
								width: '100%',
								height: '100%',
								display: 'block',
								transform: 'rotate(0deg)',
							}}
						/>
					</button>
				)}

				{/* Контейнер текста */}
				<div
					style={{
						height: height,
						overflow: 'hidden',
						transition: 'height 0.3s ease',
						width: '100%',
					}}
				>
					{hasContent && (
						<div
							ref={contentRef}
							style={{
								fontFamily: 'Montserrat, sans-serif',
								fontWeight: 300,
								fontSize: '10px',
								lineHeight: '100%',
								color: '#000',
								width: '100%',
								margin: 0,
								padding: 0,
							}}
						>
							{content}
						</div>
					)}
				</div>

				{/* Кнопка закрытия под текстом */}
				{open && (
					<button
						onClick={() => setOpen(false)}
						style={{
							width: BUTTON_SIZE,
							height: BUTTON_SIZE,
							border: 'none',
							padding: 0,
							backgroundColor: 'transparent',
							cursor: 'pointer',
							display: 'block',
							marginTop: 2, // чуть отступа от текста
						}}
					>
						<img
							src={downArrow}
							alt='toggle'
							style={{
								width: '100%',
								height: '100%',
								display: 'block',
								transform: 'rotate(180deg)',
								transition: 'transform 0.3s ease',
							}}
						/>
					</button>
				)}
			</div>
		</div>
	)
}

export default React.memo(CrmAccordion)
