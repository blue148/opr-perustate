import React from "react"
import styled from "styled-components"
import './testimonial.scss'


const ContentBox = styled.section`
	color:white;
	background-color:${props=>props.theme.mediumgray};
	margin: 0 -1rem;
`
const Content = styled.div`
	color:white;
	font-size:1.6rem;
	p, blockquote{
		text-align:center;
		line-height:1.3;
		}
	blockquote{
		font-size:1.5rem;
		border-bottom:solid 1px ${props=>props.theme.lightgray};
		padding-bottom:1.8rem;
		font-weight:400;
		margin:0;
		@media (min-width:768px){
			padding-bottom:0;
			border-bottom:none;
		}
	}
	p{
		span{
		font-size:1.2rem;
		font-weight:600;
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
		const {image, content} = this.props.testimonial||this.props;
		const imgBg = (image)?image.fields.file.en_US.url:'';
		return(
			<ContentBox className="testimonialarea">
				<div className="desktop-shim">
					<ImageBox>
						<img src={imgBg} alt="testimonial"/>
					</ImageBox>
	                <Content dangerouslySetInnerHTML={{__html:content}}/>
				</div>
			</ContentBox>
			
		)
	}
}