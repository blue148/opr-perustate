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
		const { headline, content}= this.props
		return(
			<MainBox className="mainArea">
				<div className="desktop-shim">
	                <MainHeadline dangerouslySetInnerHTML={{__html:headline}}/>
	                <MainContent dangerouslySetInnerHTML={{__html:content}}/>
				</div>
			</MainBox>
			
		)
	}
}