import React from "react"

import Header from "./header/header"
import Hero from "./heroArea"
import MainArea from "./mainArea"
import TabbedArea from "./tabbedArea/tabs"
//import TabbedArea from "./tabbedArea"
import Accolades from "./accolades"
import Testimonial from "./testimonial"
import Awards from "./awards"
import Bottom from "./bottomContentSection"
import Footer from "./footer"
import FormPanel from "./form/form"
import update from 'immutability-helper'
import styled, {ThemeProvider} from "styled-components"
import "./layout.css"
import Icons from "../images/symbol-defs.svg"
import ScrollIntoView from 'react-scroll-into-view'

const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!./_variables.scss');

const Page = styled.div`
	position:fixed;
	overflow:scroll;
	height:100vh;
	top:90px;
`
const Main = styled.main`
	overflow-y:visible;
	display:grid;
	grid-template:auto/1fr;
	@media (min-width: 768px) {
		grid-template:1fr/auto;
		padding-bottom:70px;
	}

`

const ContentArea = styled.section`
	margin:0;
	padding: 0 1rem;	
	@media (min-width:7678px){
		margin:0px 0px 0px 2rem;
		max-width:100%;
	}
	overflow:hidden;
	grid-column:1;
	margin-top:0;
	padding-bottom:1rem;
	@media (min-width: 768px) {
		grid-column:1/2;
		grid-row:1;
	}
`
const MobileBottomBar = styled.div`
	width:100%;
	background:black;
	position:fixed;
	bottom:0px;
	height:65px;
	display:grid;
	grid-template-columns: 1fr 1fr;
	align-items:center;
	justify-items:center;
	z-index:30000;
	&>div{
	    width: 100%;
	    text-align: center;
		.button{
			height:75%;
			width:80%;
			}
		}
	@media(min-width:768px){
		display:none;
		}
`
export default class Layout extends React.Component{
	constructor(props){
		super(props)
		this.state = {activeTab:'', activePanel:'',activeSubTab:'', activeSubPanel:'',formSelect:''}
		//console.log(props, 'master')
	}
	
	
	
	handleStateChange=(e,tabState,subTabState,formSelect)=>{
		//console.log(tabState, subTabState, 'state change')
		if(tabState===null)tabState=this.state.activeTab;
		
		const tabArray = tabState.split('__');
		
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
	
	
	
	handleParentState=(props)=>{

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
			<Header {...this.props.tabbedContent} onStateChange={this.handleStateChange} state={this.state}/>
		    <Page>   
			    
				<Main>

					<ContentArea>
						<Hero {...this.props.heroArea}/>
						<MainArea {...this.props.mainContentSection}/>
						<TabbedArea {...this.props.tabbedContent} onParentStateChange={this.handleParentState} onStateChange={this.handleStateChange} state={this.state}/>
						<Accolades {...this.props.accolades}/>
						<Testimonial {...this.props.testimonial}/>
						<Awards {...this.props.awards}/>
						<Bottom {...this.props.bottomContentSection}/>						
					</ContentArea>

					<FormPanel phone={this.props.phonenumber} headline={this.props.formheadline} state={this.state} programs={this.props.programs}/>
					<Footer/>
				</Main>
				<MobileBottomBar>
					<ScrollIntoView selector="#leadform" className="buttonContainer" alignToTop={true}>
						<button className="button action" type="button">Request Info</button>
					</ScrollIntoView>
					<div  className="buttonContainer">
						<a className="button tertiary" href={"tel:"+this.props.phonenumber}>Call Us</a>
					</div>
				</MobileBottomBar>
		    </Page>
	    </ThemeProvider>
	
  )
  }
}