import React from "react"
import styled from 'styled-components'
import {ApplyNowButton} from '../uiElements'
import Icon from '../../images/icons'
import Calendar from '../../icons/icon-calendar-bg.svg'
import './content-section.scss';

const MainBox = styled.section`
	margin-top:0;
`

const ItemStack = styled.div``


////STRUCTURE FOR THE APPPLY AND START DATE LISTS
const Dates = (props) =>{
	const {items, title} = props;
	//CREATE LIST OF DATES FROM PROVIDED CSV STRING
	const list = (items)?items.split(',').map((item,index)=>(<li key={index}>{item}</li>)):'';
	//CREATE ID FRIENDLY STRING FROM TITLE
	const elemId = title.split(' ').join('').toLowerCase();
	return (
		<div className="programInfoItem programInfoDate" id={elemId.charAt(0)+elemId.slice(1)}>
			<p>{title}</p>
			<ul>{list}</ul>
		</div>
	)
}

////STRUCTURE AND CONTENT FOR INFO AREA OF EACH PROGRAM PANEL
const Info = (props) =>{
	const {items} = props.programInfo;
	const infoItem = Object.keys(items).map((item,index)=>{	
			if(index>=3)return false;
			return (
				<ItemStack key={index} className="iconStack">
					<div className="iconBox">
						<Icon name={items[item].content.icon}/>
					</div>
					<p className="programInfoItem" id={item} key={index} dangerouslySetInnerHTML={{
						__html:items[item].content.tagline
						.replace(/(<([/fp]+)>)/ig,"")
						.replace(/<\/?span[^>]*>/ig,"")
						.replace(/ (?=[^ ]*$)/i, "&nbsp;")}}/>
				</ItemStack>
			)
		
		
	})
	return(
		<>
			<h4>Program Highlights</h4>
			 <section className="program-info program-callouts" key={props.itemKey}>
			 
			 	{infoItem}
			 </section>
		 </>
	 )
}

const CareerPanel = (props)=>{
	const {headline}=props;
	const headlineFmt = ()=>{
		const headlineClean = (headline)?
		headline
		.replace(/<\/?br[^>]*>/ig,"")
		.replace(/(<([/fp]+)>)/ig,"")
		.replace(/<\/?span[^>]*>/ig,"")
		.replace(/ (?=[^ ]*$)/i, "&nbsp;"):null;
		
		const finalHeadline = (headlineClean)?
		 <h3 dangerouslySetInnerHTML={{__html:headlineClean}}/>:null;
		 return finalHeadline;
	 }
	
	return(
		<section className="careerSection" key={props.panelKey}>
			{headlineFmt()}
			<div className="program-info-career" dangerouslySetInnerHTML={{__html:props.content}}/>
		</section>
	)
	}


export default class GeneralContent extends React.Component{

	handleClose = (e,target,formSelect) =>{
		//console.log(formSelect,' onClose')
		e.preventDefault();
		const tabArray = target.split('__');
		if(tabArray.length<2){
			this.props.onStateChange(e,'','',formSelect);
		}else{
			this.props.onStateChange(e,tabArray[0],'',formSelect);
		}
	}
	handleParentChange = (e,props)=>{
		//console.log(props,' parent change')
		this.props.onParentStateChange(props);
		this.props.onStateChange(e,null,'',props);
	}
	handleClickOutside = (e) => {
		e.preventDefault();
		this.props.onStateChange(e,null,'','');
	}

	render(){
		//add nbsp in the last space for text wrapping.
		const cleanHeadline = this.props.headline.replace(/(<([/fp]+)>)/ig,"").replace(/ (?=[^ ]*$)/i, "&nbsp;");

		return(		
			<MainBox className="">
				<div className="desktop-shim">
					<section className={this.props.className}>
						<h3 dangerouslySetInnerHTML={{__html:cleanHeadline}}/>
						<div className="program-info-details" dangerouslySetInnerHTML={{__html:this.props.content}}/>	
					</section>
				</div>
			</MainBox>
		)
	}
}



