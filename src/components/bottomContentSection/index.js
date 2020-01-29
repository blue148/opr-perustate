import React from "react"
import styled from "styled-components"


const MainBox = styled.section`
	background-color:${props=>props.theme.shade};
	margin:0 -1rem -1rem;
	padding:1rem;
`
const MainHeadline = styled.h3`
	color:${props=>props.theme.brandblue};
`
const MainContent = styled.div`
	max-width:75%;
	margin:0 auto;
`

export default class MainArea extends React.Component{
	
	render(){
		const { headline, content}= this.props
		return(
			<MainBox >
                <MainHeadline dangerouslySetInnerHTML={{__html:headline}}/>
                <MainContent dangerouslySetInnerHTML={{__html:content}}/>
              </MainBox>
			
		)
	}
}