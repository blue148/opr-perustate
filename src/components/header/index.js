import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled, {withTheme} from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronRight,faChevronLeft,faTimesCircle, faLayers, faSquare } from '@fortawesome/free-solid-svg-icons'
import Logo from "../../images/peru-logo-online-final.svg"
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
	@media (min-width: 768px) {
		justify-self:end;
	}
`
const StyledButton = styled.button`
	width:250px;
`
const MobileMenu = styled.nav`
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
const CloseButton = styled.a`
`
const Overlay = styled.a`

`
const MenuList = (props) =>{
		 const list = Object.keys(props).map((item, index)=>(
			 <li key={index}>
			 	<a href="#">{props[index].tabName}</a>
			 </li>
		 ))
		 return (
			 <>
				<ul>
				{list}
				<li className="buttonArea"><StyledButton id="apply-now" aria-label="Apply Now" className="button secondary">
					Apply Now
				</StyledButton></li>
				</ul>
				
			</>
		 )
	 }
export default class Header extends React.Component{
	
	constructor(props){
		super(props);
		this.state = '';
	}
	 
	render(){
		console.log(this.props,' Headerr')
		return(
		<StyledHead >
		  <Container>
		    <LogoBox>
		      <Logo/>
		    </LogoBox>
		    <ButtonContainer>
			    <StyledButton id="apply-now" aria-label="Apply Now" className="button secondary">
			    	Apply Now
				</StyledButton>
				<Hamburger 
				href="#main-menu" 
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
			
			<MobileMenu
				id="main-menu"
				className="main-menu"
				area-label="mainmenu">
				<CloseButton
					href="#main-menu-toggle"
					id="main-menu-close"
					className="menu-close"
					aria-label="Close main menu">
					<span className="sr-only">Close</span>
					
					<FontAwesomeIcon icon={faTimesCircle} inverse/>
					
				</CloseButton>
				<MenuList {...this.props}/>
			</MobileMenu>
			<Overlay
				href="#main-menu-toggle"
				className="backdrop"
				tabindex="-1"
				aria-hidden="true"
				hidden/>
			</Container>
		  </StyledHead>
		)
	}

}

