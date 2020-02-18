import React from "react"
import styled from "styled-components"
import slugify from 'slugify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import {Button} from '../uiElements'
import './index.scss'

//****NEED TO PASS STATE FORM LAYOUT->HEADER->HERE TO CONTROL THE TABS AND PANELS SELECTIONS
const StyledMobileMenu = styled.nav`
`
const CloseButton = styled.a`
`
const Overlay = styled.a`

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
	const {title, programs} = props;
	//BUILD CHILD LIST IF PROGRAMS ARE PRESENT
	const childList = (programs)?
			
			Object.keys(programs).map((item,index)=>{
				const subtitle = programs[item].tabname||programs[item].pageName;///Check for deprecated tabName
				const parent = slugify(title,{remove: /[*+~.()'"!:@]/g,lower:true});///slugify the parent pageName
				const chainId=slugify([title,subtitle].join('__'),{remove: /[*+~.()'"!:@]/g,lower:true});///create the nested ID. Format is [parent]__[pagename]
				return(
					<li key={index}>		
						 	<a 
						 		href={'#'+chainId} 
						 		onClick={()=>{
							 	
								 	document.getElementById('main-menu').classList.toggle('opened');
								 	const selected = document.querySelectorAll('.contentPanel.selected');
					 				for(var x=0; x<selected.length; x++){
						 				selected[x].classList.toggle('selected')
					 				}
								 	const parentClass = document.getElementById(chainId).parentNode.classList;
									if(parentClass.contains('nestedContentPanel')){
										document.getElementById(parent).classList.add('selected')
										document.getElementById(chainId).classList.add('selected');
									}else{
										document.getElementById(parent).classList.add('selected');
									}

								
								}}
						 		>
						 		{subtitle}
						 	</a>
					
						</li>)		
			}):null;
	//RETURN FULL LIST WITH NESTED CHILDREN IF BUILT
	//NEED TO ALTER THE ONCLICK FOR ITEMS WITH CHILDREN	
	const slug = slugify(title,{remove: /[*+~.()'"!:@]/g, lower:true});
	if(programs){
		return(
			<li className="top-level">
				<div
				 	role="tab" onClick={(e)=>props.handleSlide(e,slug)} 
				>
				 	<a href="#" onClick={(e)=>props.handleSlide(e,slug)}>{title}</a>
				 	
				</div>
				 
					{childList ?
						<ul id={slug+'__menu'}>
							<li className="menu-back">
								<a href="#" onClick={()=>{document.getElementById(slug+'__menu').classList.remove('shown')}}>Back</a>
							</li>
							{childList}
						</ul>
						: null}
			</li> 
		)
	}
			
		
		return(
		<li>
			 	<a href={'#'+slug} onClick={()=>{
				 				const selected = document.querySelectorAll('.contentPanel.selected');
				 				for(var x=0; x<selected.length; x++){
					 				selected[x].classList.toggle('selected')
				 				}
								document.getElementById(slug).classList.add('selected');
								document.getElementById('main-menu').classList.toggle('opened');
								}}>{title}</a>
			 	
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
		e.preventDefault()
		console.log(props)
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

