import React from "react"
import styled from "styled-components"
import './bottomsection.scss'


const MainBox = styled.section`
	background-color:${props=>props.theme.lightgray};
	margin:0 -1rem -1rem;
	padding-bottom:3rem;
	@media (min-width:768px){
		background-color:${props=>props.theme.shade};
		
		}
	
`
const MainHeadline = styled.h3`

`
const MainContent = styled.div`
	margin:0 auto;
	@media(min-width:768px){
		width:95%;
		max-width:850px;
		text-align:center;
	}
`

export default class MainArea extends React.Component{
	
	render(){
		const { headline, content}= this.props
		const cleanHeadline = (headline)?headline.replace(/(<([/fp]+)>)/ig,""):'';//remove and p and f tags to clean up the code.

		return(
			<MainBox className="bottomsection">
			<div className="desktop-shim">
                <MainHeadline dangerouslySetInnerHTML={{__html:cleanHeadline}}/>
                <MainContent dangerouslySetInnerHTML={{__html:content}}/>
            </div>
          </MainBox>
			
		)
	}
}