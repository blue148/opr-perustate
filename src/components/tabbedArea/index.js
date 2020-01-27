import React from "react"
import styled from "styled-components"
import Tabs from 'react-responsive-tabs';
import ReactMarkdown from "react-markdown"
import 'react-responsive-tabs/styles.css';
import './tabs.css';


const GetTabs = (props) => {
	
	const tabs =  Object.keys(props).map((program, index) => {
		return(
			{
				title:programs[program].tabName,
				getContent: () => {<Tabs items={getSubTabs(props[program])} showMore={false} />
				},
				key:index,
				tabClassName:'tab',
				panelClassName:'panel'
				}
	    	)
		   
	  });
	 
	 return <Tabs items={tabs}/>;
}
function getSubTabs(props){
	//console.log(props,' subtabs')
	return props.programs.map((program, index) => ({
    	title: props.programs[index].programTitle,
		getContent: () => <ReactMarkdown source={props.programs[index].programDetails.programDetails}/>,
	    key: index,
	    tabClassName: 'subtab',
	    panelClassName: 'panel',
	  }));
	
}

export default class Tabbed extends React.Component{
	
	render(){
		const { headline, content}= this.props
		return(
		<GetTabs {...this.props}/>			
		)
	}
}