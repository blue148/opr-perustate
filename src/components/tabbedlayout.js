import React from "react"

import {ApplyNowButton} from './uiElements'
import Header from "./header/header"
import Hero from "./heroArea"
import MainArea from "./mainArea"
import TabbedArea from "./tabbedArea/tabs"
import Accolades from "./accolades"
import Testimonial from "./testimonial"
import Awards from "./awards"
import Bottom from "./bottomContentSection"
import Footer from "./footer"
import FormPanel from "./form/form"
import Callout from "./callout/callout"
import update from 'immutability-helper'
import styled, {ThemeProvider} from "styled-components"
import "./tabbedlayout.scss"
import Icons from "../images/symbol-defs.svg"
import ScrollIntoView from 'react-scroll-into-view'
const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!./_variables.scss');

const Page = styled.div`

`
const Main = styled.main`
`

const ContentArea = styled.section`
	
`
const MobileBottomBar = styled.nav`
	width:100%;
	background:black;
	position:fixed;
	bottom:-300px;
	height:65px;
	display:grid;
	grid-template-columns: 1fr 1fr;
	align-items:center;
	justify-items:center;
	z-index:30000;
	transition:bottom .5s;
	&>div{
	    width: 100%;
	    text-align: center;
		.button{
			font-size:1rem;
			height:75%;
			width:80%;
			padding:.6rem;
			}
		}
	@media(min-width:768px){
		display:none;
		}
	&.expose{
		bottom:0px;
`
export default class Layout extends React.Component{
	constructor(props){
		super(props)
		
		this.state = {activeTab:'', 
			activePanel:'',
			activeSubTab:'', 
			activeSubPanel:'',
			formSelect:'',
			location:'',
			callout:false,
			mobileInView:false}
	}
	
	
	componentDidMount(){
		this.setState({location:window.location},()=>this.drillDown(this.state.location));
		this.setState({callout:(this.props.callout)?this.props.callout.content.display:false});
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
	
	handleMobileScrollState = (mobileInView)=>{
		const updatedState = update(
			this.state,{
				'mobileInView':{$set:(mobileInView)?mobileInView:false}
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

	  return (
		<ThemeProvider theme={theme}>
			<Icons/>
			
			<Header 
				{...this.props.tabbedContent} 
				className={(!this.state.mobileInView)?'shiftTop':null}
				location={this.state.location} 
				onStateChange={this.handleStateChange} 
				state={this.state}
				children={(this.state.callout)?(
								<Callout
								{...this.props.callout.content}
								/>
							)
							:null
						}
			/>
		    <Page className={[(!this.state.mobileInView)?'shiftTop':null,"pageContainer"].join(' ')}>   
			    
				<Main className="mainContainer">

					<ContentArea className="contentArea">
					    <Hero {...this.props.heroArea}
							location={this.state.location} 
							onMobileScroll = {this.handleMobileScrollState}
							/>
						
						
						<MainArea {...this.props.mainContentSection} />
						<TabbedArea 
							location={this.state.location} 
							{...this.props.tabbedContent} 
							onParentStateChange={this.handleParentState} 
							onStateChange={this.handleStateChange} 
							state={this.state}/>
						<Accolades {...this.props.accolades}/>
						<Testimonial {...this.props.testimonial}/>
						<Awards {...this.props.awards}/>
						<Bottom {...this.props.bottomContentSection}/>						
					</ContentArea>

					<FormPanel 
						{...this.props.formSettings}
						state={this.state} 
						programs={this.props.programs} 
						location={this.state.location}
						isSingle={false}/>
					<Footer/>
				</Main>
				<MobileBottomBar className={(!this.state.mobileInView)?'expose':null}>
					<ScrollIntoView selector="#leadform" className="buttonContainer" alignToTop={true}>
						<button className="button action" type="button">Learn More</button>
					</ScrollIntoView>
					<div  className="buttonContainer">
						<ApplyNowButton className="header-item" location={this.props.location}/>
					</div>
				</MobileBottomBar>
		    </Page>
	    </ThemeProvider>
	
  )
  }
}