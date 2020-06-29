import React from "react"
import styled from "styled-components"
import Logo from "../../images/peru-logo-online-final.svg"
import './footer.scss'

const StyledFooter = styled.footer`
	`
const LogoBox = styled.div`
	
`
const LinkBox = styled.div`
	

`
export default class Footer extends React.Component{


	render(){
		return(
		  <footer className="footer">
			<div className="desktop-shim">
			    <div className="logoBox">
			    	<Logo/>
			    </div>
			    <div className="linkBox">
				     <p>©{new Date().getFullYear()} Peru State College</p>
					 <p><a href="https://www.peru.edu/about/equal-opportunity-policy" target="_blank" rel="noopener noreferrer">Equal Opportunity Policy</a></p>
					 <p><a href="https://www.peru.edu/privacypolicy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></p>
					 <p><a href="https://www.peru.edu/titleix/" target="_blank" rel="noopener noreferrer">Title IX</a></p>
					 <p>A Proud Member of the <a href="https://www.nscs.edu/" target="_blank" rel="noopener noreferrer">Nebraska State College System</a></p>
				</div>
			</div>
		  </footer>
		)
	}
} 