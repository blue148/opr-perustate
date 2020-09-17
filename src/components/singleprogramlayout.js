import React from "react"

import Header from "./header/header"
import Hero from "./heroArea"
import ProgramContent from './programContent'
import Accolades from "./accolades"
import Testimonial from "./testimonial"
import Awards from "./awards"
import Bottom from "./bottomContentSection"
import Footer from "./footer"
import FormPanel from "./form/form"
import Callout from "./callout/callout"
import update from 'immutability-helper'
import styled, {ThemeProvider} from "styled-components"
import "./singleprogramlayout.scss"
import Icons from "../images/symbol-defs.svg"
import ScrollIntoView from 'react-scroll-into-view'
/// --> Apollo Setup

import fetch from 'cross-fetch'
import { 
	ApolloProvider,
	ApolloClient, 
	InMemoryCache, 
	HttpLink  
} from '@apollo/client';



require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const crmConfig = {
	midpoint:process.env.GATSBY_AE_ENDPOINT,
	apiKey:process.env.GATSBY_AE_KEY
  
}
const { midpoint,apiKey} = crmConfig;

/// --> ApolloClient
const gqlClient = new ApolloClient({
	link: new HttpLink({
		uri: midpoint,
		headers: {'x-api-key':apiKey},
		fetch
		
	}),		
	cache: new InMemoryCache(),
	
})


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
		const targetProgram = (this.props.programContent.programCode)?'PERU_'+this.props.programContent.programCode.replace(' - ','_'):'PERU_UNDERGRAD_UNDECIDED';
		this.state = {activeTab:'', activePanel:'',activeSubTab:'', activeSubPanel:'',formSelect:targetProgram}
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
	  	return (
			<ApolloProvider client={gqlClient}>
				<ThemeProvider theme={theme}>
					<Icons/>
					<Header className="singleProgramPage" {...this.props.tabbedContent} location={this.state.location} onStateChange={this.handleStateChange} state={this.state}/>
				    <Page className="singleProgramPage">   
					    
						<Main clasName="mainContainer">
		
							<ContentArea className="contentArea">
								<Hero {...this.props.heroArea} location={this.state.location}/>
								{(this.props.callout && this.props.callout.content.display===true)?(
									<Callout
										{...this.props.callout.content}
										/>
									)
									:null
								}
								<ProgramContent {...this.props.programContent} programs={this.props.programs} location={this.state.location}/>
								<Accolades {...this.props.accolades} />
								<Testimonial {...this.props.testimonial}/>
								<Awards {...this.props.awards}/>
								<Bottom {...this.props.bottomContentSection}/>						
							</ContentArea>
		
							<FormPanel 
								{...this.props.formSettings}
								state={this.state} 
								programs={this.props.programs} 
								location={this.state.location}
								isSingle={true}/>
							<Footer/>
						</Main>
						<MobileBottomBar>
							<ScrollIntoView selector="#leadform" className="buttonContainer" alignToTop={true}>
								<button className="button action" type="button">Request Info</button>
							</ScrollIntoView>
							<div  className="buttonContainer">
								<a className="button tertiary" href={"tel:"+this.props.formSettings.phonenumber}>Call Us</a>
							</div>
						</MobileBottomBar>
				    </Page>
			    </ThemeProvider>
			</ApolloProvider>
		)
  	}
}