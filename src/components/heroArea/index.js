import React from "react"
import styled from "styled-components"
import Icon from '../../images/icons'
import {Button} from '../uiElements'
import './hero.scss';


const HeroBox = styled.section`
	@media (min-width:768px){
		background-image:${props=> `url(${props.backgroundImage})`};
	}
`
const HeroHeadline = styled.h1`
	color:white;
	z-index:2;
	text-shadow:rgba(0,0,0,.5) -3px 3px 10px;
	@media (min-width:768px){
		margin: 2rem auto;
		width: 100%;
		}
`
const ItemsBox = styled.section`
	
`
const ItemStack = styled.div`
	
`
const StyledButton = styled(Button)`
	padding: 1rem 0;
	width:80%;
	width:75vw;
	margin:0 auto;
		@media (min-width:768px){
			display:none;
		}

`
//need to pull the icon by name
const Items = (props) =>(
	<ItemsBox className="iconGrid">
		 {Object.keys(props).map((item, index)=>{
			 const text = props[item].content.tagline
			 return(
				<ItemStack key={index} className="iconStack">
					<div className="iconBox">
						<Icon name={props[item].content.icon} fill="#000"/>
					</div>
					<p dangerouslySetInnerHTML={{__html:text}}/>
				</ItemStack>
			)}
		)}
	</ItemsBox>
	)
export default class HeroArea extends React.Component{
	
	render(){
		const {image, headline, items} = this.props
		const imgBg = (image)?image.fields.file.en_US.url:'';
		//remove and p and f tags to clean up the code then add nbsp in the last space for text wrapping.
		const cleanHeadline = (headline)?headline.replace(/(<([/fp]+)>)/ig,"").replace(/ (?=[^ ]*$)/i, "&nbsp;"):'';

		return(
			<HeroBox key={this.props.index} backgroundImage={imgBg} className="HeroBox">
				<div className="desktop-shim">
	                <HeroHeadline dangerouslySetInnerHTML={{__html:cleanHeadline}} className="HeroHeadline"/>
					<Items {...items}/>
	
					<StyledButton label="Learn More" theme="primary" jumplink="leadform" className="hero-button"/>
				</div>
              </HeroBox>
			
		)
	}
}