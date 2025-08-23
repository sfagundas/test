import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import logo from '../images/logo.jpg'

import 'bootstrap-icons/font/bootstrap-icons.css'

const Sidebar = () => {
	function getPathSegmentRegex(path) {
		const match = path.match(/^\/([^\/]+)\/[^\/]+/)
		return match ? `/${match[1]}` : path
	}

	const location = useLocation()
	const segment = getPathSegmentRegex(location.pathname)
	const [activeLink, setActiveLink] = useState(segment)

	const handleLinkClick = path => {
		setActiveLink(path)
	}

	return (
		<div className='d-flex flex-column vh-100 border-end bg-white sidebar-width p-3 position-fixed'>
			{/* Лого */}
			<div className='mb-4 text-center'>
				<img src={logo} alt='Логотип' height='40' />
			</div>

			{/* Рабочий процесс */}
			<div className='mb-2 text-muted fw-bold small'>РАБОЧИЙ ПРОЦЕСС</div>
			<Nav className='flex-column mb-4'>
				<Nav.Link
					as={Link}
					to='/CRM'
					className={
						activeLink === '/CRM' ? 'fw-bold text-primary' : 'text-dark'
					}
					onClick={() => handleLinkClick('/CRM')}
				>
					<i className='bi bi-cart me-2'></i> Продажи
				</Nav.Link>
				<Nav.Link
					as={Link}
					to='/classes'
					className={
						activeLink === '/classes' ? 'fw-bold text-primary' : 'text-dark'
					}
					onClick={() => handleLinkClick('/classes')}
				>
					<i className='bi bi-table me-2'></i> Классы в работе
				</Nav.Link>
				<Nav.Link
					as={Link}
					to='/photo'
					className={
						activeLink === '/photo' ? 'fw-bold text-primary' : 'text-dark'
					}
					onClick={() => handleLinkClick('/photo')}
				>
					<i className='bi bi-camera me-2'></i> Фотосъёмки
				</Nav.Link>
			</Nav>

			{/* Служебное */}
			<div className='mb-2 text-muted fw-bold small'>СЛУЖЕБНОЕ</div>
			<Nav className='flex-column'>
				<Nav.Link
					as={Link}
					to='/staff'
					className={
						activeLink === '/staff' ? 'fw-bold text-primary' : 'text-dark'
					}
					onClick={() => handleLinkClick('/staff')}
				>
					<i className='bi bi-people me-2'></i> Сотрудники
				</Nav.Link>
				<Nav.Link
					as={Link}
					to='/directory'
					className={
						activeLink === '/directory' ? 'fw-bold text-primary' : 'text-dark'
					}
					onClick={() => handleLinkClick('/directory')}
				>
					<i className='bi bi-book me-2'></i> Справочники
				</Nav.Link>
				<Nav.Link
					as={Link}
					to='/access'
					className={
						activeLink === '/access' ? 'fw-bold text-primary' : 'text-dark'
					}
					onClick={() => handleLinkClick('/access')}
				>
					<i className='bi bi-shield-lock me-2'></i> Доступ
				</Nav.Link>
			</Nav>
			<div className='mb-2 text-muted fw-bold small'>Тест</div>
			<Nav className='flex-column'>
				<Nav.Link
					as={Link}
					to='/calendar'
					className={
						activeLink === '/calendar' ? 'fw-bold text-primary' : 'text-dark'
					}
					onClick={() => handleLinkClick('/calendar')}
				>
					<i className='bi bi-table me-2'></i>Календарь
				</Nav.Link>
			</Nav>
		</div>
	)
}

export default Sidebar
