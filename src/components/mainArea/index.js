import React from "react"
import styled from "styled-components"


const MainBox = styled.section`

`
const MainHeadline = styled.h2`
	color:${props=>props.theme.brandblue};
`
const MainContent = styled.div`
	margin:0 auto;
	width:100%;		
	@media(min-width:768px){
		width:95%;
	}
`

export default class MainArea extends React.Component{
	
	render(){
		const { headline, content}= this.props
		return(
			<MainBox className="mainArea">
                <MainHeadline dangerouslySetInnerHTML={{__html:headline}}/>
                <MainContent dangerouslySetInnerHTML={{__html:content}}/>
              </MainBox>
			
		)
	}
}