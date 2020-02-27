import React from "react"
import styled from "styled-components"
import './main-area.scss'


const MainBox = styled.section`
	margin-top:0;
`
const MainHeadline = styled.h2`

`
const MainContent = styled.div`
	margin:0 auto;
	width:100%;	
	@media(min-width:768px){
		width:95%;
		max-width:850px;
	}
`

export default class MainArea extends React.Component{
	
	render(){
		const { headline, content}= this.props;
		//remove and p and f tags to clean up the code then add nbsp in the last space for text wrapping.
		const cleanHeadline = (headline)?headline.replace(/(<([/fp]+)>)/ig,"").replace(/ (?=[^ ]*$)/i, "&nbsp;"):'';

		return(
			<MainBox className="mainArea">
				<div className="desktop-shim">
	                <MainHeadline dangerouslySetInnerHTML={{__html:cleanHeadline}}/>
	                <MainContent dangerouslySetInnerHTML={{__html:content}}/>
				</div>
			</MainBox>
			
		)
	}
}