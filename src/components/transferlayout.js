
import React from "react"

import Header from "./header/header"
import Hero from "./heroArea"
import MainArea from "./mainArea"
import TabbedArea from "./tabbedArea/tabs"
import GeneralContent from "./contentSection"
import Testimonial from "./testimonial"
import ProgramContent from './programContent'
import Awards from "./awards"
import Bottom from "./bottomContentSection"
import Footer from "./footer"
import FormPanel from "./form/form"
import Callout from "./callout/callout"
import {ApplyNowButton} from './uiElements'
import update from 'immutability-helper'
import styled, {ThemeProvider} from "styled-components"
import "./transferlayout.scss"
import Icons from "../images/symbol-defs.svg"
import ScrollIntoView from 'react-scroll-into-view'

const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!./_variables.scss');

const Page = styled.div`

`
const Main = styled.main`
`

const ContentArea = styled.section`
	
`
export default class Layout extends React.Component{
	constructor(props){
		super(props)
		
		this.state = {activeTab:'', activePanel:'',activeSubTab:'', activeSubPanel:'',formSelect:'',location:''}
	}
	
	
	componentDidMount(){
		this.setState({location:window.location},()=>this.drillDown(this.state.location));
		
		//if(this.props.location.search){			
		//}
		
	}
	drillDown = (location)=>{
		if(!location.search)return false;
		const targetProgram = JSON.parse('{"' + location.search.substring(1).replace(/&/g, '","').replace(/=/g,'":"') + '"}')||'';
			//console.log(this.props.programs,targetProgram.targetprogram)
			//find program code
			if(targetProgram.targetprogram){
				const tArr = targetProgram.targetprogram.split('__');
				const pageSlug = (tArr[1])?tArr[1]:tArr[0];
				const pCode = Object.keys(this.props.programs.edges).reduce((result, item)=>{
					if(this.props.programs.edges[item].node.pageSlug===pageSlug)result.push(this.props.programs.edges[item].node.programCode);
					return result;		
					},[])
				this.handleStateChange('',targetProgram.targetprogram, '',pCode);
			}
	}
	handleStateChange=(e,tabState,subTabState,formSelect)=>{
		//console.log(tabState,'tabState',subTabState,formSelect, 'on state,change')
		const thisTabState = (tabState===null)?
				tabState=this.state.activeTab:
				tabState;
		
		const tabArray = thisTabState.split('__');
		
		var subTab = '';
		var tab = '';
		var tabPanel = '';
		var subTabPanel = '';
		
		if(tabArray.length < 2){
			//console.log(thisTabState,' single tab')
			subTab = '';
			tab = thisTabState;
			tabPanel = tab+'_panel';
			subTabPanel = tab+'_panel';
		}else{
			subTab = thisTabState;
			tab = tabArray[0];
			tabPanel = tab+'_panel';
			subTabPanel = subTab+'_panel';
		}
		
		if(subTabState)subTab=subTabState;
		
		const updatedState = update(
		   this.state,{
			   'activeTab':{$set:tab},
			   'activePanel':{$set:tabPanel},
   			   'activeSubTab':{$set:subTab},
			   'activeSubPanel':{$set:subTabPanel},
			   'formSelect':{$set:formSelect}
		   }
		)	  
	   this.setState(updatedState)
		
	}
	
	
	
	handleParentState=(e,tab,subtab,props)=>{
		//console.log(props,' on parent change')
		const updatedState = update(
		   this.state,{
			   'formSelect':{$set:props}
		   }
		)	  
	   this.setState(updatedState)	  
	}
	
	
	
	render(){
	const globalDates = {apply:this.props.programs.edges[0].node.applyBy, start:this.props.programs.edges[0].node.startClasses}
	  return (
		<ThemeProvider theme={theme}>
			<Icons/>
			<Header {...this.props.tabbedContent} location={this.state.location} onStateChange={this.handleStateChange} state={this.state}/>
		    <Page className="pageContainer tabbedLayout">   
			    
				<Main className="mainContainer">

					<ContentArea className="contentArea">
						<Hero {...this.props.heroArea}
						location={this.state.location} />
						
						{(this.props.callout && this.props.callout.content.display)?(
							<Callout
								{...this.props.callout.content}
								/>
							)
							:null
						}
						<FormPanel 
							{...this.props.formSettings}
							state={this.state} 
							programs={this.props.programs} 
							location={this.state.location}
							isSingle={false}/>
						
						<GeneralContent
							className="introduction-section"
							{...this.props.introduction}
							/>
						<ProgramContent 
							{...this.props.programContent} 
							programs={this.props.programs} 
							location={this.state.location}
							dates={globalDates}
							/>
						
						 
						<section className="content-wrapper section-columns section-columns-2">
							<div className="desktop-shim">
								<section className="tuition-section has-background-perushade">
									<h3 dangerouslySetInnerHTML={{__html:this.props.tuitionSection.headline.replace(/(<([/fp]+)>)/ig,"").replace(/ (?=[^ ]*$)/i, "&nbsp;")}}/>
									<div className="general-content" dangerouslySetInnerHTML={{__html:this.props.tuitionSection.content}}/>	
								</section>
								<section className="apply-section has-background-perumediumblue has-text-color-white">
									<h3 dangerouslySetInnerHTML={{__html:this.props.applySection.headline.replace(/(<([/fp]+)>)/ig,"").replace(/ (?=[^ ]*$)/i, "&nbsp;")}}/>
									<div className="general-content" dangerouslySetInnerHTML={{__html:this.props.applySection.content}}/>	
								</section>
							</div>
						</section>
						
						<GeneralContent
							className="education-section"
							{...this.props.educationSection}
						>
							<TabbedArea 
								location={this.state.location} 
								{...this.props.tabbedContent} 
								onParentStateChange={this.handleParentState} 
								onStateChange={this.handleStateChange} 
								state={this.state}/>
						</GeneralContent>
						
						<Testimonial {...this.props.testimonial}/>
						<Awards {...this.props.awards}/>
						<Bottom {...this.props.bottomContentSection}/>						
					</ContentArea>

					
					<Footer/>
				</Main>
				<nav className="mobileBottomBar">
					<ScrollIntoView selector="#leadform" className="buttonContainer" alignToTop={true}>
						<button className="button action" type="button">Request Info</button>
					</ScrollIntoView>
					<div  className="buttonContainer">
						<a className="button tertiary" href={"tel:+1"+this.props.formSettings.phone.replace(/\D/g,'')}>Call Us</a>
					</div>
				</nav>
		    </Page>
	    </ThemeProvider>
	
  )
  }
}