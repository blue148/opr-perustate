import React from "react"
import styled from 'styled-components'
import {Button} from '../uiElements'
import './programInfo.scss';

const ButtonArea = styled.div`
	display:grid;
	grid-template-columns:1fr 1fr;
	grid-auto-flow:column;
	grid-auto-columns:1fr;
	grid-column-gap:.5rem;
	justify-content:center;
	margin:2rem auto;
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
		<>
			<h3>{props.pageName}</h3>
			<Info {...props}/>
			<div className="program-info program-info-dates">
				<Dates title="Apply By" items={props.applyBy}/>
				<Dates title="Start Classes" items={props.startClasses}/>
			</div>
			<div className="program-info-details" dangerouslySetInnerHTML={{__html:props.programDetails.content}}/>
			<ButtonArea>
				<StyledButton label="Apply Now" theme="secondary" outlink="https://online.peru.edu/apply-now"/>
				<StyledButton label="Request Info" theme="tertiary mobile-only" jumplink='leadform'/>
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