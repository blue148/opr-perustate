import React,{useState} from "react"
import ReactMarkdown from "react-markdown"
import slugify from 'slugify'
import styled from 'styled-components'
import {Button, Tab} from '../uiElements'
import ProgramInfo from '../programInfo'
import update from 'immutability-helper'
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
	const direction = props.direction||'';
	const tabItems = Object.keys(props).map((tab, index)=>{
		if(isNaN(tab))return;
		
		const{pageName}=props[index];

		const slug = slugify(pageName,{remove: /[*+~.()'"!:@]/g,lower:true})	
		const activeClass = (pageName==props.active)?'selected':null;
		const tabClickProps = {
			target:slug			
		}
		
		//return tab
				return (
			<li 
				data-target={slug}
				className={[tab, activeClass].join(' ')} 
				>
				<a href={"#"+slug} onClick={(e)=>props.onStateChange(e,'activeTab',pageName)}> 
					{pageName} 
				</a>
			</li>
		)
	})
	return <ul id={props.id} className={["tabPanel ",direction, props.viewport].join(' ')}>{tabItems}</ul>
	
}

////CONTENT PANEL

const ContentPanel = (props) =>{
	console.log(props)
	const activeClass = (props.pageName == props.active)?'selected':'';
	const slug = slugify(props.pageName,{remove: /[*+~.()'"!:@]/g,lower:true});
	const slugPanel = slug+'_panel';
	//console.log(props.active,' Content Panel');
//TODO::: REPLACE REACTMARKDOWN WHEN SOURCE IS CONVERTED TO QUILL
	return(
		<div 
			className={"contentPanel "+activeClass} 
			id={slug}
		>
			<h4 className='tab mobile-only' data-target={slugPanel} onClick={(e)=>props.onStateChange(e,'activeTab',slugPanel)}>
				{props.pageName}
			</h4>
			 
			 <div className="contentTarget" id={slugPanel}>
			 	
		 		<ProgramInfo {...props}/>
		 		
		 	</div>
		</div>
	)
}



////CONTAINER TO HOLD ALL THE CONTENT PANELS
const ContentPanelContainer = (props) =>{
	console.log(props,' CPC')
	const panels = Object.keys(props).map((child, index)=>{
		if(isNaN(child))return;
		
		const {programs} = props[index];
		
		
		///if programs exist
		const programPanel = (programs)?(
			<NestedPanel 
				activeParent={props.active}
				{...props[index]} 
				key={index} 
				/>
		):(
			<ContentPanel 
				{...props[index]} 
				active={props.active} 
				key={index}
				headerClick={props.onHeaderClick}/>
		)
		return programPanel
	});
		
		
	return (
		<>{panels}</>
		)
}

export class NestedPanel extends React.Component{
	//set state for this component, since it mimic tab-container states of the parent
	constructor(props){
		super(props)
		this.state = {activeTab:this.props.programs[0].pageName, activePanel:null}
	
	}
	handleStateChange =(e,target,newState)=>{
		e.preventDefault();
	   const updatedState = update(
		   this.state,{
			   [target]:{$set:newState}
		   }
	   )	  
	   this.setState(updatedState,()=>console.log(this.state,'handleStateChange nested'))
	   
   }

	parentName = (this.props.tabName)?this.props.tabName:this.props.pageName;
	
	
	render(){
		//console.log(this.props,'Nested')
		///create stack of content sub panels
		const subpanels = Object.keys(this.props.programs).map((program, index)=>{
			if(isNaN(program))return
			const activeClass = (this.props.programs[index].pageName == this.state.activeTab)?'selected':'';

			return(
				<ContentPanel 
					{...this.props.programs[index]} 
					active={this.state.activeTab} 
					key={index}/>
				
			)})
			
			
		const activeParent = (this.props.activeParent==this.props.pageName)?'selected':null;
		const slug = slugify(this.props.pageName,{remove: /[*+~.()'"!:@]/g,lower:true});
		const slugPanel = slug+'_panel';
		return(
				<div 
					className={"contentPanel nested "+activeParent}
					id={slug}
				>
					<h4 className='tab mobile-only' data-target={slugPanel}>
						{this.props.pageName}
					</h4>
					<TabsPanel 
						direction="vertical" 
						{...this.props.programs} 
						active={this.state.activeTab} 
						onTabClick={this.props.onTabClick} 
						onStateChange={this.handleStateChange}
						id={this.parentName}
						viewport='desktop-only nested' 
					/>

						{subpanels}
				</div>
		)
	}
}


export default class TabbedArea extends React.Component{
	constructor(props){
		super(props)
		this.state = {activeTab:this.props[0].pageName}
	
	}
	
	handleStateChange =(e,target,newState)=>{
		console.log(newState, 'State Change')
		e.preventDefault();
		const updatedState = update(
		   this.state,{
			   [target]:{$set:newState}
		   }
		)	  
	   this.setState(updatedState,()=>console.log(this.state,'handleStateChange'))
	   
   }
   handleMobileStateChange =(e,target,newState)=>{
		console.log(newState, 'State Change')
		e.preventDefault();
		const updatedState = update(
		   this.state,{
			   [target]:{$set:newState}
		   }
		)	  
	   this.setState(updatedState,()=>console.log(this.state,'handleStateChange'))
	   
   }
   handleHeaderClick = (props)=>{
	   const target = props.target.dataset.target;
	   
	   
   }
   
	render(){
		
		console.log(this.props,' main')
		return(
			<>
				<TabsPanel {...this.props} 
					active={this.state.activeTab}
					onStateChange = {this.handleStateChange}
					onTabClick={this.handleTabClick}
					id="tabPanelTop"
					viewport="desktop-only"
				/>
				
				<ContentPanelContainer 
					active={this.state.activeTab}
					onStateChange = {this.handleStateChange}
					onHeaderClick={this.handleHeaderClick}
					{...this.props}/>
			</>				
			
		)
	}
	
}