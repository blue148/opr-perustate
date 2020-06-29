import React from "react"
import './awards.scss';

//need to pull the icon by name
const Items = (props) =>(
	<section className="iconGrid">
		 {Object.keys(props).map((item, index)=>{
			 //check if there is a tagline
			 const text = () =>{
					 
				 if(props[item].content.tagline){
					 return <p dangerouslySetInnerHTML={{__html:props[item].content.tagline}}/>
				 }
				 return
			}
			 return(
//TODO: Run a check if the icon is an img from the library or an icon name. 			 
			<div key={index}>
				<div className="iconBox">
					<img src={props[item].content.image.fields.file.en_US.url} alt="award" />
				</div>
				{text()}
			</div>
			)}
		)}
	</section>
	)
export default class Awards extends React.Component{
	
	render(){
		const {headline, items} = this.props;
		//remove and p and f tags to clean up the code then add nbsp in the last space for text wrapping.
		const cleanHeadline = (headline)?headline.replace(/(<([/fp]+)>)/ig,"").replace(/ (?=[^ ]*$)/i, "&nbsp;"):'';
		

		return(
			<section className="awards-area">
				<div className="desktop-shim">
	                <h3 dangerouslySetInnerHTML={{__html:cleanHeadline}}/>
					<Items {...items}/>
				</div>
             </section>
			
		)
	}
}