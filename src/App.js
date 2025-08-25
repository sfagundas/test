import './App.css'
import Notification from './components/directory/Notification.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { lazy, Suspense } from 'react'
import Sidebar from './components/Sidebar.jsx'

// Ленивая загрузка компонентов
const CRM = lazy(() => import('./components/CRM'))
const AllClasses = lazy(() => import('./components/AllClasses'))
const AllPhotosessions = lazy(() => import('./components/Photosessions'))
const Directory = lazy(() => import('./components/Directory'))
const SingleClass = lazy(() => import('./components/SingleClass'))
const Test = lazy(() => import('./components/Test'))
const Calendar = lazy(() => import('./components/Calendar'))

function App() {
	return (
		<BrowserRouter>
			<div className='d-flex'>
				<Sidebar />

				<div className='flex-grow-1'>
					<div className='header'></div>
					<div className='content p-4 bg-light'>
						<main>
							<Suspense fallback={<div>Загрузка...</div>}>
								<Routes>
									<Route path='/CRM' element={<CRM />} />
									<Route path='/classes' element={<AllClasses />} />
									<Route path='/photo' element={<AllPhotosessions />} />
									<Route path='/directory' element={<Directory />} />
									<Route path='/test' element={<Test />} />
									<Route path='/Calendar' element={<Calendar />} />
									<Route
										path='classes/single_class/:class_id'
										element={<SingleClass />}
									/>
								</Routes>
							</Suspense>
						</main>
					</div>
				</div>
			</div>

			<Notification />
		</BrowserRouter>
	)
}

export default App
