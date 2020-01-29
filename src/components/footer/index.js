import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import Logo from "../../images/peru-logo-online-final.svg"

const StyledFooter = styled.footer`
	background-color:${props=>props.theme.brandmediumblue};
	color:${props=>props.theme.primaryblue};
	display:grid;
	grid-template: 1fr/1fr auto;
	grid-column-gap:1rem;
	align-items:center;
	order:25;
	padding: 1rem;
	@media (min-width: 768px) {
		grid-column:1/3;
	}
`
const LogoBox = styled.div`
	width:150px;
`
const LinkBox = styled.div`
	grid-column:2/3;
	p{
		font-size:.7rem;
		margin-bottom:.3rem;
		}

`
export default class Footer extends React.Component{


	render(){
		return(
		  <StyledFooter
		  	>
		    <LogoBox>
		      <Logo/>
		    </LogoBox>
		    <LinkBox>
			     <p>© {new Date().getFullYear()}Peru State College</p>
				 <p>Equal Opportunity Policy</p>
				 <p>Privacy Policy</p>
				 <p>Title IX</p>
				 <p>A Proud Member of the Nebraska State College System</p>
			</LinkBox>
		  </StyledFooter>
		)
	}
} 