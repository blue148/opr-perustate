import React from "react"
import styled from "styled-components"
import Icon from '../../images/icons'


const HeroBox = styled.section`
	color:white;
	display:grid;
	grid-template: auto 1fr/1fr;
	justify-items:center;
`
const HeroHeadline = styled.h1`
	color:white;
	font-size:1.6rem;
`
const ItemsBox = styled.section`
	display:grid;
	grid-template:1fr/1fr 1fr 1fr
`
const ItemStack = styled.div`
	display:grid;
	justify-items:center;
	p{
		color:white;
		font-size:1.2rem;
		font-weight: 800;
	}
`
//need to pull the icon by name
const Items = (props) =>(
	<ItemsBox className="iconGrid">
		 {Object.keys(props).map((item, index)=>{
			 const text = props[item].content.tagline
			 return(
			 
			<ItemStack key={index}>
				<Icon name={props[item].content.icon} fill="#fff"/>
				<i className={props[item].content.icon}/>
				<p dangerouslySetInnerHTML={{__html:text}}/>
			</ItemStack>
			)}
			)}
	</ItemsBox>
	)
export default class HeroArea extends React.Component{
	
	render(){
		const {image, headline, items} = this.props
		return(
			<HeroBox key={this.props.index} style={{ backgroundImage: `url(${image.fields.file.en_US.url})` }}>
                <HeroHeadline dangerouslySetInnerHTML={{__html:headline}}/>
				<Items {...items}/>
              </HeroBox>
			
		)
	}
}