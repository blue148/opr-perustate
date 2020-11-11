import React from "react"
import slugify from 'slugify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimesCircle, faChevronRight, faChevronLeft,  faBars} from '@fortawesome/free-solid-svg-icons'
import ScrollIntoView from 'react-scroll-into-view'
import {ApplyNowButton} from '../uiElements'
import './mobilemenu.scss'

 
const ListItem = (props) =>{
	const {title, programs,pageSlug} = props;
	
/// --> no title prop? bail on this method
	if(!title)return false;

/// --> Non-nested items have pageSlug prop, Parents to nested items do not, so create one from their title	
	const slug = pageSlug || slugify(title,{remove: /[*+~.()'"!:@]/g, lower:true});
		
/// --> BUILD CHILD LIST IF PROGRAMS ARE PRESENT
	const childList =  (programs)?
			
			Object.keys(programs).map((item,index)=>{
				const subtitle = programs[item].tabname||programs[item].pageName;///Check for deprecated tabName
				const parent = slugify(title,{remove: /[*+~.()'"!:@]/g,lower:true});///slugify the parent pageName
				const chainId=slugify([title,programs[item].pageSlug].join('__'),{remove: /[*+~.()'"!:@]/g,lower:true});///create the nested ID. Format is [parent]__[pagename]
				//console.log('child item',parent, chainId)
				return(
					<li key={index} className={chainId}>
						<ScrollIntoView selector={"#"+parent} alignToTop={true} >		
						 	<button
						 		onClick={(e)=>{
							 		e.preventDefault();
							 		props.handleSlide(e,parent,chainId)
							 		props.onMenuToggle(e)								
								}}
						 		>
						 		{subtitle}
						 	</button>
						</ScrollIntoView>
						 	
					
						</li>)		
			}):null;
			
			
			
/// --> RETURN FULL LIST WITH NESTED CHILDREN IF BUILT
	
	if(programs){
		/*nested level tabs. They have children*/
		const showToggle = (props.state.menuTarget === slug+'__menu')?'shown':'';
		return(
			<li className="top-level">
				<div
				 	role="tab"
				 	tabIndex="-1" 
				 	onClick={(e)=>{
					 	e.preventDefault()
					 	props.handleSlide(e,slug,'')
				 	}}
				 	onKeyDown={(e)=>{
					 	e.preventDefault()
					 	props.handleSlide(e,slug,'')
				 	}}
				>
				 	<button onClick={(e)=>e.preventDefault()}>{title}</button>
				 	<span><FontAwesomeIcon icon={faChevronRight} className="menu-arrow-icon"/></span>
				 	
				</div>
				 
					{childList ?
						<ul id={slug+'__menu'} className={showToggle}>
							<li className="menu-back">
								<button
									onClick={(e)=>props.handleSlide(e,'','')}
									onKeyDown={(e)=>props.handleSlide(e,'','')}
							 	>
							 		<FontAwesomeIcon icon={faChevronLeft}/> Back
							 		
							 	</button>		
							</li>
							{childList}
						</ul>
						: null
					}
			</li> 
		)
	}
	//console.log('parent',slug);		
			/*single level tabs, no children*/	
		return(

			<li
				>
				<ScrollIntoView selector={"#"+slug} alignToTop={true} >	
				 	<button 
				 		href={slug}
				 		onClick={(e)=>{
					 		e.preventDefault();
					 		props.handleSlide(e,slug,'')
					 		props.onMenuToggle(e)								
						}}				
					>
						{title}
					</button>
				</ScrollIntoView>
				 	
			</li>
		
	)
	
}
const MenuList = (props) =>{
	////CREATE TOP LEVEL LIST OF PROGRAMS
	const {items} = props;
	const list = Object.keys(items).map((item, index)=>{
		const {programs, tabName, pageName,pageSlug} = items[item]||'';		 
		return(			 
			<ListItem
				title={tabName||pageName}
				onMenuToggle={props.onMenuToggle}
				handleSlide={props.handleSlide}
				key={index}
				programs={programs||''}
				onStateChange={props.onStateChange}
				state={props.state}
				pageSlug={pageSlug}
			/>
		)
	})
	 return (
		 <div className="menuContainer">
			<ul>
				{list}
				{props.children}
			</ul>
			
		</div>
	 )
 }
 
 
 
export default class MobileMenu extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {menuTarget:'', menuOpened:false};
	}
	handleMenuSlide = (e,parent,child) =>{
		e.preventDefault()
		this.setState(prevState =>({menuTarget:parent+'__menu'}))
 		this.props.onStateChange(e,parent,child,'');		
	}
	handleMenuToggle = (e)=>{
		e.preventDefault()
		this.setState(prevState =>({menuOpened:!prevState.menuOpened,menuTarget:''}))	
	}
	
	render(){
		return(		
			<>	
				<button
					href="#" 
					onClick={(e)=>this.handleMenuToggle(e)}
					id="main-menu-toggle" 
					className="menu-toggle" 
					aria-label="Open main menu">
					<span className="sr-only">Open</span>
					<span className="">	
						<FontAwesomeIcon icon={faBars} inverse size="3x" transform="shrink-6"/>
					</span>
					
				</button>
				<nav
					id="main-menu"
					className={this.state.menuOpened?'opened main-menu':'main-menu'}
					area-label="mainmenu"
				>
					
					<button
						href="#"
						id="main-menu-close"
						className="menu-close"
						onClick={(e)=>this.handleMenuToggle(e)}
						aria-label="Close main menu">
						<span className="sr-only">Close</span>
						<FontAwesomeIcon icon={faTimesCircle} inverse/>
					</button>
					
					
					<MenuList 
						handleSlide={this.handleMenuSlide}
						onMenuToggle={this.handleMenuToggle}
						onStateChange={this.props.onStateChange}
						items={this.props}
						state={this.state}
					>
						
						<li className="buttonArea">
						    <ApplyNowButton className="mobile-only" location={this.props.location}/>
						</li>
					</MenuList>
					
					
				</nav>
				<button
					className="backdrop"
					tabIndex="-1"
					aria-hidden="true"
					aria-label="Close Navigation"
					hidden
					onClick={(e)=>this.handleMenuToggle(e)}
				/>
			</>
		)
	}

}

