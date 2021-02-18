import React from "react"
import './bottomsection.scss'


export default class MainArea extends React.Component{
	
	render(){
		const { headline, content}= this.props
		//remove and p and f tags to clean up the code then add nbsp in the last space for text wrapping.
		const cleanHeadline = (headline)?headline.replace(/(<\/?span[^>]*>|<\/?p[^>]*>|<\/?f[^>]*>)/ig,"").replace(/ (?=[^ ]*$)/i, "&nbsp;"):'';
		const image = '<img src="https://online.peru.edu/wp-content/uploads/2020/08/peru_cat_statue_border.png"/>'
		const fullContent = (props,items) =>{
			console.log(props, 'props')
			console.log(items, 'items')
			return (props+items)
			
		}
			

		return(
			<section className="bottomsection">
				<div className="desktop-shim">
		            <h3 dangerouslySetInnerHTML={{__html:cleanHeadline}}/>
		            <div className="bottomsection_content" dangerouslySetInnerHTML={{__html:fullContent(content,image)}}/>
		            <p className="legaltext">We accept up to 66 hours of credit from a community college or up to 90 hours of credit from another four-year institution. You may also be eligible to earn life experience credit. All of this from a college consistently ranked one of the most affordable in the country.</p>
		        </div>
		    </section>
			
		)
	}
}