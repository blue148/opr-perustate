import React from "react"
import styled from "styled-components"
import Tabs from 'react-responsive-tabs';
import ReactMarkdown from "react-markdown"
import 'react-responsive-tabs/styles.css';
import './tabs.scss';


const GetTabs = (props) => {
//check for subtabs/nested. If none, process flat tabs. Otherwise process subtabs as well	
console.log(props)
	const tabs =  Object.keys(props).map((program, index) => { 
		const tabItem = (props[program].tabName)?
				{
					title:props[program].tabName,
					getContent: () => <Tabs items={getSubTabs(props[program])} showMore={false} />,
					key:index,
					tabClassName:'tab',
					panelClassName:'nestedPanel'
				}:
				{
					title: props[program].programTitle,
					getContent: () => <ReactMarkdown source={props[program].programDetails.programDetails}/>,
				    key: index,
				    tabClassName: 'tab',
				    panelClassName: 'programPanel',
				}
		return tabItem;
		   
	  });
	 
	 return <Tabs items={tabs} showMore={false}/>;
}
function getSubTabs(props){
	const {programs} = props;
	if(!programs)return;
	const subTabs = programs.map((program, index) => ({
    	title: props.programs[index].programTitle,
		getContent: () => <ReactMarkdown source={props.programs[index].programDetails.programDetails}/>,
	    key: index,
	    tabClassName: 'subtab',
	    panelClassName: 'programPanel',
	  }));
	return subTabs;  
	
}

export default class Tabbed extends React.Component{
	
	render(){
		const { headline, content}= this.props
		return(
		<GetTabs {...this.props}/>			
		)
	}
}