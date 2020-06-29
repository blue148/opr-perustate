import React from "react"
import Icon from '../../images/icons'
import {useMediaQuery} from '../hooks';
import {Button} from '../uiElements'
import './hero.scss';


//need to pull the icon by name
const Items = (props) =>{
	if(props==='') return false;
	return(

	<section className="iconGrid">
		 {
			 Object.keys(props).map((item, index)=>{
			 const text = props[item].content.tagline
			 return(
				<div key={index} className="iconStack">
					<div className="iconBox">
						<Icon name={props[item].content.icon} fill="#000"/>
					</div>
					<p dangerouslySetInnerHTML={{__html:text.replace(/(<([/fp]+)>)/ig,"")}}/>
				</div>
			)}
		)}
	</section>
	)
}

export default function HeroArea(props){
		const desktop = useMediaQuery('(min-width:768px)');

		const {image, headline, subHeadline, itemsType} = props
		const imgBg = (image)?image.fields.file.en_US.url:'';
		
		const backgroundImageProps = desktop?{backgroundImage:'url('+imgBg+')'}:null
		
		//remove and p and f tags to clean up the code then add nbsp in the last space for text wrapping.
		const cleanHeadline = (headline)?headline.replace(/(<([/fp]+)>)/ig,""):'';
		const subHeadlineCheck = (subHeadline==='<p><br></p>')?null:subHeadline;
		const cleanSubHead = (subHeadlineCheck)?subHeadline.replace(/(<([/f]+)>)/ig,"").replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '<br />'):'';
		const cleanBullets = (props.bullets)?props.bullets.replace(/(<([/f]+)>)/ig,""):null;

		return(
			<section key={props.index} className="HeroBox" style={backgroundImageProps}>
				<div className="desktop-shim">
	                <h1 dangerouslySetInnerHTML={{__html:cleanHeadline}} className="HeroHeadline"/>
	                {(cleanSubHead)?
		                (<h2 dangerouslySetInnerHTML={{__html:cleanSubHead}} className="HeroSubHeadline"/>)
		                :null
		            }
	                {(itemsType==='bullets')?
		                (<div className="HeroBullets" dangerouslySetInnerHTML={{__html:cleanBullets}}/>)
		                :
		                (props.items)?(<Items {...props.items}/>):null
		            }
	
					<Button label="Request Info" theme="primary" jumplink="leadform" className="hero-button"/>
				</div>
              </section>
			
		)
}