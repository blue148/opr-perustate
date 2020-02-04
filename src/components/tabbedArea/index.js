import React from "react"
import Tabs from 'react-responsive-tabs';
import ReactMarkdown from "react-markdown"
import slugify from 'slugify'
import 'react-responsive-tabs/styles.css';
import './tabs.scss';


const GetTabs = (props) => {
//check for subtabs/nested. If none, process flat tabs. Otherwise process subtabs as well	
	const tabs =  Object.keys(props).map((program, index) => { 
		const slug = props[program].tabName?slugify(props[program].tabName):slugify(props[program].pageName);
		const tabItem = (props[program].tabName)?
				{
					title:[<span id={slug.toLowerCase()} key={program}/>,props[program].tabName],
					getContent: () => <Tabs items={getSubTabs(props[program])} showMore={false} key={index}/>,
					key:index,
					tabClassName:'tab',
					panelClassName:'nestedPanel'
				}:
				{
					title: [<span id={slug.toLowerCase()} key={program}/>,props[program].pageName],
					getContent: () => <><a name={props[program].pageName}/><ReactMarkdown source={props[program].programDetails.programDetails}/></>,
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
	const subTabs = programs.map((program, index) => {
		const subTabItem={
	    	title: [<span id={props.programs[index].pageName} key={index}/>,props.programs[index].pageName],
			getContent: () =>  <ReactMarkdown source={props.programs[index].programDetails.programDetails}/>,
		    key: index,
		    tabClassName: 'subtab',
		    panelClassName: 'programPanel'
	    }
	    return subTabItem;
	  });
	return subTabs;  
	
}

export default class Tabbed extends React.Component{
	
	render(){
		console.log(this.props, 'tabbedArea')
		return(
		<GetTabs {...this.props}/>			
		)
	}
}