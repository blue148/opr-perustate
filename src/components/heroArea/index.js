import React from "react"
import styled from "styled-components"
import Icon from '../../images/icons'
import {Button} from '../uiElements'
import './hero.scss';


const HeroBox = styled.section`
	color:white;
	background-image: none;
	background-color:${props=>props.theme.brandmediumblue};
	background: -moz-linear-gradient(78deg, ${props=>props.theme.brandmediumblue} -2%,${props=>props.theme.brandblue} 50%,${props=>props.theme.brandmediumblue} 91%);
	background: -webkit-linear-gradient(78deg, ${props=>props.theme.brandmediumblue} -2%,${props=>props.theme.brandblue} 50%,${props=>props.theme.brandmediumblue} 91%);
	background: linear-gradient(78deg, ${props=>props.theme.brandmediumblue} -2%,${props=>props.theme.brandblue} 50%,${props=>props.theme.brandmediumblue} 91%);
	margin: 0 -1rem 0;
	padding: 1rem;
	position:relative;
	@media (min-width:768px){
		padding:1.5rem 0;
		margin-bottom:0;
		background-image:${props=> `url(${props.backgroundImage})`};
		&::before{
			content:'';
			top:0;
			bottom:0;
			left:0;
			right:0;
			background-color:#00000065;
			position:absolute;
			z-index:1;
		}
		*{
			z-index:3;
		}
`
const HeroHeadline = styled.h1`
	color:white;
	z-index:2;
	text-shadow:rgba(0,0,0,.5) -3px 3px 10px;
	@media (min-width:768px){
		margin: 2rem auto;
		width: 100%;
		}
`
const ItemsBox = styled.section`
	display:grid;
	grid-template:auto/100%;
	grid-auto-flow:row;
	justify-items:start;
	justify-content:start;
	width:65%;
	margin: 0 auto;
    padding: 2rem 0;
    grid-row-gap: 2rem;
	@media (min-width:768px){
		 grid-template:1fr/repeat(3,33%);
		 width: 100%;
		 grid-auto-flow: column;
		 grid-auto-columns: max-content;
		 margin: 0 auto;
		 padding:0;
		 justify-self: center;
		 grid-column-gap: 1rem;

	}
	
`
const ItemStack = styled.div`
	display:grid;
	grid-template-columns:60px 1fr;
	grid-column-gap:1.2rem;
	justify-items:start;
	align-items:center;
	max-width:none;
	width:100%;
	margin: 0 auto 1rem;
	padding:0;
	z-index:2;
	.iconBox{
		grid-column:1/2;
		grid-row:1;
		width:60px;
		height:60px;
		box-shadow: rgba(0,0,0,.5) -3px 3px 10px;
		@media (min-width:768px){
			width: 65px;
			height: 65px;
			grid-column: 1;
			grid-row: 1/2;
			}
		background-color:white;
		border-radius:50%;
		align-content:center;
		justify-content:center;
		display:grid;
		grid-template:1fr/1fr;
		svg{
			width:100%;
			height:100%;
			align-self:center;
			justify-self:center;
			grid-column:1;
			grid-row:1;
			}
	}
	p{
		color:white;
		font-size:1.43rem;
		line-height:1.2;
		font-weight: 800;
		grid-column:2/3;
		grid-row:1;
		text-align:left;
		justify-self:start;
		align-self:center;
		margin-bottom:0;
		text-shadow:rgba(0,0,0,.5) -3px 3px 10px;
		@media (min-width:768px){
			 text-align:center;
			 justify-self:center;
			 line-height: 1.2;
			 grid-column: 1;
			 grid-row: 2/3;
			 max-width: 75%;

			}
	}
	@media (min-width:768px){
			justify-items:center;
			max-width:75%;
			margin: .5rem auto 2rem;
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr;
		}
`
const StyledButton = styled(Button)`
	padding: 1rem 0;
	width:80%;
	width:75vw;
	margin:0 auto;
		@media (min-width:768px){
			display:none;
		}

`
//need to pull the icon by name
const Items = (props) =>(
	<ItemsBox className="iconGrid">
		 {Object.keys(props).map((item, index)=>{
			 const text = props[item].content.tagline
			 return(
			 
			<ItemStack key={index} className="iconStack">
				<div className="iconBox">
					<Icon name={props[item].content.icon} fill="#000"/>
				</div>
				<p dangerouslySetInnerHTML={{__html:text}}/>
			</ItemStack>
			)}
		)}
	</ItemsBox>
	)
export default class HeroArea extends React.Component{
	
	render(){
		const {image, headline, items} = this.props
		const imgBg = (image)?image.fields.file.en_US.url:'';
		const cleanHeadline = headline.replace(/(<([/fp]+)>)/ig,"");//remove and p and f tags to clean up the code.
		return(
			<HeroBox key={this.props.index} backgroundImage={imgBg} className="HeroBox">
				<div className="desktop-shim">
	                <HeroHeadline dangerouslySetInnerHTML={{__html:cleanHeadline}} className="HeroHeadline"/>
					<Items {...items}/>
	
					<StyledButton label="Learn More" theme="primary" jumplink="leadform" className="hero-button"/>
				</div>
              </HeroBox>
			
		)
	}
}