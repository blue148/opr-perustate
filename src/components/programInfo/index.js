import React from "react"
import ReactMarkdown from "react-markdown"
import styled from 'styled-components'
import {Button, Tab} from '../uiElements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import './programInfo.scss';

const ButtonArea = styled.div`
	display:grid;
	grid-template:1fr/auto;
	grid-auto-flow:column;
	grid-column-gap:.5rem;
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
	})
	return(
	 <div className="program-info program-info-area">
	 {infoItem}
	 </div>)
}


////STRUCTURE AND CONTENT FOR TAB PANEL
const PanelContent = (props)=>{
	return (
		<>
			<h3>{props.pageName}</h3>
			<Info {...props}/>
			<div className="program-info program-info-dates">
				<Dates title="Apply By" items={props.applyBy}/>
				<Dates title="Start Classes" items={props.startClasses}/>
			</div>
			<div className="program-info-details">
				<ReactMarkdown source={props.programDetails.programDetails}/>
			</div>
			<ButtonArea>
				<Button label="Apply Now" theme="secondary" outlink="https://online.peru.edu/apply-now"/>
				<Button label="Request Info" theme="tertiary mobile-only" jumplink='leadform'/>
			</ButtonArea>
		</>
	)
}

export default class ProgramInfo extends React.Component{
	
	render(){
		return(			
			<PanelContent {...this.props}/>
		)
	}
}