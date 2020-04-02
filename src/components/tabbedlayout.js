import React from "react"

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
			font-size:1rem;
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
	}
	
	
	componentDidMount(){
		
		if(this.props.location.search){
			const targetProgram = JSON.parse('{"' + this.props.location.search.substring(1).replace(/&/g, '","').replace(/=/g,'":"') + '"}')||'';
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

	  return (
		<ThemeProvider theme={theme}>
			<Icons/>
			<Header {...this.props.tabbedContent} location={this.props.location} onStateChange={this.handleStateChange} state={this.state}/>
		    <Page className="pageContainer">   
			    
				<Main className="mainContainer">

					<ContentArea className="contentArea">
						<Hero {...this.props.heroArea}
						location={this.props.location} />
						{(this.props.callout)?(
							<Callout
								{...this.props.callout.content}
								/>
							)
							:null
						}
						
						<MainArea {...this.props.mainContentSection}/>
						<TabbedArea 
							location={this.props.location} 
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
						phone={this.props.phonenumber} 
						headline={this.props.formheadline} 
						state={this.state} 
						programs={this.props.programs} 
						location={this.props.location}
						isSingle={false}/>
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