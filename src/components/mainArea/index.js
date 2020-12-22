import React from "react"
import './main-area.scss'


export default class MainArea extends React.Component{
	render(){
		const { headline, content}= this.props;
		//remove and p and f tags to clean up the code then add nbsp in the last space for text wrapping.
		//console.log(this.props.introductionList, 'list');
		const cleanHeadline = (headline)?headline.replace(/(<([/fp]+)>)/ig,"").replace(/ (?=[^ ]*$)/i, "&nbsp;"):'';

		return(
			<section className={["mainArea", this.props.className].join(' ')}>
				<div className="desktop-shim">
	                <h2 dangerouslySetInnerHTML={{__html:cleanHeadline}}/>
	                <div className="mainArea_content" dangerouslySetInnerHTML={{__html:content}}/>
	                { this.props.introductionList &&
		                <div className="introductionListArea">
			                <h2 dangerouslySetInnerHTML={{__html:this.props.introductionList.headline}}/>
			                <div className="mainArea_content" dangerouslySetInnerHTML={{__html:this.props.introductionList.content}}/>
			            </div>
	               }
				</div>
			</section>
			
		)
	}
}

