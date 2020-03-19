import React from "react"
import styled from 'styled-components'
import {ApplyNowButton, Button} from '../uiElements'
import Icon from '../../images/icons'
import './programContent.scss';

const MainBox = styled.section`
	margin-top:0;
`

const ItemStack = styled.div``


////STRUCTURE FOR THE APPPLY AND START DATE LISTS
const Dates = (props) =>{
	//CREATE LIST OF DATES FROM PROVIDED CSV STRING
	const list = props.items.split(',').map((item,index)=>(<li key={index}>{item}</li>))
	//CREATE ID FRIENDLY STRING FROM TITLE
	const elemId = props.title.split(' ').join('').toLowerCase();
	return (
		<div className="programInfoItem programInfoDate" id={elemId.charAt(0)+elemId.slice(1)}>
			<p>{props.title}</p>
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
	const headline = props.headline||'Career Opportunities';
	return(
		<section className="careerSection" key={props.panelKey}>
			<h3 dangerouslySetInnerHTML={{__html:headline.replace(/(<([/fp]+)>)/ig,"").replace(/<\/?span[^>]*>/ig,"").replace(/ (?=[^ ]*$)/i, "&nbsp;")}}/>
			<div className="program-info-career" dangerouslySetInnerHTML={{__html:props.content}}/>
		</section>
	)
	}

////STRUCTURE AND CONTENT FOR TAB PANEL
const PanelContent = (props)=>{
	return (
		<>
			<section className="program-details-area">
				<Info {...props} programInfo={props.programInfo}/>
				<section className="program-info program-dates">
					<Dates title="Apply By" items={props.applyBy}/>
					<Dates title="Start Classes" items={props.startClasses}/>
					<ApplyNowButton location={props.location}/>
					<span className="bg-image">
						<Icon name="symbol-defs_svg__icon-calendar" />
					</span>
				</section>
			</section>
			{(props.careerOpportunities)?
				<CareerPanel panelKey={props.id+'-'+props.itemKey} content={props.careerOpportunities.content} headline={props.careerOpportunities.headline}/>
				:null}
			
		</>
	)
}

export default class ProgramContent extends React.Component{

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
		const cleanHeadline = this.props.programDetails.headline.replace(/(<([/fp]+)>)/ig,"").replace(/ (?=[^ ]*$)/i, "&nbsp;");

		return(		
			<MainBox className="mainArea singleProgram">
				<div className="desktop-shim">
					<section className="program-intro">
						<h3 dangerouslySetInnerHTML={{__html:cleanHeadline}}/>
						<div className="program-info-details" dangerouslySetInnerHTML={{__html:this.props.programDetails.content}}/>	
					</section>
					<PanelContent {...this.props}/>
				</div>
			</MainBox>
		)
	}
}



