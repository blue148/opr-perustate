
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
import BottomBar from "./bottomBarMenu/bottomBarMenu"
import Footer from "./footer"
import LeadFormApp from "./form/formgql.js"
import Callout from "./callout/callout"
import VideoSection from "./videoSection"
//import {ApplyNowButton} from './uiElements'
import update from 'immutability-helper'
import styled, {ThemeProvider} from "styled-components"
import "./transferlayout.scss"
import Icons from "../images/symbol-defs.svg"
import ScrollIntoView from 'react-scroll-into-view'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPhone} from '@fortawesome/free-solid-svg-icons'
import {version } from "../../package.json"

import {  
	ApolloProvider,
	ApolloClient, 
	InMemoryCache 
} from '@apollo/client';
/*import Cookies from 'universal-cookie';
const cookies = new Cookies();*/

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const crmConfig = {
	midpoint:process.env.GATSBY_ASH_ENDPOINT,
	apiKey: process.env.GATSBY_APIKEY,
	campusCode: process.env.GATSBY_CAMPUSCODE,
	clientPrefix: process.env.GATSBY_CLIENTPREFIX,
	collegeCode: process.env.GATSBY_COLLEGECODE,
	partnerCode: process.env.GATSBY_PARTNERCODE
	 
}
const { 
	apiKey,
	campusCode,
	clientPrefix,
	collegeCode,
	midpoint,
	partnerCode } = crmConfig;



const gqlClient = new ApolloClient({
	uri: midpoint,
	headers: {'x-api-key':apiKey},
	cache: new InMemoryCache()
})

const clientCTPA = "By submitting this form, I am providing my digital signature agreeing that Peru State College may email me or contact me regarding educational services by telephone and/or text message utilizing automated technology at the telephone number(s) provided above. I understand this consent is not a condition to attend Peru State College or to purchase any other goods or services."


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
		this.state = {
			activeTab:'', 
			activePanel:'',
			activeSubTab:'', 
			activeSubPanel:'',
			formSelect:'',
			location:'',
			toggler:false
			}
	}
	
	
	componentDidMount(){
		this.setState({location:window.location},()=>this.drillDown(this.state.location));
		
	}
	drillDown = (location)=>{
		if(!location.search)return false;
		const targetProgram = JSON.parse('{"' + location.search.substring(1).replace(/&/g, '","').replace(/=/g,'":"') + '"}')||'';
			//find program code
			if(targetProgram.targetprogram){
				const tArr = targetProgram.targetprogram.split('__');
				const pageSlug = (tArr[1])?tArr[1]:tArr[0];
				const pCode = Object.keys(this.props.programs.nodes).reduce((result, item)=>{
					if(this.props.programs.nodes[item].pageSlug===pageSlug)result.push(this.props.programs.nodes[item].programCode);
					return result;		
					},[])
				this.handleStateChange('',targetProgram.targetprogram, '',pCode);
			}
	}
	handleStateChange=(e,tabState,subTabState,formSelect)=>{
		const thisTabState = (tabState===null)?
				tabState=this.state.activeTab:
				tabState;
		
		const tabArray = thisTabState.split('__');
		
		var subTab = '';
		var tab = '';
		var tabPanel = '';
		var subTabPanel = '';
		
		if(tabArray.length < 2){
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
		const updatedState = update(
		   this.state,{
			   'formSelect':{$set:props}
		   }
		)	  
	   this.setState(updatedState)	  
	}
	
	
	
	render(){
	const {programs, startClasses, applyBy} = this.props;
	///get the apply Date from the current page, if blank, get it from the first programInfo 
	console.log(this.props);
	console.log(applyBy);
	const applyDate = applyBy || programs.nodes[0].applyBy;
	const startDate = startClasses || programs.nodes[0].startClasses;
	//const globalDates = {apply:programs.nodes[0].applyBy, start:programs.nodes[0].startClasses}
	  return (
		<ThemeProvider theme={theme}>
			<Icons/>
			<Header {...this.props.tabbedContent} location={this.state.location} onStateChange={this.handleStateChange} state={this.state}/>
		    <Page className={"pageContainer tabbedLayout transferLayout "+this.props.slug}>   
			    
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

							
						<ApolloProvider client={gqlClient} >
							<LeadFormApp 
								{...this.props.formSettings}
								state={this.state} 
								location={this.state.location}
								isSingle={false}
								{...this.props.programContent}
								
								campusCode = {campusCode}
								campusToggle = {null}
								cid={'sidebar'}
								clientCTPA = {clientCTPA}
								clientPrefix = {clientPrefix}
								collegeCode={collegeCode}
								defaultPhone = {this.props.formSettings.phone}
								formFocus={'rfiForm'}
								formtype={"crm"}
								formversion={version}
								midpoint={midpoint}
								origin={"TRANSFER_WEBSITE_RFI"}
								partnerCode={partnerCode}
								programFocus = {null}
								programList={this.props.programs}
								programSelect = {null}
							/>
						</ApolloProvider>
						
						<MainArea
							className="introduction-section"
							{...this.props.introduction}
							introductionList={this.props.introductionList}
							/>
						<VideoSection
							{...this.props}
						/>
						<ProgramContent 
							{...this.props.programContent} 
							programs={this.props.programs} 
							location={this.state.location}
							dates={{apply: applyDate, start:startDate}}
							/>
						<GeneralContent
							className="learning-section"
							{...this.props.learningSection}
						/>
						<GeneralContent
							className="tuition-section"
							includeEl={<img src="https://online.peru.edu/wp-content/uploads/2020/08/Peru-state-partner-site-image.png"/>}
							{...this.props.tuitionSection}
						>
						</GeneralContent>
						<GeneralContent
							className="apply-section has-background-perushade"
							{...this.props.applySection}
							includeApply={true}
						>	
						</GeneralContent>	 
						 
						
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
				<BottomBar phone={this.props.formSettings.phone}/>
			</Page>
	    </ThemeProvider>
	
  )
  }
}