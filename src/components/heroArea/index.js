import React from "react"
import styled from "styled-components"
import Icon from '../../images/icons'
import {Button} from '../uiElements'
import './hero.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'


const HeroBox = styled.section`
		background-image:${props=> `url(${props.backgroundImage})`};
		background-position:center top;
	    background-repeat: no-repeat;
		background-size:auto 100%;
		&::before{
			content:'';
			top:0;
			bottom:0;
			left:0;
			right:0;
			background-color:rgba(50,59,74,.75);
			position:absolute;
			z-index:1;
		}
	@media (min-width:768px){
		background-position: left top;
	    background-size: cover;

	}
`
const HeroHeadline = styled.h1`
	
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
	z-index: 3;
    border-radius: 5px;
	@media (min-width:768px){
		display:none;
	}

`
//need to pull the icon by name
const Items = (props) =>{
	if(props==='') return false;
	return(

	<ItemsBox className="iconGrid">
		 {
			 Object.keys(props).map((item, index)=>{
			 const text = props[item].content.tagline
			 return(
				<ItemStack key={index} className="iconStack">
					<div className="iconBox">
						<Icon name={props[item].content.icon} fill="#000" className="desktopIcon"/>
						<FontAwesomeIcon icon={faCheck} className="mobileIcon"/>
					</div>
					<p dangerouslySetInnerHTML={{__html:text.replace(/(<([/fp]+)>)/ig,"")}}/>
				</ItemStack>
			)}
		)}
	</ItemsBox>
	)
	}
export default class HeroArea extends React.Component{
	
	render(){
		const {image, headline, subHeadline, itemsType} = this.props
		const imgBg = (image)?image.fields.file.en_US.url:'';
		//remove and p and f tags to clean up the code then add nbsp in the last space for text wrapping.
		const cleanHeadline = (headline)?headline.replace(/(<([/fp]+)>)/ig,""):'';
		const subHeadlineCheck = (subHeadline==='<p><br></p>')?null:subHeadline;
		const cleanSubHead = (subHeadlineCheck)?subHeadline.replace(/(<([/f]+)>)/ig,"").replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '<br />'):'';
		const cleanBullets = (this.props.bullets)?this.props.bullets.replace(/(<([/f]+)>)/ig,""):null;

		return(
			<HeroBox key={this.props.index} backgroundImage={imgBg} className="HeroBox">
				<div className="desktop-shim">
	                <HeroHeadline dangerouslySetInnerHTML={{__html:cleanHeadline}} className="HeroHeadline"/>
	                {(cleanSubHead)?
		                (<h2 dangerouslySetInnerHTML={{__html:cleanSubHead}} className="HeroSubHeadline"/>)
		                :null
		            }
	                {(itemsType==='bullets')?
		                (<div className="HeroBullets" dangerouslySetInnerHTML={{__html:cleanBullets}}/>)
		                :
		                (this.props.items)?(<Items {...this.props.items}/>):null
		            }
	
					<StyledButton label="Request Info" theme="primary" jumplink="leadform" className="hero-button"/>
				</div>
              </HeroBox>
			
		)
	}
}