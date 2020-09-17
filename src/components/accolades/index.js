import React from "react"
import Icon from '../../images/icons'
import './accolades.scss'


const Items = (props) =>(
	<section className="iconGrid">
		 {Object.keys(props).map((item, index)=>{
			 const text = props[item].content.tagline.replace(/(<([/fp]+)>)/ig,"")
			 return(
			 
				<div key={index} className="iconStack__item">
					<div className="iconBox">
						<Icon name={props[item].content.icon} />
					</div>
					<p dangerouslySetInnerHTML={{__html:text}}/>
				</div>
			)}
			)}
	</section>
	)
export default class Accolades extends React.Component{
	
	render(){
		const {headline, items} = this.props;
		const cleanHeadline = (headline)?headline.replace(/(<([/fp]+)>)/ig,""):'';//remove and p and f tags to clean up the code.
		return(
			<section className="accolades">
				<div className="desktop-shim">
	                <h3 className="accoladesHeadline" dangerouslySetInnerHTML={{__html:cleanHeadline}}/>
					<Items {...items}/>
				</div>
            </section>
			
		)
	}
}