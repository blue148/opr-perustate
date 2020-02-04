import React from "react"
import styled from "styled-components"


const ContentBox = styled.section`
	color:white;
	display:grid;
	grid-template:auto/1fr;
	@media (min-width:768px){
		grid-template: 1fr/1fr 1fr;
	}
	justify-items:center;
	align-items:center;
	background-color:${props=>props.theme.mediumgray};
	margin: 0 -1rem;
`
const Content = styled.div`
	color:white;
	font-size:1.6rem;
	p, blockquote{
		text-align:center;
		}
	p{
		span{
		font-weight:600;
		font-style:italic;
		}
	}
`
const ImageBox = styled.div`
	overflow:hidden;
	width:275px;
	height:275px;
	margin:1rem auto;
	border-radius:50%;
	img{
		width: 100%;
	    height: auto;
    }
`

export default class Testimonial extends React.Component{
	
	render(){
		const {image, content} = this.props;
		const imgBg = (image)?image.fields.file.en_US.url:'';
		return(
			<ContentBox key={this.props.index}>
				<ImageBox>
					<img src={imgBg} alt="testimonial"/>
				</ImageBox>
                <Content dangerouslySetInnerHTML={{__html:content}}/>
              </ContentBox>
			
		)
	}
}