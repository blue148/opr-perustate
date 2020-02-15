import React from "react"
import styled from "styled-components"
import Icon from '../../images/icons'
import {Button} from '../uiElements'
import ScrollIntoView from 'react-scroll-into-view'
import './hero.scss';


const HeroBox = styled.section`
	color:white;
	display:grid;
	grid-template: auto 1fr/1fr;
	justify-items:center;
	background-image: none;
	background-color:${props=>props.theme.brandmediumblue};
	background: -moz-linear-gradient(78deg, ${props=>props.theme.brandmediumblue} -2%,${props=>props.theme.brandblue} 50%,${props=>props.theme.brandmediumblue} 91%);
	background: -webkit-linear-gradient(78deg, ${props=>props.theme.brandmediumblue} -2%,${props=>props.theme.brandblue} 50%,${props=>props.theme.brandmediumblue} 91%);
	background: linear-gradient(78deg, ${props=>props.theme.brandmediumblue} -2%,${props=>props.theme.brandblue} 50%,${props=>props.theme.brandmediumblue} 91%);
	margin: 0 -1rem 1.8375rem;
	padding: 1rem;
	position:relative;
	@media (min-width:768px){
		padding:0;
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
`
const ItemsBox = styled.section`
	display:grid;
	grid-template:auto/100%;
	grid-auto-flow:row;
	justify-items:start;
	justify-content:start;
	width:65%;
	margin:.8rem auto;
	@media (min-width:768px){
		grid-template:1fr/1fr 1fr 1fr;
	}
	
`
const ItemStack = styled.div`
	display:grid;
	grid-template-columns:41px 1fr;
	grid-column-gap:.5rem;
	justify-items:start;
	align-items:center;
	max-width:none;
	width:100%;
	margin: 0 auto 1rem;
	z-index:2;
	.iconBox{
		grid-column:1/2;
		grid-row:1;
		width:40px;
		height:40px;
		box-shadow: rgba(0,0,0,.5) -3px 3px 10px;
		@media (min-width:768px){
			width:75px;
			height:75px;
			}
		background-color:white;
		border-radius:50%;
		align-content:center;
		justify-content:center;
		display:grid;
		grid-template:1fr/1fr;
		svg{
			width:90%;
			height:90%;
			align-self:center;
			justify-self:center;
			grid-column:1;
			grid-row:1;
			}
	}
	p{
		color:white;
		font-size:1.2rem;
		font-weight: 800;
		grid-column:2/3;
		grid-row:1;
		text-align:left;
		justify-self:start;
		align-self:center;
		margin-bottom:0;
		text-shadow:rgba(0,0,0,.5) -3px 3px 10px;
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
		return(
			<HeroBox key={this.props.index} backgroundImage={imgBg} className="HeroBox">
                <HeroHeadline dangerouslySetInnerHTML={{__html:headline}} className="HeroHeadline"/>
				<Items {...items}/>

					<Button label="Learn More" theme="primary" jumplink="#leadform"/>
              </HeroBox>
			
		)
	}
}