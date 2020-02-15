import React,{useState} from "react"
import ReactMarkdown from "react-markdown"
import slugify from 'slugify'
import styled from 'styled-components'
import {Button, Tab} from '../uiElements'
import ProgramInfo from '../programInfo'
import update from 'immutability-helper'
import ScrollIntoView from 'react-scroll-into-view'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import './tab.scss';
import uiStyles from '../uiElements/ui.module.css';

////BUILD TABBED LAYOUT
////EACH TAB WILL NEED TO EXPOSE THE CORRESPONDING CONTENTPANEL ON CLICK, AS WELL AS HIDE ANY EXPOSED PANELS
////HANDLE EXPOSE/HIDE VIA CSS SO THAT ALL PANELS ARE ON THE PAGE AT RENDER, JUST HIDDEN. THIS WILL ALLOW DEEP LINKING FOR NESTED TAB ARRAYS

////COMPONENT MODULES

////TABS PANEL
const TabsPanel = (props)=>{
	//console.log(props,' TabsPanel')
	const {direction,parent} = props||'';
	const tabItems = Object.keys(props).map((tab, index)=>{
		if(isNaN(tab))return;
		
		const{pageName}=props[index];
		
		const slug = (parent)?slugify([parent,pageName].join('__'),{remove: /[*+~.()'"!:@]/g,lower:true}):slugify(pageName,{remove: /[*+~.()'"!:@]/g,lower:true});
		//console.log(props.parent,' Tab Panel Loop');	
		const activeClass = (slug===props.active)?'selected':'';
		
		//return tab
				return (
			<li 
				data-target={slug}
				className={[tab, activeClass].join(' ')} 
				>
				<a href={"#"+slug} onClick={(e)=>props.onStateChange(e,slug)}> 
					{pageName} 
				</a>
			</li>
		)
	})
	return <ul id={props.id} className={["tabPanel ",direction, props.viewport].join(' ')}>{tabItems}</ul>
	
}

////CONTENT PANEL

const ContentPanel = (props) =>{
	//console.log(props)
	const ref = React.createRef();	
	const handleClick = (e,slug) =>{
		e.preventDefault()
		props.onStateChange(e,slug)
        //ref.current.scrollIntoView(true);
        }
	const slug = slugify(props.id,{remove: /[*+~.()'"!:@]/g,lower:true});
	const activeClass = (slug === props.active)?'selected':'';
	const slugPanel = slug+'_panel';
	//console.log(props.active, slug,' Content Panel');
//TODO::: REPLACE REACTMARKDOWN WHEN SOURCE IS CONVERTED TO QUILL
	return(
		<div 
			className={"contentPanel "+activeClass} 
			id={slug}
			

		>
			<ScrollIntoView selector={"#"+slug} onClick={()=>console.log('click')}>
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
	//console.log(props,' CPC')
	const panels = Object.keys(props).map((child, index)=>{
		if(isNaN(child))return;
		
		const {programs} = props[index];
		
		
		///if programs exist
		const programPanel = (programs)?(
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
				headerClick={props.onHeaderClick}
				onStateChange={props.onStateChange}/>
		)
		return programPanel
	});
		
		
	return (
		<>
			{panels}
		</>
		)
}

export class NestedPanel extends React.Component{
	//set state for this component, since it mimic tab-container states of the parent
	constructor(props){
		super(props)
		this.slug = slugify(this.props.pageName,{remove: /[*+~.()'"!:@]/g,lower:true});
	}
	
	
	render(){
		const ref = React.createRef();
		///create stack of content sub panels
		const subpanels =  Object.keys(this.props.programs).map((program, index)=>{
			if(isNaN(program))return
			const subSlug = slugify([this.props.pageName,this.props.programs[index].pageName].join('__'),{remove: /[*+~.()'"!:@]/g,lower:true});
			const activeClass = (subSlug === this.props.active.activeSubTab)?'selected':'';
			//console.log(this.props.active, subSlug)

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
			this.props.onStateChange(e,this.slug)
		}
		///make the item call ContentPanel. 
		return(
				<div 
					className={"contentPanel nested "+activeParent}
					id={this.slug}
				>
					<ScrollIntoView selector={"#"+this.slug} onClick={()=>console.log('click')}>
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
		const initSlug = slugify(this.props[0].pageName,{remove: /[*+~.()'"!:@]/g,lower:true})
		this.state = {activeTab:'', activePanel:'',activeSubTab:'', activeSubPanel:''}	
	}
	
	handleStateChange =(e,newState)=>{
		//console.log(newState, 'State Change')
		const tabArray = newState.split('__');
		var subTab = '';
		var tab = '';
		var tabPanel = '';
		var subTabPanel = '';
		
		if(tabArray.length < 2){

			subTab = '';
			tab = newState;
			tabPanel = tab+'_panel';
			subTabPanel = '';
		}else{
			subTab = newState;
			tab = tabArray[0];
			tabPanel = tab+'_panel';
			subTabPanel = subTab+'_panel';
		}
		e.preventDefault();
		const updatedState = update(
		   this.state,{
			   'activeTab':{$set:tab},
			   'activePanel':{$set:tabPanel},
   			   'activeSubTab':{$set:subTab},
			   'activeSubPanel':{$set:subTabPanel},
		   }
		)	  
	   this.setState(updatedState,()=>console.log(this.state,'handleStateChange'))
	   
   }
  
   
	render(){
		
		//console.log(this.props,' main')
		return(
			<div id="tabbedArea" className="tabbedArea">
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
			
		)
	}
	
}