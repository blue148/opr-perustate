import React from "react"

import Header from "./header/header"
import Hero from "./heroArea"
import ProgramContent from './programContent'
import Accolades from "./accolades"
import Testimonial from "./testimonial"
import Awards from "./awards"
import Bottom from "./bottomContentSection"
import BottomBar from "./bottomBarMenu/bottomBarMenu"
import Footer from "./footer"
import LeadFormApp from "./form/formgql"
//import FormPanelGQL from "./form/formgql"
import Callout from "./callout/callout"

import update from 'immutability-helper'
import styled, {ThemeProvider} from "styled-components"
import "./singleprogramlayout.scss"
import Icons from "../images/symbol-defs.svg"
import ScrollIntoView from 'react-scroll-into-view'
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
const ContentArea = styled.section`
	
`
export default class Layout extends React.Component{
	constructor(props){
		super(props)
		//console.log(this.props.programContent.programCode,'programCode');
		const targetProgram =this.props.programContent.programCode;
		
		//if env var USE_API === StudentHub, else "Pass-Thru"
		const formSelectValue = (targetProgram && !targetProgram.startsWith('PERU_'))?'PERU_'+targetProgram.replace(' - ','_'):targetProgram;
		this.state = {activeTab:'', activePanel:'',activeSubTab:'', activeSubPanel:'',formSelect:formSelectValue}
	}
	
	componentDidMount(){
		this.setState({location:window.location});
	}
	
	handleStateChange=(e,tabState,subTabState,formSelect)=>{
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
			//console.log('layout',this.props)
	  return (
		<ThemeProvider theme={theme}>
			<Icons/>
			<Header className="singleProgramPage" {...this.props.tabbedContent} location={this.state.location} onStateChange={this.handleStateChange} state={this.state}/>
		    <Page className="pageContainer singleProgram">   
			    
				<main>

					<ContentArea className="contentArea">
						<Hero {...this.props.heroArea} location={this.state.location}/>
						
						{(this.props.callout && this.props.callout.content.display===true)?(
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
								isSingle={true}
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
								origin={"Website_RFI"}
								partnerCode={partnerCode}
								programFocus = {null}
								programList={this.props.programs}
								programSelect = {null}
							/>
						</ApolloProvider>
						
						<ProgramContent 
							{...this.props.programContent} 
							programs={this.props.programs} 
							location={this.state.location}
							video_id={this.props.video_id}/>
						<Accolades {...this.props.accolades} />
						<Testimonial {...this.props.testimonial}/>
						<Awards {...this.props.awards}/>
						<Bottom {...this.props.bottomContentSection}/>						
					</ContentArea>

					
					<Footer/>
				</main>
				<BottomBar phone={this.props.formSettings.phone}/>
			</Page>
	    </ThemeProvider>
	
  )
  }
}