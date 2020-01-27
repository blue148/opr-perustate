import React from "react"
import styled from "styled-components"


const ContentBox = styled.section`
	color:white;
	display:grid;
	grid-template: 1fr/1fr 1fr;
	justify-items:center;
	align-items:center;
	background-color:#666;
`
const Content = styled.p`
	color:white;
	font-size:1.6rem;
`
const Image = styled.img`
`

export default class Testimonial extends React.Component{
	
	render(){
		const {image, content} = this.props.testimonial
		return(
			<ContentBox key={this.props.index}>
				<Image src={image.fields.file.en_US.url} alt="testimonial image"/>
                <Content dangerouslySetInnerHTML={{__html:content}}/>
              </ContentBox>
			
		)
	}
}