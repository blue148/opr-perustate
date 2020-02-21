import React from "react"
import styled from "styled-components"
import Logo from "../../images/peru-logo-online-final.svg"
import './footer.scss'

const StyledFooter = styled.footer`
	background-color:${props=>props.theme.brandmediumblue};
	color:${props=>props.theme.primaryblue};
	order:25;
`
const LogoBox = styled.div`
	width:150px;
`
const LinkBox = styled.div`
	grid-column:1;
	grid-row:2/3;
	
	@media (min-width:768px){
		grid-column:2/3;
		grid-row:1;
	}
	p{
		font-size:.7rem;
		margin-bottom:.3rem;
		text-align:center;
		@media (min-width:768px){
			text-align:left;
		}
		a{
			color:white;
			}
	}

`
export default class Footer extends React.Component{


	render(){
		return(
		  <StyledFooter className="footer">
		  <div className="desktop-shim">
		    <LogoBox>
		    	<Logo/>
		    </LogoBox>
		    <LinkBox>
			     <p>© {new Date().getFullYear()}Peru State College</p>
				 <p><a href="https://www.peru.edu/about/equal-opportunity-policy" target="_blank">Equal Opportunity Policy</a></p>
				 <p><a href="https://www.peru.edu/privacypolicy" target="_blank">Privacy Policy</a></p>
				 <p><a href="https://www.peru.edu/titleix/" target="_blank">Title IX</a></p>
				 <p>A Proud Member of the <a href="https://www.nscs.edu/" target="_blank">Nebraska State College System</a></p>
			</LinkBox>
			</div>
		  </StyledFooter>
		)
	}
} 