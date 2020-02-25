import React from "react"
import styled from 'styled-components'
import onClickOutside from "react-onclickoutside"
import {Button} from '../uiElements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import './programInfo.scss';

const ButtonArea = styled.div`
	display:grid;
	grid-template-columns:1fr 1fr;
	grid-auto-flow:column;
	grid-auto-columns:1fr;
	grid-column-gap:.5rem;
	justify-content:center;
	
	@media (min-width:768px){
		grid-template-columns:max-content;
		grid-auto-columns:max-content;
	}
		
`
const StyledButton = styled(Button)`
	justify-self:center;
	width:100%;
	a{
		width:auto;
		@media (min-width:768px){
			width:300px;
		}
	}

`
const CloseButton = styled.a`
	margin-bottom:.3rem;
	font-size:25px;
	color:${props=>props.theme.darkgray};
    float: right;
    margin-top: -17px;
    margin-right: -10px;
}
`


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
	const infoArray = ['transferrableCredits','tuition','creditHours','totalCost'];
	const infoItem = Object.keys(props).map((item,index)=>{
		if(infoArray.indexOf(item)>-1){
			const nameSpaced = item.split(/(?=[A-Z])/).join(' ');
			const name = nameSpaced.charAt(0).toUpperCase()+nameSpaced.slice(1);
			if(props[item]!= null){
				return (<p className="programInfoItem" id={item} key={index}><strong>{name}</strong> {props[item]}</p>)
			}
			return false
			}
		return true
	})
	return(
		 <div className="program-info program-info-area">
		 	{infoItem}
		 </div>
	 )
}


////STRUCTURE AND CONTENT FOR TAB PANEL
const PanelContent = (props)=>{
	return (
		<div className="program-content-area">
			
			<div className="program-details-area">
				<Info {...props}/>
				<div className="program-info program-info-dates">
					<Dates title="Apply By" items={props.applyBy}/>
					<Dates title="Start Classes" items={props.startClasses}/>
				</div>
			</div>
			<div className="program-info-details" dangerouslySetInnerHTML={{__html:props.programDetails.content}}/>
			
		</div>
	)
}

export default class ProgramInfo extends React.Component{

	handleClose = (e,formSelect) =>{
		console.log(formSelect,' onClose')
		e.preventDefault();
		this.props.onStateChange(e,null,'',formSelect);
	}
	handleParentChange = (e,props)=>{
		console.log(props,' parent change')
		this.props.onParentStateChange(props);
		this.props.onStateChange(e,null,'',props);
	}
	handleClickOutside = (e) => {
		e.preventDefault();
		this.props.onStateChange(e,null,'','');
	}
	render(){
		//console.log(this.props, 'program info')
		return(		
			<>
				<CloseButton
						href="#"
						className="menu-close mobile-only"
						onClick={(e)=>this.handleClose(e,'')}
						aria-label="Close program details">
						<span className="sr-only">Close</span>
						<FontAwesomeIcon icon={faTimesCircle}/>
					</CloseButton>
				<h3>{this.props.pageName}</h3>	
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



