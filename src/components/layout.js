import React from "react"

import Header from "./header"
import Hero from "./heroArea"
import MainArea from "./mainArea"
import Tabbed from "./tabbedArea"
import Accolades from "./accolades"
import Testimonial from "./testimonial"
import Awards from "./awards"
import Bottom from "./bottomContentSection"
import Footer from "./footer"
import FormPanel from "./form"
import styled, {ThemeProvider} from "styled-components"
import "./layout.css"
import Icons from "../images/symbol-defs.svg"
import ScrollIntoView from 'react-scroll-into-view'

const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!./_variables.scss');

const Page = styled.div`
	position:relative;
`
const Main = styled.main`
	margin-top:72px;
	display:grid;
	grid-template:auto/1fr;
	@media (min-width: 768px) {
		grid-template:1fr/auto 350px;
	}

`

const ContentArea = styled.section`
	margin:0;
	padding: 0 1rem;	
	@media (min-width:7678px){
		margin:0px 0px 0px 2rem;
		max-width:100%;
	}
`
const Container = styled.section`
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
	render(){
	  return (
		 <ThemeProvider theme={theme}>
		<Icons/>
	    <Page>   
		    <Header {...this.props.tabbedContent}/>
			<Main>
				
				<Container>
					<ContentArea>
						<Hero {...this.props.heroArea}/>
						<MainArea {...this.props.mainContentSection}/>
						<Tabbed {...this.props.tabbedContent}/>
						<Accolades {...this.props.accolades}/>
						<Testimonial {...this.props.testimonial}/>
						<Awards {...this.props.awards}/>
						<Bottom {...this.props.bottomContentSection}/>
										
					</ContentArea>
				</Container>
				<FormPanel phone={this.props.phonenumber} headline={this.props.formheadline}/>
				<Footer/>
			</Main>
			<MobileBottomBar>
				<ScrollIntoView selector="#leadform" className="buttonContainer">
					<button className="button action" type="button">Learn More</button>
				</ScrollIntoView>
					<div><button className="button tertiary" type="button" tel={this.props.phonenumber}>Call Us</button></div>
			</MobileBottomBar>
	    </Page>
	    </ThemeProvider>
	
  )
  }
}