import React from "react"

import Header from "./header/header"
import Hero from "./heroArea"
import MainArea from "./mainArea"
import TabbedArea from "./tabbedArea/tabs"
import Accolades from "./accolades"
import Testimonial from "./testimonial"
import Awards from "./awards"
import Bottom from "./bottomContentSection"
import BottomBar from "./bottomBarMenu/bottomBarMenu"
import Footer from "./footer"
import LeadFormApp from "./form"
import Callout from "./callout/callout"
import VideoSection from "./videoSection"
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
				const pCode = Object.keys(this.props.programs.nodes).reduce((result, item)=>{
					if(this.props.programs.nodes[item].pageSlug===pageSlug)result.push(this.props.programs.nodes[item].programCode);
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
		//console.log(thisTabState, tabState)
		const tabArray = thisTabState.split('__');
		
		var subTab = '';
		var tab = '';
		var tabPanel = '';
		var subTabPanel = '';
/// --> Check if thisTabState is a compound name, meaning that it is a child (parentName__child-name)		
		if(tabArray.length < 2){
/// --> this is a parent tab
			subTab = '';
			tab = thisTabState;
			tabPanel = tab+'_panel';
			subTabPanel = tab+'_panel';
		}else{
/// --> this is a child tab
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
			<Header {...this.props.tabbedContent} location={this.state.location} onStateChange={this.handleStateChange} state={this.state}/>
		    <Page className={["pageContainer tabbedLayout", this.props.slug+"-layout"].join(' ')}>   
			    
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
						<LeadFormApp 
							{...this.props.formSettings}
							state={this.state} 
							programs={this.props.programs} 
							location={this.state.location}
							isSingle={false}
							{...this.props.programContent}
						/>
						
						<MainArea {...this.props.mainContentSection} />
						<VideoSection
							{...this.props}
						/>
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

					
					<Footer/>
				</Main>
				<BottomBar phone={this.props.formSettings.phone}/>

		    </Page>
	    </ThemeProvider>
	
  )
  }
}