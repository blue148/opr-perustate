import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import Logo from "../../images/peru-logo-online-final.svg"

const StyledFooter = styled.footer`
	background-color:#072550;
	color:#2196F3;
	display:grid;
	grid-template: 1fr/1fr auto;
	align-items:center
`
const LogoBox = styled.div`
	width:150px;
`
export default class Footer extends React.Component{


	render(){
		return(
		  <StyledFooter
		  	>
		    <LogoBox>
		      <Logo/>
		    </LogoBox>
		    <div>
			     <p>© {new Date().getFullYear()}Peru State College</p>
				 <p>Equal Opportunity Policy</p>
				 <p>Privacy Policy</p>
				 <p>Title IX</p>
				 <p>A Proud Member of the Nebraska State College System</p>
			</div>
		  </StyledFooter>
		)
	}
} 