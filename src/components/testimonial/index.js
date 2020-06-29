import React from "react"
import styled from "styled-components"
import './testimonial.scss'


const ContentBox = styled.section`
`
const Content = (props)=>{
	return <div className={props.className} dangerouslySetInnerHTML={{__html:props.content}}/>
}
const ImageBox = (props)=>(
	<div className={props.className}>{props.children}</div>
)

export default class Testimonial extends React.Component{
	
	render(){
		const {image, content} = this.props.testimonial||this.props;
		const imgBg = (image)?image.fields.file.en_US.url:'';
		return(
			<ContentBox className="testimonialarea">
				<div className="desktop-shim">
					<ImageBox className="testimonialarea-image-box">
						<img src={imgBg} alt="testimonial"/>
					</ImageBox>
	                <Content className="testimonialarea-content" content={content}/>
				</div>
			</ContentBox>
			
		)
	}
}