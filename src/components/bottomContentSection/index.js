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
	*{
		display:block;
		text-align:center;
		font-size:1rem;
		}
	@media(min-width:768px){
		width:95%;
		max-width:850px;
	}
`

export default class MainArea extends React.Component{
	
	render(){
		const { headline, content}= this.props
		return(
			<MainBox className="bottomsection">
			<div className="desktop-shim">
                <MainHeadline dangerouslySetInnerHTML={{__html:headline}}/>
                <MainContent dangerouslySetInnerHTML={{__html:content}}/>
            </div>
          </MainBox>
			
		)
	}
}