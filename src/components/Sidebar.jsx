import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import logo from '../images/logo.jpg'
import '../Sidebar.css'

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
		<div className='sidebar d-flex flex-column'>
			<div className='mb-4 text-center'>
				<img src={logo} alt='Логотип' height='40' />
			</div>

			<div className='section-container'>
				<div className='section-title'>Рабочий процесс</div>
				<Nav className='flex-column mb-4'>
					<Nav.Link
						as={Link}
						to='/CRM'
						className={activeLink === '/CRM' ? 'nav-link active' : 'nav-link'}
						onClick={() => handleLinkClick('/CRM')}
					>
						<i className='bi bi-cart me-2'></i> Продажи
					</Nav.Link>
					<Nav.Link
						as={Link}
						to='/classes'
						className={
							activeLink === '/classes' ? 'nav-link active' : 'nav-link'
						}
						onClick={() => handleLinkClick('/classes')}
					>
						<i className='bi bi-table me-2'></i> Классы в работе
					</Nav.Link>
					<Nav.Link
						as={Link}
						to='/photo'
						className={activeLink === '/photo' ? 'nav-link active' : 'nav-link'}
						onClick={() => handleLinkClick('/photo')}
					>
						<i className='bi bi-camera me-2'></i> Фотосъёмки
					</Nav.Link>
				</Nav>
			</div>

			<div className='section-container'>
				<div className='section-title'>Служебное</div>
				<Nav className='flex-column mb-4'>
					<Nav.Link
						as={Link}
						to='/staff'
						className={activeLink === '/staff' ? 'nav-link active' : 'nav-link'}
						onClick={() => handleLinkClick('/staff')}
					>
						<i className='bi bi-people me-2'></i> Сотрудники
					</Nav.Link>
					<Nav.Link
						as={Link}
						to='/directory'
						className={
							activeLink === '/directory' ? 'nav-link active' : 'nav-link'
						}
						onClick={() => handleLinkClick('/directory')}
					>
						<i className='bi bi-book me-2'></i> Справочники
					</Nav.Link>
					<Nav.Link
						as={Link}
						to='/access'
						className={
							activeLink === '/access' ? 'nav-link active' : 'nav-link'
						}
						onClick={() => handleLinkClick('/access')}
					>
						<i className='bi bi-shield-lock me-2'></i> Доступ
					</Nav.Link>
				</Nav>
			</div>

			<div className='section-container'>
				<div className='section-title'>Тест</div>
				<Nav className='flex-column mb-4'>
					<Nav.Link
						as={Link}
						to='/calendar'
						className={
							activeLink === '/calendar' ? 'nav-link active' : 'nav-link'
						}
						onClick={() => handleLinkClick('/calendar')}
					>
						<i className='bi bi-table me-2'></i> Календарь
					</Nav.Link>
				</Nav>
			</div>
		</div>
	)
}

export default Sidebar
