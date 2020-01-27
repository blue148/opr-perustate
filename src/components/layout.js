import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Hero from "./heroArea"
import MainArea from "./mainArea"
import Tabbed from "./tabbedArea"
import Accolades from "./accolades"
import Testimonial from "./testimonial"
import Awards from "./awards"
import Bottom from "./bottomContentSection"
import Footer from "./footer"
import Form from "./form"
import styled from "styled-components"
import "./layout.css"
import Icons from "../images/symbol-defs.svg"

const Page = styled.div`
max-width:1200px;
margin 0 315px 0 auto;
position:relative;

`
const Main = styled.div`
	margin: 0 auto;
	padding: 72px 2rem 2rem;
`
const StyledForm = styled(Form)`
	grid-column:2/3;
`
const StyledHeader = styled(Header)`

`
export default class Layout extends React.Component{
	
	render(){
  //console.log(this.props)
  return (
    <Page>
    <Icons/>
    <Form/>
    <Header />
      <Main>
      <Hero 
      index={this.props.index}
      {...this.props.heroArea}/>
      <MainArea {...this.props.mainContentSection}/>
      <Tabbed {...this.props.tabbedContent}/>
      <Accolades {...this.props.accolades}/>
      <Testimonial {...this.props.testimonial}/>
      <Awards {...this.props.awards}/>
      <Bottom {...this.props.bottomContentSection}/>
      <Footer/>
      </Main>
    </Page>
  )
  }
}