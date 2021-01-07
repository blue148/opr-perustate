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
import LeadFormApp from "./form"
//import FormPanelGQL from "./form/formgql"
import Callout from "./callout/callout"
import update from 'immutability-helper'
import styled, {ThemeProvider} from "styled-components"
import "./singleprogramlayout.scss"
import Icons from "../images/symbol-defs.svg"
import ScrollIntoView from 'react-scroll-into-view'


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
						<LeadFormApp 
							{...this.props.formSettings}
							state={this.state} 
							programs={this.props.programs} 
							location={this.state.location}
							isSingle={true}

						/>
						<ProgramContent {...this.props.programContent} programs={this.props.programs} location={this.state.location}/>
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