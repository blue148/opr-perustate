import React from "react"
import styled from "styled-components"
import './awards.scss';


const ContentBox = styled.section`
	display:grid;
	width:105%;
	padding:3rem 0;
	margin:0 0 0 -.5rem;
	background-color:white;
`
const Headline = styled.h3`
	margin:0 auto 2rem;
`
const ItemsBox = styled.section`
	display:grid;
	grid-template-rows: 1fr;
	grid-template-columns:repeat(auto-fill, 100px);
	justify-items:center;
	justify-content:center;
	grid-auto-flow:column;
	grid-auto-columns:100px;
	grid-gap:2rem;
	margin:0 auto;
	padding:0;
	width:100%;

	@media (min-width:768px){
	    padding: 0;
	    width: 100%;
	    grid-template-columns:repeat(auto-fit,minmax(130px, 30%));
	    grid-auto-flow: column;
	    grid-auto-columns: 130px;
	    justify-content: center;
	}
`
const ItemStack = styled.div`
	display:grid;
	grid-column-gap:1rem;
	align-items:center;
	width:100%;
	grid-template-columns:100px 46%;
	justify-items:center;
	margin: .5rem auto 2rem;
	z-index:2;

	.iconBox{
		grid-row:1/2;
		grid-column:1;
		width:100px;
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
`
//need to pull the icon by name
const Items = (props) =>(
	<ItemsBox className="iconGrid">
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
			<ItemStack key={index}>
				<div className="iconBox">
					<img src={props[item].content.image.fields.file.en_US.url} alt="award" />
				</div>
				{text()}
			</ItemStack>
			)}
		)}
	</ItemsBox>
	)
export default class Awards extends React.Component{
	
	render(){
		const {headline, items} = this.props;
		const cleanHeadline = headline.replace(/(<([/fp]+)>)/ig,"");//remove and p and f tags to clean up the code.
		return(
			<ContentBox className="awards-area">
				<div className="desktop-shim">
                <Headline dangerouslySetInnerHTML={{__html:cleanHeadline}}/>
				<Items {...items}/>
				</div>
              </ContentBox>
			
		)
	}
}