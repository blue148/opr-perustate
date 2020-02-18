import React from "react"
import styled from "styled-components"


const ContentBox = styled.section`
	display:grid;
`
const Headline = styled.h3`
	color:${props=>props.theme.brandblue};
`
const ItemsBox = styled.section`
	display:grid;
	grid-template:auto/100%;
	justify-items:start;
	justifyu-content:start;
	width:90%;
	margin:0 auto;
	@media (min-width:768px){
		grid-template:1fr/1fr 1fr 1fr;
	}
`
const ItemStack = styled.div`
	display:grid;
	grid-template:130px auto/1fr;
	grid-column-gap:1rem;
	justify-items:center;
	align-items:center;
	max-width:none;
	width:100%;
	margin: 0 auto 1rem;
	z-index:2;
	.iconBox{
		grid-row:1/2;
		grid-column:1;
		width:130px;
		height:130px;
		background-color:white;
		border-radius:50%;
		align-content:center;
		justify-content:center;
		display:grid;
		grid-template:1fr/1fr;
		img{
			width:90%;
			height:90%;
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
			grid-template-columns:100px 46%;
			justify-items:center;
			max-width:75%;
			margin: .5rem auto 2rem;
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
		const {headline, items} = this.props
		return(
			<ContentBox key={this.props.index}>
                <Headline dangerouslySetInnerHTML={{__html:headline}}/>
				<Items {...items}/>
              </ContentBox>
			
		)
	}
}