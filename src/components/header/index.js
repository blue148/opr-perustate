import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import Logo from "../../images/peru-logo-online-final.svg"

const StyledHead = styled.header`
	background-color:#055591;
	display:grid;
	grid-template: 1fr/1fr 1fr;
	position:fixed;
top:0;
left:0;
right:0;
z-index:100;
`
const LogoBox = styled.div`
	width:200px;
`
const StyledButton = styled.button`
	text-transform:uppercase;
	background-color:#00aeef;
	color:#002856;
	font-weight:800;
	-webkit-transition:.5s;
	transition:.5s;
	border: none;
    padding: .2rem 1rem;
    font-family: sans-serif;
	&:hover{
		background-color:#0e356f;
		color:white;
	}
`
const Header = ({ siteTitle }) => (
  <StyledHead
  >
    <LogoBox>
      <Logo/>
    </LogoBox>
    <div>
	    <StyledButton>
	    	Apply Now
		</StyledButton>
	</div>
  </StyledHead>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}


export default Header
