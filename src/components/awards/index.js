import React from "react"
//import styled from "styled-components"
import './awards.scss';



/*const ItemStack = styled.div`
	display:grid;
	grid-column-gap:1rem;
	align-items:center;
	width:100%;
	justify-items:center;
	margin: .5rem auto .5rem;
	z-index:2;

	.iconBox{
		grid-row:1/2;
		grid-column:1;
		width:150px;
		height:auto;
		align-content:center;
		justify-content:center;
		display:grid;
		grid-template:1fr/1fr;
		@media (min-width:768px){
			width:130px;
			
			}
		img{
			width:100%;
			height:auto;
			align-self:center;
			justify-self:center;
			grid-column:1;
			grid-row:1;
			}
	}
	p{
		color:black;
		font-size:1.5rem;
		font-weight: 800;
		grid-row:2/3;
		grid-column:1;
		text-align:center;
		justify-self:center;
	}
	@media (min-width:768px){
		grid-template:130px auto/1fr;
		justify-items:center;
		margin: 1rem auto;
		max-width:none;
		}
`*/
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