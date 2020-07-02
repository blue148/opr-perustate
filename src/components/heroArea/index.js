import React from "react"
import styled from "styled-components"
import Icon from '../../images/icons'
import {Button} from '../uiElements'
import { InView } from 'react-intersection-observer'
import './hero.scss';
import PSC20Badge from '../../images/psc-20-in-20-badge-02.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'


const HeroBox = styled.section`
`
const HeroHeadline = styled.h1`
	
`
const ItemsBox = styled.section`
	
`
const ItemStack = styled.div`
	
`
const StyledButton = styled(Button)`
	

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
		const backgroundImageProps = {
			backgroundImage: 'url('+imgBg+')'
		};

		//remove and p and f tags to clean up the code then add nbsp in the last space for text wrapping.
		const cleanHeadline = (headline)?headline.replace(/(<([/fp]+)>)/ig,""):'';
		const subHeadlineCheck = (subHeadline==='<p><br></p>')?null:subHeadline;
		const cleanSubHead = (subHeadlineCheck)?subHeadline.replace(/(<([/f]+)>)/ig,"").replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '<br />'):'';
		const cleanBullets = (this.props.bullets)?this.props.bullets.replace(/(<([/f]+)>)/ig,""):null;

		return(
			<HeroBox key={this.props.index} backgroundImage={imgBg} className="HeroBox" style={backgroundImageProps}>
				<div className="desktop-shim special-insert">
					<div className="specialty-badge">
						<PSC20Badge/>
					</div>
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
	
					<InView onChange={(inView, entry) => this.props.onMobileScroll(inView)} className="hero-button-area">
						<StyledButton label="Request Info" theme="primary" jumplink="leadform" className="hero-button"/>
					</InView>				
				</div>
              </HeroBox>
			
		)
	}
}