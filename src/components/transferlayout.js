import React from "react"

import Header from "./header/header"
import Hero from "./heroArea"
import Testimonial from "./testimonial"
import GeneralContent from "./contentSection"
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
		//console.log(props, 'master')
		this.state={location:''};
	}
	
	componentDidMount(){
		this.setState({location:window.location});
	}
	
	handleStateChange=(formSelect)=>{
		const updatedState = update(
		   this.state,{
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
		console.log(this.state)
	  return (
		<ThemeProvider theme={theme}>
			<Icons/>
			<Header className="singleProgramPage" location={this.state.location} onStateChange={this.handleStateChange} state={this.state}/>
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
						<FormPanel 
							{...this.props.formSettings}
							//phone={this.props.phonenumber} 
							//headline={this.props.formheadline} 
							state={this.state} 
							programs={this.props.programs} 
							location={this.state.location}
							isSingle={true}/>
						<GeneralContent
							className="introduction-section"
							{...this.props.introduction}
							/>
						<GeneralContent
							className="tuition-section"
							{...this.props.tuitionSection}
							/>
						<GeneralContent
							className="education-section"
							{...this.props.educationSection}
							/>
						<GeneralContent
							className="apply-section"
							{...this.props.applySection}
							/>
							
						<Testimonial {...this.props.testimonial}/>
						<Bottom {...this.props.bottomContentSection}/>						
					</ContentArea>

					
					<Footer/>
				</main>
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