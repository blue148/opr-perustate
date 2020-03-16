import React from "react"
import styled from "styled-components"
import MobileMenu from '../mobilemenu/mobilemenu'
import Logo from "../../images/peru-logo-online-final.svg"
import {Button} from '../uiElements'
import './header.scss'

const StyledHead = styled.header`

`
const Container=styled.div`
`
const ButtonContainer = styled.div`

	
`
 
export default class Header extends React.Component{
	render(){
		return(
			<header>
				<div className="headerContainer">
				    <div className='logobox'>
				      <Logo/>
				    </div>
				    <nav className="buttonContainer">
					    <Button label="Apply Now" theme="secondary" className="apply-now header-item" outlink="https://online.peru.edu/apply-now"/>
						<MobileMenu {...this.props}/>
					</nav>
					
					
				</div>
			</header>
		)
	}

}

