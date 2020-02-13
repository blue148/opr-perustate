import React from "react"
import styled from "styled-components"
import slugify from 'slugify'
import ScrollIntoView from 'react-scroll-into-view'
import MobileMenu from '../mobilemenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronRight,faChevronLeft,faTimesCircle, faLayers, faSquare } from '@fortawesome/free-solid-svg-icons'
import Logo from "../../images/peru-logo-online-final.svg"
import {Button} from '../uiElements'
import './index.scss'

const StyledHead = styled.header`
	background-color:${props=>props.theme.brandblue};
	position:fixed;
	top:0;
	left:0;
	right:0;
	z-index:100;
	height:72px;
`
const Container = styled.div`
	display:grid;
	grid-template: 1fr/1fr 1fr;
	max-width:1200px;
	margin: 0 auto;
	align-items:center;
`
const LogoBox = styled.div`
	width:200px;
`
const ButtonContainer = styled.div`
justify-self:end;
padding-right:1rem;
	@media (max-width: 768px) {
		justify-self:end;
	}
`
const StyledButton = styled.button`
	width:250px;
`
const Hamburger = styled.a`
	padding: .75em 15px;
	line-height: 1em;
	font-size: 1em;
	color: #333;
	&:hover, &:focus{
		color:#c00;
	}
	width:25px;
	height:25px;
	grid-column:2/3;
	grid-row:1;
	justify-self:end;
	svg{
		path{
			fill{
				white;
			}
		}
	}
` 
 
export default class Header extends React.Component{
	
	constructor(props){
		super(props);
		this.state = '';
	}
	handleClick = (e) =>{
		e.preventDefault()
	}
	handleMenuToggle = (props)=>{
		props.preventDefault()
		document.getElementById('main-menu').classList.toggle('opened');	
	}
	render(){
		return(
		<StyledHead>
		  <Container>
		    <LogoBox>
		      <Logo/>
		    </LogoBox>
		    <ButtonContainer>
			    <Button label="Apply Now" theme="secondary"/>
				<Hamburger 
					href="#" 
					onClick={this.handleMenuToggle}
					id="main-menu-toggle" 
					className="menu-toggle" 
					aria-label="Open main menu">
					<span className="sr-only">Open</span>
					<span className="fa-layers fa-fw">
						<FontAwesomeIcon icon={faSquare} className="darkbluebutton" size="3x"/>
						<FontAwesomeIcon icon={faBars} inverse size="3x" transform="shrink-6"/>
					</span>
					
				</Hamburger>
			</ButtonContainer>
			
			<MobileMenu {...this.props}/>
			</Container>
		  </StyledHead>
		)
	}

}

