import React from "react"
import styled from "styled-components"
import Icon from '../../images/icons'


const ContentBox = styled.section`
	display:grid;
`
const Headline = styled.h3`
	font-size:1.2rem;
`
const ItemsBox = styled.section`
	display:grid;
	grid-template:1fr/1fr 1fr 1fr;
`
const ItemStack = styled.div`
	display:grid;
	justify-items:center;
	p{
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
				<Icon name={props[item].content.icon} />
				<p dangerouslySetInnerHTML={{__html:text}}/>
			</ItemStack>
			)}
			)}
	</ItemsBox>
	)
export default class Accolades extends React.Component{
	
	render(){
		const {image, headline, items} = this.props
		return(
			<ContentBox key={this.props.index}>
                <Headline dangerouslySetInnerHTML={{__html:headline}}/>
				<Items {...items}/>
              </ContentBox>
			
		)
	}
}