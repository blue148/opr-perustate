import React from "react"
import MobileMenu from '../mobilemenu/mobilemenu'
import Logo from "../../images/peru-logo-online-final.svg"
import {ApplyNowButton,CallButton} from '../uiElements'
import './header.scss'

 
export default class Header extends React.Component{
	render(){
		return(
			<header className={this.props.className}>
				<div className="headerContainer">
				    <div className='logobox'>
				      <Logo/>
				    </div>
				    <nav className="buttonContainer">
					    <ApplyNowButton className="header-item" location={this.props.location}/>
					    <CallButton label='' phone={this.props.phone}/>
						<MobileMenu {...this.props}/>
					</nav>
					
					
				</div>
			</header>
		)
	}

}

