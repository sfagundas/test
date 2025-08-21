import React, { useState, useEffect } from 'react'
import {
	Row,
	Col,
	Container,
	Button,
	Badge,
	Modal,
	ListGroup,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Calendar = () => {
	const [currentDate, setCurrentDate] = useState(new Date())
	const [content, setContent] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
	const [selectedSessions, setSelectedSessions] = useState([])
	const [showModal, setShowModal] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					'http://okalbm.ru/api/photosessions/ph_date_time_list'
				)
				if (!response.ok) throw new Error('Network response was not ok')
				const data = await response.json()
				setContent(data)
			} catch (error) {
				console.error('Error fetching data:', error)
				setError(error.message)
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
	}, [])

	const goToPreviousMonth = () => {
		setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
	}

	const goToNextMonth = () => {
		setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
	}

	const getDaysInMonth = date => {
		const year = date.getFullYear()
		const month = date.getMonth()
		return new Date(year, month + 1, 0).getDate()
	}

	// Сессии на конкретный день
	const getSessionsOnDate = day => {
		const dateStr = `${currentDate.getFullYear()}-${String(
			currentDate.getMonth() + 1
		).padStart(2, '0')}-${String(day).padStart(2, '0')}`
		return content.filter(
			session =>
				session.PhDateTime &&
				session.PhDateTime.startsWith(dateStr) &&
				session.StatusId !== 1
		)
	}

	// Стиль кружка по статусам
	const getDayStyle = sessions => {
		if (sessions.length === 0) {
			return {
				background: '#f8f9fa', // light
				color: '#000',
			}
		}

		const hasShot = sessions.some(s => s.StatusId == 3)
		const hasBooked = sessions.some(s => s.StatusId == 2)

		if (hasShot && hasBooked) {
			return {
				background: 'linear-gradient(to right, #198754 50%, #ffc107 50%)', // success + warning
				color: '#fff',
			}
		} else if (hasShot) {
			return {
				background: '#198754', // success
				color: '#fff',
			}
		} else if (hasBooked) {
			return {
				background: '#ffc107', // warning
				color: '#000',
			}
		}

		return {
			background: '#f8f9fa',
			color: '#000',
		}
	}

	// Рендер календаря
	const renderCalendarDays = () => {
		const daysInMonth = getDaysInMonth(currentDate)
		const days = []

		for (let day = 1; day <= daysInMonth; day++) {
			const sessions = getSessionsOnDate(day)
			const style = getDayStyle(sessions)

			days.push(
				<Col key={day} xs={3} md={2} lg={1} className='mb-3 text-center'>
					<div
						style={{
							width: '55px',
							height: '55px',
							borderRadius: '50%',
							cursor: sessions.length > 0 ? 'pointer' : 'default',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontWeight: 'bold',
							fontSize: '16px',
							...style,
						}}
						onClick={() => {
							if (sessions.length > 0) {
								setSelectedSessions(sessions)
								setShowModal(true)
							}
						}}
					>
						{day}
					</div>
				</Col>
			)
		}
		return days
	}

	if (isLoading) {
		return (
			<div
				className='d-flex justify-content-center align-items-center'
				style={{ height: '100vh' }}
			>
				Загрузка...
			</div>
		)
	}

	if (error) {
		return (
			<Container className='text-center mt-5'>
				<div className='alert alert-danger'>Ошибка: {error}</div>
				<Button variant='primary' onClick={() => window.location.reload()}>
					Попробовать снова
				</Button>
				<Link to='/classes' className='ms-2 btn btn-secondary'>
					Назад
				</Link>
			</Container>
		)
	}

	return (
		<Container className='mt-4'>
			{/* Навигация */}
			<div className='d-flex justify-content-between align-items-center mb-4'>
				<Button variant='outline-primary' onClick={goToPreviousMonth}>
					← Предыдущий месяц
				</Button>
				<h2 className='text-center mb-0'>
					{currentDate.toLocaleString('ru', { month: 'long', year: 'numeric' })}
				</h2>
				<Button variant='outline-primary' onClick={goToNextMonth}>
					Следующий месяц →
				</Button>
			</div>

			{/* Календарь */}
			<Row>{renderCalendarDays()}</Row>

			{/* Легенда */}
			<div className='mt-4 text-center'>
				<div className='d-inline-block me-4'>
					<Badge bg='success' className='me-2'>
						&nbsp;
					</Badge>
					<small>Отснятые (StatusId: 3)</small>
				</div>
				<div className='d-inline-block me-4'>
					<Badge bg='warning' className='me-2'>
						&nbsp;
					</Badge>
					<small>Забронированные (StatusId: 2)</small>
				</div>
				<div className='d-inline-block'>
					<Badge bg='light' text='dark' className='me-2'>
						&nbsp;
					</Badge>
					<small>Нет фотосессий</small>
				</div>
			</div>

			{/* Модальное окно */}
			<Modal show={showModal} onHide={() => setShowModal(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>Фотосессии</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ListGroup>
						{selectedSessions.map((s, i) => (
							<ListGroup.Item key={i}>
								<strong>Клиент:</strong> {s.ClientName || '—'} <br />
								<strong>Локация:</strong> {s.Location || '—'} <br />
								<strong>Дата:</strong> {s.PhDateTime || '—'} <br />
								<strong>Тип:</strong> {s.PhType || '—'} <br />
								<strong>Статус:</strong>{' '}
								<span
									style={{
										color:
											s.StatusId == 3
												? '#198754' // зеленый
												: s.StatusId == 2
												? '#ffc107' // желтый
												: '#000',
										fontWeight: 'bold',
									}}
								>
									{s.StatusId == 3
										? 'Отснято'
										: s.StatusId == 2
										? 'Забронировано'
										: '—'}
								</span>
							</ListGroup.Item>
						))}
					</ListGroup>
				</Modal.Body>
			</Modal>
		</Container>
	)
}

export default Calendar
