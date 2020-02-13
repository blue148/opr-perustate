import React from "react"
import styled from "styled-components"
import slugify from 'slugify'
import ScrollIntoView from 'react-scroll-into-view'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronRight,faChevronLeft,faTimesCircle, faLayers, faSquare } from '@fortawesome/free-solid-svg-icons'
import {Button} from '../uiElements'
import './index.scss'


const StyledButton = styled.button`
	width:250px;
`
const StyledMobileMenu = styled.nav`
`
const CloseButton = styled.a`
`
const Overlay = styled.a`

`
const StyledScrollIntoView = styled(ScrollIntoView)`

`
const MenuContainer = styled.div`
	position:relative;
	overflow:hidden;
	min-height:100%;
	ul{
		position:absolute;
		top:0;
		bottom:0;
		left:0;
		right:0;
		ul{
			left:100%;
			transition:.5s;
			&.shown{
				left:0;
				}			
		}
	}
`
const ListItem = (props) =>{
	const {title, handleToggle, index, programs} = props;
	//BUILD CHILD LIST IF PROGRAMS ARE PRESENT
	const childList = (programs)?
			
			Object.keys(programs).map((item,index)=>{
				const subtitle = programs[item].tabname||programs[item].pageName;
				const chainId=title+'__'+subtitle;
				//console.log(slugify(chainId,{remove: /[*+~.()'"!:@]/g,lower:true}),document.getElementById(slugify(chainId,{remove: /[*+~.()'"!:@]/g,lower:true})));
				return(
					<li key={index}>
						<StyledScrollIntoView 
							selector={'#'+slugify(chainId,{remove: /[*+~.()'"!:@]/g,lower:true})}
							onClick={()=>{
								//document.getElementById(slugify(title,{remove: /[*+~.()'"!:@]/g,lower:true})).click();
								//document.getElementById(slugify(chainId,{remove: /[*+~.()'"!:@]/g,lower:true})).click();
								}}
							
						>
						 	<a 
						 		href={'#'+slugify(chainId,{remove: /[*+~.()'"!:@]/g, lower:true})} 
						 		onClick={()=>{
							 	document.getElementById(slugify(title,{remove: /[*+~.()'"!:@]/g,lower:true})).parentElement.click();
							 	document.getElementById('main-menu').classList.toggle('opened');
							 	
								document.getElementById(slugify(chainId,{remove: /[*+~.()'"!:@]/g,lower:true})).parentElement.click();
								
								}}
						 		>
						 		{subtitle}
						 	</a>
						 </StyledScrollIntoView>	 
						</li>)		
			}):null;
	//RETURN FULL LIST WITH NESTED CHILDREN IF BUILT
	//NEED TO ALTER THE ONCLICK FOR ITEMS WITH CHILDREN	
	const slug = slugify(title,{remove: /[*+~.()'"!:@]/g, lower:true});
	if(programs){
		return(
			<li className="top-level">
				<div
				 	onClick={(e)=>props.handleSlide(e,slug)} 
				>
				 	<a href="#" onClick={(e)=>props.handleSlide(e,slug)}>{title}</a>
				 	
				</div>
				 
					{childList ?
						<ul id={slug+'__menu'}>{childList}</ul>
						: null}
			</li> 
		)
	}
			
		
		return(
		<li>
			<StyledScrollIntoView 
			 	selector={'#'+slugify(title,{remove: /[*+~.()'"!:@]/g, lower:true})} 
			 	//onClick={(e)=>props.handleSlide(e,slug)} 
			>
			 	<a href={'#'+slugify(title,{remove: /[*+~.()'"!:@]/g, lower:true})} onClick={()=>{
								document.getElementById(slugify(title,{remove: /[*+~.()'"!:@]/g,lower:true})).click();
								document.getElementById('main-menu').classList.toggle('opened');
								//document.getElementById(slugify(chainId,{remove: /[*+~.()'"!:@]/g,lower:true})).click();
								}}>{title}</a>
			 	
			</StyledScrollIntoView>
		</li>
		
	)
	
}
const MenuList = (props) =>{
	////CREATE TOP LEVEL LIST OF PROGRAMS
	const {items} = props;
	const list = Object.keys(items).map((item, index)=>{
		const {programs, tabName, pageName} = items[item]||'';		 
		return(			 
			<ListItem
				title={tabName||pageName}
				handleToggle={props.handleToggle}
				handleSlide={props.handleSlide}
				key={index}
				programs={programs||''}
				>
			</ListItem>
		)
	})
	 return (
		 <MenuContainer>
			<ul>
				{list}
				{props.children}
			</ul>
			
		</MenuContainer>
	 )
 }
 
 
 
export default class MobileMenu extends React.Component{
	
	constructor(props){
		super(props);
		this.state = '';
	}
	handleMenuSlide = (e,props) =>{
		///CHANGE THE CLASS OF THE CHILD MENU TO SHOW IT
		//console.log(props,' HandleMenuSlide')
		document.getElementById(props+'__menu').classList.add('shown');		
	}
	handleClick = (e) =>{
		e.preventDefault()
	}
	handleMenuToggle = (props)=>{
		props.preventDefault()
		//HIDE ANY CHILD MENUS THAT WERE EXPOSED
		var menus = document.querySelectorAll('ul.shown');
		[].forEach.call(menus, function(el){
			el.classList.remove('shown');
			});
		//HIDE THE MOBILE MENU 
		document.getElementById('main-menu').classList.toggle('opened');	
	}
	render(){

		return(		
			<>	
				<StyledMobileMenu
					id="main-menu"
					className="main-menu"
					area-label="mainmenu">
					<CloseButton
						href="#main-menu-toggle"
						id="main-menu-close"
						className="menu-close"
						onClick={this.handleMenuToggle}
						aria-label="Close main menu">
						<span className="sr-only">Close</span>
						<FontAwesomeIcon icon={faTimesCircle} inverse/>
					</CloseButton>
					
					
					<MenuList 
						handleToggle={this.handleMenuToggle}
						handleSlide={this.handleMenuSlide}
						items={this.props}>
						<li className="buttonArea">
						    <Button label="Apply Now" theme="secondary"/>
						</li>
					</MenuList>
					
					
				</StyledMobileMenu>
				<Overlay
					href="#main-menu-toggle"
					className="backdrop"
					tabindex="-1"
					aria-hidden="true"
					hidden
					onClick={this.handleMenuToggle}/>
			</>
		)
	}

}

