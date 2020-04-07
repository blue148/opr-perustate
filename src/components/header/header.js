import React from "react"
import MobileMenu from '../mobilemenu/mobilemenu'
import Logo from "../../images/peru-logo-online-final.svg"
import {Button} from '../uiElements'
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
					    <Button label="Apply Now" theme="secondary" className='apply-now header-item aide' outlink={["https://online.peru.edu/apply-now",(this.props.location)?this.props.location.search:'? null'].join('')}/>
						<MobileMenu {...this.props}/>
					</nav>
					
					
				</div>
			</header>
		)
	}

}

