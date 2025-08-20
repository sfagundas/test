import React from 'react'
import { Badge } from 'react-bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

const IconsWithBadge = ({
	iconClass = 'bi-people-dash',
	count = 0,
	iconSize = '',
	size = 'md',
	customBadgeColor,
	maxCount = 99,
	className = '',
	iconClassName = '',
	badgeClassName = '',
}) => {
	const getDynamicBadgeColor = () => {
		if (customBadgeColor) return customBadgeColor
		if (count === 0) return 'secondary'
		if (count <= 5) return 'success'
		if (count <= 10) return 'warning'
		if (count <= 20) return 'danger'
		return 'dark'
	}

	const getSizes = () => {
		switch (size) {
			case 'sm':
				return {
					iconSize: '1rem',
					badgeFontSize: '0.5rem',
					badgeMinWidth: '14px',
					badgeHeight: '14px',
				}
			case 'md':
				return {
					iconSize: '1.5rem',
					badgeFontSize: '0.6rem',
					badgeMinWidth: '18px',
					badgeHeight: '18px',
				}
			case 'lg':
				return {
					iconSize: '2rem',
					badgeFontSize: '0.7rem',
					badgeMinWidth: '22px',
					badgeHeight: '22px',
				}
			case 'xl':
				return {
					iconSize: '2.5rem',
					badgeFontSize: '0.8rem',
					badgeMinWidth: '26px',
					badgeHeight: '26px',
				}
			case '3.5rem':
				return {
					iconSize: '3.5rem',
					badgeFontSize: '1.1rem',
					badgeMinWidth: '36px',
					badgeHeight: '36px',
				}
			default:
				return {
					iconSize: size || '1.5rem',
					badgeFontSize: '0.6rem',
					badgeMinWidth: '18px',
					badgeHeight: '18px',
				}
		}
	}

	const sizes = getSizes()
	const finalIconSize = iconSize || sizes.iconSize

	return (
		<div className={`position-relative d-inline-block ${className}`}>
			<i
				className={`bi ${iconClass} ${iconClassName}`}
				style={{ fontSize: finalIconSize }}
			></i>
			<Badge
				bg={getDynamicBadgeColor()}
				className={`position-absolute top-0 start-100 translate-middle ${badgeClassName}`}
				pill
				style={{
					fontSize: sizes.badgeFontSize,
					minWidth: sizes.badgeMinWidth,
					height: sizes.badgeHeight,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					opacity: count === 0 ? 0.5 : 1,
				}}
			>
				{count > maxCount ? `${maxCount}+` : count}
			</Badge>
		</div>
	)
}

export default IconsWithBadge
