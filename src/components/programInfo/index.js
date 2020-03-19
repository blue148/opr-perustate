import React from "react"
import styled from 'styled-components'
import {Button} from '../uiElements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import Icon from '../../images/icons'
import './programInfo.scss';


const ButtonArea = styled.div`
	display:grid;
	grid-template-columns:1fr 1fr;
	grid-auto-flow:column;
	grid-auto-columns:1fr;
	grid-column-gap:.5rem;
	justify-content:center;
	background: -moz-linear-gradient(top,  rgba(255,255,255,0) 0%, rgba(255,255,255,1) 38%, rgba(255,255,255,1) 100%);
	background: -webkit-linear-gradient(top,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 38%,rgba(255,255,255,1) 100%);
	background: linear-gradient(to bottom,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 38%,rgba(255,255,255,1) 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 );
	padding-top:2rem;
	@media (min-width:768px){
		grid-template-columns:max-content;
		grid-auto-columns:max-content;
		background: transparent;
	}
		
`
const CloseButton = styled.a`
	margin-bottom:.3rem;
	font-size:25px;
	color:${props=>props.theme.darkgray};
    float: right;
    margin-top: 0px;
    margin-right: 0px;
}
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
			<h4 dangerouslySetInnerHTML={{__html:headline.replace(/ (?=[^ ]*$)/i, "&nbsp;")}}/>
			<div className="program-info-career" dangerouslySetInnerHTML={{__html:props.content}}/>
		</section>
	)
	}

////STRUCTURE AND CONTENT FOR TAB PANEL
const PanelContent = (props)=>{
	return (
		<section className="program-content-area">
			
			<section className="program-details-area">
				<Info {...props}/>
				<section className="program-info program-dates">
					<Dates title="Apply By" items={props.applyBy}/>
					<Dates title="Start Classes" items={props.startClasses}/>
					<Button label="Apply Now" className="applyButton" theme="secondary" outlink="https://online.peru.edu/apply-now">
						Apply Now
					</Button>
					<span className="bg-image">
						<Icon name="symbol-defs_svg__icon-calendar" />
					</span>
				</section>
			</section>
			<section className="program-info-details" dangerouslySetInnerHTML={{__html:props.programDetails.content}}/>
			{(props.careerOpportunities)?
				<CareerPanel panelKey={props.id+'-'+props.itemKey} content={props.careerOpportunities.content} headline={props.careerOpportunities.headline}/>
				:null}
			
		</section>
	)
}

export default class ProgramInfo extends React.Component{

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
		const cleanHeadline = this.props.pageName.replace(/ (?=[^ ]*$)/i, "&nbsp;");
		return(		
			<>
				<CloseButton
						href="#"
						className="menu-close mobile-only"
						onClick={(e)=>this.handleClose(e,this.props.id,'')}
						aria-label="Close program details">
						<span className="sr-only">Close</span>
						<FontAwesomeIcon icon={faTimesCircle}/>
					</CloseButton>
				<h3 dangerouslySetInnerHTML={{__html:cleanHeadline}}/>	
				<PanelContent {...this.props}/>
				<ButtonArea className="program-info-buttons">
					<Button label="Request Info" theme="primary mobile-only" jumplink='leadform' onClick={(e)=>this.handleParentChange(e,this.props.programLink)}>
						Request Info
					</Button>
					<Button label="Apply Now" theme="secondary" outlink="https://online.peru.edu/apply-now">
						Apply Now
					</Button>
					
				</ButtonArea>
			</>
		)
	}
}



