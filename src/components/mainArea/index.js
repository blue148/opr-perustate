import React from "react"
import './main-area.scss'


export default class MainArea extends React.Component{
	render(){
		const { headline, content}= this.props;
		//remove and p and f tags to clean up the code then add nbsp in the last space for text wrapping.
		const cleanHeadline = (headline)?headline.replace(/(<([/fp]+)>)/ig,"").replace(/ (?=[^ ]*$)/i, "&nbsp;"):'';

		return(
			<section className="mainArea">
				<div className="desktop-shim">
	                <h2 dangerouslySetInnerHTML={{__html:cleanHeadline}}/>
	                <div className="mainArea_content" dangerouslySetInnerHTML={{__html:content}}/>
				</div>
			</section>
			
		)
	}
}