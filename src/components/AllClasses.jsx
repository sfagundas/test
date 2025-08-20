import React from 'react'
import { Row, Col, Card, Spinner } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import OkBadgeDate from './custom/OkBadgeDateCrm'
import IconsWithBadge from './custom/IconsWithBadge'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function AllClasses() {
	const [content, setContent] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		// Функция для получения данных из API
		const fetchData = async () => {
			try {
				const response = await fetch('http://okalbm.ru/api/api/work_class_list')
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				const data = await response.json()
				setContent(data)
			} catch (error) {
				console.error('Error fetching data:', error)
				setError(error.message)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData() // Вызываем функцию для получения данных
	}, [])

	if (isLoading) {
		return (
			<div
				className='d-flex justify-content-center align-items-center'
				style={{ height: '100vh' }}
			>
				<Spinner animation='border' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</Spinner>
			</div>
		)
	}

	if (error) {
		return (
			<div className='alert alert-danger m-3'>
				Error loading data: {error}
				<Link to='/classes' className='ms-2'>
					Back to classes
				</Link>
			</div>
		)
	}

	return (
		<>
			<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
				<h1 className='h2'>Классы в работе</h1>
			</div>

			<Row>
				{content.map(item => (
					<Col sm={12} key={item.Id}>
						<Card className='mb-3 h-100'>
							{' '}
							<Card.Body
								className='d-flex flex-column'
								style={{ paddingBottom: '10px' }}
							>
								<div className='d-flex justify-content-between'>
									<Card.Title className='mb-0'>
										<div className='d-flex align-items-center'>
											<span style={{ fontSize: '25px' }}>
												<Link to={`/classes/single_class/${item.Id}`}>
													{item.ClientName}
												</Link>
											</span>
										</div>
									</Card.Title>
								</div>
								<div className='flex-grow-1 d-flex align-items-center my-3'>
									<Row className='w-100 align-items-center'>
										<Col xs={9} md={8}>
											<div className='d-flex flex-column h-100 justify-content-center'>
												<small style={{ fontSize: '25px' }} className='mb-2'>
													{item.CityName}
												</small>
												<div className='my-3'>
													<OkBadgeDate date={'2025-04-20'} />
												</div>
											</div>
										</Col>
										<Col xs={3} md={4}>
											<div className='d-flex justify-content-between gap-2 flex-wrap h-100 align-items-center'>
												<IconsWithBadge
													iconClass='bi-people'
													count={30}
													size='md'
													iconClassName='text'
												/>
												<IconsWithBadge
													iconClass='bi bi-person-gear'
													count={8}
													size='md'
													iconClassName='text'
												/>
												<IconsWithBadge
													iconClass='bi-chat-quote'
													count={25}
													size='md'
													iconClassName='text'
												/>
												<IconsWithBadge
													iconClass='bi-link'
													count={108}
													size='md'
													iconClassName='text'
												/>
												<IconsWithBadge
													iconClass='bi-people'
													count={3}
													size='md'
													iconClassName='text'
												/>
												<IconsWithBadge
													iconClass='bi-camera'
													count={3}
													size='md'
													iconClassName='text'
												/>
											</div>
										</Col>
									</Row>
								</div>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</>
	)
}

export default AllClasses
