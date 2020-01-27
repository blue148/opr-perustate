import React from "react"
import styled from "styled-components"


const MainBox = styled.section`

`
const MainHeadline = styled.h2`
	color:#055591;
	font-size:1.4rem;
`
const MainContent = styled.div`
	display:grid;
`

export default class MainArea extends React.Component{
	
	render(){
		const { headline, content}= this.props
		return(
			<MainBox key={this.props.index}>
                <MainHeadline dangerouslySetInnerHTML={{__html:headline}}/>
                <MainContent dangerouslySetInnerHTML={{__html:content}}/>
              </MainBox>
			
		)
	}
}