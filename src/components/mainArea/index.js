import React from "react"
import styled from "styled-components"


const MainBox = styled.section`

`
const MainHeadline = styled.h2`
	color:${props=>props.theme.brandblue};
`
const MainContent = styled.div`
	width:75%;
	margin:0 auto;
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