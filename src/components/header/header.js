import React from "react"
import styled from "styled-components"
import MobileMenu from '../mobilemenu/mobilemenu'
import Logo from "../../images/peru-logo-online-final.svg"
import {Button} from '../uiElements'
import './header.scss'

const StyledHead = styled.header`
	position:fixed;
	top:0;
	left:0;
	right:0;
	z-index:100;
	height:90px;
`
const Container=styled.div`
	display:grid;
	grid-template: 1fr/1fr 1fr;
	max-width:1200px;
	margin: 0 auto;
	align-items:center;
	height:100%;
`
const ButtonContainer = styled.div`
justify-self:end;
padding-right:1rem;
margin-right:1rem;
	@media (max-width: 768px) {
		.buttonField{
			display:none;
			}
	}
	
`
 
export default class Header extends React.Component{
	render(){
		return(
			<StyledHead>
				<Container>
				    <div className={`logobox`}>
				      <Logo/>
				    </div>
				    <ButtonContainer>
					    <Button label="Apply Now" theme="secondary" className="apply-now header-item" outlink="https://online.peru.edu/apply-now"/>
						<MobileMenu {...this.props}/>
					</ButtonContainer>
					
					
				</Container>
			</StyledHead>
		)
	}

}

