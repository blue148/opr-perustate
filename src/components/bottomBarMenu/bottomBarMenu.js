import React from "react"
import ScrollIntoView from 'react-scroll-into-view'
import styled from "styled-components"
import "./bottomBarMenu.scss"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPhone} from '@fortawesome/free-solid-svg-icons'

const BottomBar = (props) => (
	<nav className="mobileBottomBar">
		<ScrollIntoView selector="#leadform" className="buttonContainer learn-more-button" alignToTop={true}>
			<button className="button secondary" type="button">Learn More</button>
		</ScrollIntoView>
		<div  className="buttonContainer call-us-button">
			<a className="button tertiary call-us" href={"tel:+1"+props.phone.replace(/\D/g,'')}><FontAwesomeIcon icon={faPhone} /></a>
		</div>
	</nav>
)

export default BottomBar;