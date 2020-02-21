import React from "react"
import slugify from 'slugify'
import ProgramInfo from '../programInfo'
import update from 'immutability-helper'
import ScrollIntoView from 'react-scroll-into-view'
import {isMobile} from 'react-device-detect'
import './tab.scss';

////BUILD TABBED LAYOUT
////EACH TAB WILL NEED TO EXPOSE THE CORRESPONDING CONTENTPANEL ON CLICK, AS WELL AS HIDE ANY EXPOSED PANELS
////HANDLE EXPOSE/HIDE VIA CSS SO THAT ALL PANELS ARE ON THE PAGE AT RENDER, JUST HIDDEN. THIS WILL ALLOW DEEP LINKING FOR NESTED TAB ARRAYS

////COMPONENT MODULES

////TABS PANEL
const TabsPanel = (props)=>{
	const {direction,parent,title} = props||'';
	
	const titleLead = (title)?<li className="leader">{title}</li>:'';
	const tabItems = Object.keys(props).map((tab, index)=>{
		if(isNaN(tab))return true;
		
		const{pageName}=props[index];
		
		const tabState = (parent)?slugify([parent,pageName].join('__'),{remove: /[*+~.()'"!:@]/g,lower:true}):slugify(pageName,{remove: /[*+~.()'"!:@]/g,lower:true});
		const subTabState=(props[tab].programs)?tabState+'__'+slugify(props[tab].programs[0].pageName,{remove: /[*+~.()'"!:@]/g,lower:true}):'';
		const activeClass = (tabState===props.active)?'selected':'';
		//need to set subtab state if this is a nested tab reference, but how
		
		//return tab
		return (
			<li 
				data-target={tabState}
				className={[tab, activeClass].join(' ')}
				key={index} 
				>
				<a href={"#"+tabState} onClick={(e)=>props.onStateChange(e,tabState,subTabState)}> 
					{pageName} 
				</a>
			</li>
		)
	})
	return (
		<ul id={props.id} className={["tabPanel ",direction, props.viewport].join(' ')}>
			{titleLead}
			{tabItems}
		</ul>
		)
	
}

////CONTENT PANEL

const ContentPanel = (props) =>{
	//console.log(props)
	const ref = React.createRef();	
	const handleClick = (e,slug) =>{
		e.preventDefault()
		if(props.active===slug){
				props.onStateChange(e,'')
			}else{
				props.onStateChange(e,slug)
			}
        }
	const slug = slugify(props.id,{remove: /[*+~.()'"!:@]/g,lower:true});
	const activeClass = (slug === props.active)?'selected':'';
	const slugPanel = slug+'_panel';
	return(
		<div 
			className={"contentPanel "+activeClass} 
			id={slug}
		>
			<ScrollIntoView selector={"#"+slug} className="accordion-trigger">
				<h4 className='tab mobile-only' ref={ref} data-target={slugPanel} onClick={(e)=>handleClick(e,slug)}>
					{props.pageName}
				</h4> 
			</ScrollIntoView>
			 <div className="contentTarget" id={slugPanel}>
			 	
		 		<ProgramInfo {...props}/>
		 		
		 	</div>
		</div>
	)
}



////CONTAINER TO HOLD ALL THE CONTENT PANELS
const ContentPanelContainer = (props) =>{
	const panels = Object.keys(props).map((child, index)=>{
		if(isNaN(child))return true;

		///if programs exist, this is a nested tab panel
		const programPanel = (props[index].programs)?(
			<NestedPanel 
				active={props.active}
				{...props[index]} 
				id={props[index].pageName}
				key={index} 
				onStateChange={props.onStateChange}
				/>
		):(
			<ContentPanel 
				{...props[index]} 
				id={props[index].pageName}
				active={props.active.activeTab} 
				key={index}
				onStateChange={props.onStateChange}/>
		)
		return programPanel
	});
			
	return panels
}

export class NestedPanel extends React.Component{
	constructor(props){
		super(props)

		this.slug = slugify(this.props.pageName,{remove: /[*+~.()'"!:@]/g,lower:true});
		
	}
	
	
	render(){
		
		//const ref = React.createRef();

		///create stack of content sub panels
		const subpanels =  Object.keys(this.props.programs).map((program, index)=>{
			if(isNaN(program))return true;
			const subSlug = slugify([this.props.pageName,this.props.programs[index].pageName].join('__'),{remove: /[*+~.()'"!:@]/g,lower:true});
			//const activeClass = (subSlug === this.props.active.activeSubTab)?'selected':'';

			return(
				<ContentPanel 
					{...this.props.programs[index]} 
					id={subSlug}
					active={this.props.active.activeSubTab} 
					key={index}
					onStateChange={this.props.onStateChange}/>
				
			)})
			
			
		
		const activeParent = (this.props.active.activeTab===this.slug)?'selected':'';
		const slugPanel = this.slug+'_panel';
		const handleClick = (e,slug) =>{
			e.preventDefault()
			if(this.props.active.activeTab===slug){
				this.props.onStateChange(e,'')
			}else{
				this.props.onStateChange(e,this.slug)
			}
		}
		///make the item call ContentPanel. 
		return(
				<div 
					className={"contentPanel nested "+activeParent}
					id={this.slug}
				>
					<ScrollIntoView selector={"#"+this.slug} className="accordion-trigger">
						<h4 className='tab mobile-only' data-target={slugPanel} onClick={(e)=>handleClick(e,this.slug)}>
							{this.props.pageName}
						</h4>
					</ScrollIntoView>
					<div className="nestedContentPanel">
						<TabsPanel 
							direction="vertical" 
							{...this.props.programs} 
							active={this.props.active.activeSubTab} 
							onTabClick={this.props.onTabClick} 
							onStateChange={this.props.onStateChange}
							parent={this.slug}
							viewport='desktop-only nested'
							title={this.props.pageName} 
						/>
	
						{subpanels}
					</div>
				</div>
		)
	}
}


export default class TabbedArea extends React.Component{
	constructor(props){
		super(props)
		//console.log(props[0],' build')
		if(props[0]){
			const initTab = (isMobile)?'':slugify(props[0].pageName,{remove: /[*+~.()'"!:@]/g,lower:true});
			//check for subtabs, then activate the first on if this is desktop
			const subTabCheck = (props[0].programs)?slugify(props[0].programs[0].pageName,{remove: /[*+~.()'"!:@]/g,lower:true}):'';
			const initSubTab = (isMobile)?'':initTab+'__'+subTabCheck;

			this.state = {activeTab:initTab, activePanel:'',activeSubTab:initSubTab, activeSubPanel:''}
		}	else{
			this.state = {activeTab:'', activePanel:'',activeSubTab:'', activeSubPanel:''}
		}
	}
	
	handleStateChange =(e,tabState,subTabState)=>{
		const tabArray = tabState.split('__');
		//console.log(tabArray,' array')
		var subTab = '';
		var tab = '';
		var tabPanel = '';
		var subTabPanel = '';
		
		if(tabArray.length < 2){
			subTab = '';
			tab = tabState;
			tabPanel = tab+'_panel';
			subTabPanel = '';
		}else{
			subTab = tabState;
			tab = tabArray[0];
			tabPanel = tab+'_panel';
			subTabPanel = subTab+'_panel';
		}
		if(subTabState)subTab=subTabState;
		e.preventDefault();
		const updatedState = update(
		   this.state,{
			   'activeTab':{$set:tab},
			   'activePanel':{$set:tabPanel},
   			   'activeSubTab':{$set:subTab},
			   'activeSubPanel':{$set:subTabPanel},
		   }
		)	  
	   this.setState(updatedState)
	   
   }
  
   
	render(){
		
		//console.log(this.props,' main')
		return(
			<section id="tabbedArea" className="tabbedArea">
				<div className="desktop-shim">
					<TabsPanel {...this.props} 
						active={this.state.activeTab}
						onStateChange = {this.handleStateChange}
						onTabClick={this.handleTabClick}
						id="tabPanelTop"
						viewport="desktop-only"
					/>
					
					<ContentPanelContainer 
						active={this.state}
						onStateChange = {this.handleStateChange}
						onHeaderClick={this.handleHeaderClick}
						{...this.props}/>
				</div>
			</section>				
			
		)
	}
	
}