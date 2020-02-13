import React from "react"
import Tabs from 'react-responsive-tabs';
import ReactMarkdown from "react-markdown"
import slugify from 'slugify'
import styled from 'styled-components'
import {Button} from '../uiElements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import 'react-responsive-tabs/styles.css';
import './tabs.scss';

////CREATE A BUTTONAREA WITH STYLED COMP TO AVOID NAMING CONFLICTS
const ButtonArea = styled.div`
	
`
////THIS GENERATES THE TABS FOR THE SECTION. IT ALSO CALLS TO THE SUBTABS METHOD IF THERE ARE ASSOCIATED PROGRAMS.
const GetTabs = (props) => {	
	const tabs =  Object.keys(props).map((program, index) => { 
		//create a slug out of the name of the page.
		const slug = slugify(props[program].tabName?(props[program].tabName):(props[program].pageName),{remove: /[*+~.()'"!:@]/g,lower:true});
		//if this tab has linked program files, create subtabs
		const tabItem = (props[program].programs)?
				{
					title:[<span id={slug} key={program}/>,props[program].pageName],
					getContent: () => <Tabs items={getSubTabs(props[program])} showMore={false} key={index} transformWidth={800}/>,
					key:index,
					tabClassName:'tab',
					panelClassName:'nestedPanel',
					id:{slug}
				}:
				{
					title: [<span id={slug} key={program}/>,props[program].pageName],
					getContent: () => <><ReactMarkdown source={props[program].programDetails.programDetails}/></>,
				    key: index,
				    tabClassName: 'tab',
				    panelClassName: 'programPanel',
				}
		return tabItem;
		   
	  });
	 
	 return <Tabs items={tabs} showMore={false} transformWidth={800}/>;
}

////THIS IS THE METHOD TO CREATE THE SUBTABS FOR EACH ASSOCIATED PROGRAM
function getSubTabs(props){
	console.log(props,' getSubTabs')
	///USES <SUBTABITEMS> TO RENDER OUT EACH SUBTAB "TAB"
	const {programs} = props;
	//IF THERE ARE NOT A PROGRAMS OBJECT, RETURN
	if(!programs)return;
	
	const subTabs = programs.map((program, index) => {
		//build panel content
		const subTabItem={
	    	title: <SubTabItem 
	    				key={index} 
	    				title={props.programs[index].pageName}
	    				parent={props.pageName}
	    			/>,
			getContent: () => <><PanelContent {...props.programs[index]}/></>,
		    key: index,
		    tabClassName: 'subtab',
		    panelClassName: 'programPanel'
	    }
	    return subTabItem;
	  });
	return subTabs;  
	
}

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
				return (<p className="programInfoItem" id={item} key={index}><strong>{name}ll</strong> {props[item]}</p>)
			}
			return false
			}
	})
	return infoItem;
}


////STRUCTURE AND CONTENT FOR TAB PANEL
const PanelContent = (props)=>{
	return (
		<>
			<h2>{props.pageName}</h2>
			<Info {...props}/>
			<Dates title="Apply By" items={props.applyBy}/>
			<Dates title="Start Classes" items={props.startClasses}/>
			<ReactMarkdown source={props.programDetails.programDetails}/>
			<ButtonArea>
				<Button label="Apply Now" theme="secondary" outlink="https://online.peru.edu/apply-now"/>
				<Button label="Request Info" theme="tertiary mobile-only" jumplink='leadform'/>
			</ButtonArea>
		</>
	)
}

////STRUCTURE AND FORMAT FOR NESTED SUBTAB ITEMS
const SubTabItem = (props) =>{
	const chainId = props.parent+'__'+props.title;
	return (
		<>
			<p>
				<span id={slugify(chainId,{remove: /[*+~.()'"!:@]/g, lower:true})}/>
				{props.title}
			</p>
			<FontAwesomeIcon icon={faChevronRight} className="darkgrey" size="lg"/>
		</>
	)
}




export default class Tabbed extends React.Component{
	
	render(){
		//console.log(this.props, 'tabbedArea')
		return(
		<GetTabs {...this.props}/>			
		)
	}
}