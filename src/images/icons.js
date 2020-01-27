import React from 'react'


const Icon = props => {
	const icon = props.name.split('__');
	//console.log(icon[1])
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			className={`icon icon-${props.name}`}
		>
			<use xlinkHref={`#${icon[1]}`} fill={props.fill}/>
		</svg>
	)
}

export default Icon