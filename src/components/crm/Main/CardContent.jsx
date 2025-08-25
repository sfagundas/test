// CardContent.js
import React, { useState } from 'react'
import { Card, Dropdown } from 'react-bootstrap'
import OkBadgeDate from '../../custom/OkBadgeDateCRM1'
import CrmAccordion from '../../custom/CrmAccordion'

const containerStyle = {
	display: 'flex',
	justifyContent: 'center',
	flexWrap: 'wrap',
	gap: '10px',
	padding: '10px',
	background: 'transparent',
}

const CardContent = ({ content, controlFormData }) => {
	const [openItems, setOpenItems] = useState({})

	const toggleAccordion = id =>
		setOpenItems(prev => ({ ...prev, [id]: !prev[id] }))

	return (
		<div style={{ ...containerStyle, fontFamily: 'Montserrat, sans-serif' }}>
			{content.map(item => {
				const isOpen = !!openItems[item.Id]

				return (
					<Card
						key={item.Id}
						style={{
							width: 266,
							background: '#F9F9F9',
							border: 'none',
							borderRadius: 5,
							padding: 12,
							marginBottom: 10,
						}}
					>
						{/* Строка 1: Название + Dropdown */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<div
								style={{
									fontFamily: 'Montserrat',
									fontWeight: 500,
									fontSize: 12,
									color: '#666666',
									width: 211,
									height: 15,
									whiteSpace: 'nowrap',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
								}}
							>
								{item.ClientName}
							</div>

							<Dropdown>
								<Dropdown.Toggle variant='light' size='sm' className='p-0' />
								<Dropdown.Menu>
									<Dropdown.Item onClick={() => controlFormData('date', item)}>
										<i className='bi bi-calendar-event me-2'></i>Дата связи
									</Dropdown.Item>
									<Dropdown.Item
										onClick={() => controlFormData('comment', item)}
									>
										<i className='bi bi-chat-right-text me-2'></i>Комментарий
									</Dropdown.Item>
									<Dropdown.Item
										onClick={() => controlFormData('status', item)}
									>
										<i className='bi bi-arrow-left-right me-2'></i>Статус
									</Dropdown.Item>
									<Dropdown.Item onClick={() => controlFormData('edit', item)}>
										<i className='bi bi-pencil-square me-2'></i>Изменить
									</Dropdown.Item>
									{item.StatusId === 2 && (
										<Dropdown.Item
											onClick={() => controlFormData('delete', item.Id)}
										>
											<i className='bi bi-trash me-2'></i>Удалить
										</Dropdown.Item>
									)}
									{item.StatusId === 4 && (
										<Dropdown.Item
											onClick={() => controlFormData('to_work', item.Id)}
										>
											<i className='bi bi-arrow-right me-2'></i>В работу
										</Dropdown.Item>
									)}
								</Dropdown.Menu>
							</Dropdown>
						</div>

						{/* Строка 2: Город */}
						<div
							style={{
								fontFamily: 'Montserrat',
								fontWeight: 300,
								fontSize: 8,
								color: '#666666',
								width: 240,
								height: 10,
								marginTop: 0,
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
							}}
						>
							{item.CityName}
						</div>

						<div style={{ marginTop: 15 }}>
							{/* Строка: бейдж + телефон */}
							<div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
								{item.NextDate && item.NextDate.trim() !== '' && (
									<OkBadgeDate date={item.NextDate} />
								)}
								<div
									style={{
										fontFamily: 'Montserrat',
										fontWeight: 400,
										fontSize: 9,
										color: '#666',
										whiteSpace: 'nowrap',
									}}
								>
									{item.Phone}
								</div>
							</div>

							{/* Аккордеон: кнопка по центру и текст под ней */}
							<CrmAccordion content={item.ManagerNotes} buttonSize={12} />
						</div>
					</Card>
				)
			})}
		</div>
	)
}

export default CardContent
