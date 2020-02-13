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

//-=-->MANAGE TAB SELECT THROUGH STATE INSTEAD OF DOM MANIPULATION. THIS.STATE{SELECTEDTAB:DATAID} CLASSNAME IS SET BY STATE

////COMPONENT MODULES

////TABS PANEL
const TabsPanel = (props)=>{
	const direction = props.direction||'';
	const tabItems = Object.keys(props).map((tab, index)=>{
		if(isNaN(tab))return;
		
		////test for deprecated tabName
		const title = (props[index].tabName)?props[index].tabName:props[index].pageName;
		const slug = slugify(title,{remove: /[*+~.()'"!:@]/g,lower:true})	
		const activeClass = (title==props.active)?'selected':null;
		const tabClickProps = {
			target:slug			
		}
		
		//return tab
				return (
			<div className={[uiStyles.tab, activeClass].join(' ')} >
				<a href="#"  onClick={(e)=>props.onStateChange(e,'activeTab',title)}> {title} </a>
			</div>
		)
	})
	return <div className={"tabPanel "+direction}>{tabItems}</div>
	
}

////CONTENT PANEL

const ContentPanel = (props) =>{
	const activeClass = (props.pageName == props.active)?'selected':null;
	console.log(props.active,' Content Panel');
//TODO::: REPLACE REACTMARKDOWN WHEN SOURCE IS CONVERTED TO QUILL
	return(
		<div 
			className={"contentPanel "+activeClass} 
			data-id={slugify(props.pageName,{remove: /[*+~.()'"!:@]/g,lower:true})}
		>
			<ProgramInfo {...props}/>
		</div>
	)
}



////CONTAINER TO HOLD ALL THE CONTENT PANELS
const ContentPanelContainer = (props) =>{
	
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
		):(<ContentPanel 
			{...props[index]} 
			active={props.active} 
			key={index}/>
		)
		return programPanel
	});
		
		
	return (
		<div className="contentContainer">{panels}</div>
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
			const activeClass = (this.props.programs[index].pageName == this.state.activeTab)?'selected':null;
				//console.log(activeClass,this.props.programs[index].pageName,' Content Panel SUb');
			return(
				<div 
				key={index}
					className={"contentPanel "+activeClass} 
					data-id={slugify(this.props.programs[index].pageName,{remove: /[*+~.()'"!:@]/g,lower:true})}
				>
					<ProgramInfo {...this.props.programs[index]}/>
				</div>
				
			)})
			
		const activeParent = (this.props.activeParent==this.props.pageName)?'selected':null;
		console.log(activeParent,' nested Active Class');	
		return(
				<div 
					className={"panelContainer "+activeParent}
					data-id={slugify(this.parentName,{remove: /[*+~.()'"!:@]/g,lower:true})}
				>
					<TabsPanel 
						direction="vertical" 
						{...this.props.programs} 
						active={this.state.activeTab} 
						onTabClick={this.props.onTabClick} 
						onStateChange={this.handleStateChange} 
					/>
					<div className="contentContainer">
						{subpanels}
					</div>
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
   
   
	render(){
		
		console.log(this.props,' main')
		return(
			<>
				<TabsPanel {...this.props} 
					active={this.state.activeTab}
					onStateChange = {this.handleStateChange}
					onTabClick={this.handleTabClick}
				/>
				
				<ContentPanelContainer 
					active={this.state.activeTab}
					onStateChange = {this.handleStateChange}
					onTabClick={this.handleTabClick}
					{...this.props}/>
			</>				
			
		)
	}
	
}