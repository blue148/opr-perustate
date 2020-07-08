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

const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!./_variables.scss');

const Page = styled.div`
	
`
const Main = styled.main`
	

`

const ContentArea = styled.section`
	
`
const MobileBottomBar = styled.div`
	
`
export default class Layout extends React.Component{
	constructor(props){
		super(props)

		this.state = {activeTab:'', activePanel:'',activeSubTab:'', activeSubPanel:'',formSelect:this.props.programContent.programCode}
		//console.log(props, 'master')
	}
	
	componentDidMount(){
		this.setState({location:window.location});
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
	handleMobileScrollState = (mobileInView)=>{
		
		const updatedState = update(
			this.state,{
				'mobileInView':{$set:(mobileInView)?mobileInView:false}
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
			<Header className="singleProgramPage" {...this.props.tabbedContent} location={this.state.location} onStateChange={this.handleStateChange} state={this.state}/>
		    <Page className="pageContainer">   
			    
				<Main>

					<ContentArea className="contentArea">
						<Hero 
							{...this.props.heroArea} 
							location={this.state.location} 
							onMobileScroll = {this.handleMobileScrollState}
						/>
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
						//phone={this.props.phonenumber} 
						//headline={this.props.formheadline} 
						state={this.state} 
						programs={this.props.programs} 
						location={this.state.location}
						isSingle={true}/>
					<Footer/>
				</Main>
				<nav className={['mobileBottomBar',(!this.state.mobileInView)?'expose':null].join(' ')}>
					<ScrollIntoView selector="#leadform" className="buttonContainer" alignToTop={true}>
						<button className="button action" type="button">Request Info</button>
					</ScrollIntoView>
					<div  className="buttonContainer">
						<a className="button tertiary" href={"tel:"+this.props.phonenumber}>Call Us</a>
					</div>
				</nav>
		    </Page>
	    </ThemeProvider>
	
  )
  }
}