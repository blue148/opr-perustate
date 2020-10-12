import React from "react"
import './bottomsection.scss'


export default class MainArea extends React.Component{
	
	render(){
		const { headline, content}= this.props
		//remove and p and f tags to clean up the code then add nbsp in the last space for text wrapping.
		const cleanHeadline = (headline)?headline.replace(/(<\/?span[^>]*>|<\/?p[^>]*>|<\/?f[^>]*>)/ig,"").replace(/ (?=[^ ]*$)/i, "&nbsp;"):'';


		return(
			<section className="bottomsection">
				<div className="desktop-shim">
		            <h3 dangerouslySetInnerHTML={{__html:cleanHeadline}}/>
		            <div className="bottomsection_content" dangerouslySetInnerHTML={{__html:content}}/>
		        </div>
		    </section>
			
		)
	}
}