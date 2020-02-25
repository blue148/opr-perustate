import React from "react"
import styled from "styled-components"
import ScrollIntoView from 'react-scroll-into-view'
import uiStyles from './ui.module.css';

const ButtonLink = styled.a`
	display:block;
	@media (min-width:768px){
	min-width:250px;
	}
`

export class Button extends React.Component{
	
	render(){
		const buttonId = this.props.label.split(' ').join('-').toLowerCase();
		const button = (this.props.jumplink)?
			<ScrollIntoView selector={'#'+this.props.jumplink} className={this.props.className} onClick={this.props.onClick}>
				<ButtonLink id={buttonId} aria-label={this.props.label} className={"button "+[this.props.theme,this.props.className].join(' ')}>
					{this.props.label}
				</ButtonLink>
			</ScrollIntoView>
		:
			<ScrollIntoView selector="#" className={this.props.className}>
				<ButtonLink id={buttonId} aria-label={this.props.label} className={"button "+[this.props.theme,this.props.className].join(' ')} href={this.props.outlink||"#"} target="_blank">
					{this.props.label}
				</ButtonLink>
			</ScrollIntoView>
		return button;
	}
	
}
Button.defaultProps={
    theme: "primary",
    label: "Click Here",
    jumplink: false,
    outlink: false,
    
}
///Not sure we are even using this
const TabItem = (props)=>{
	return(
		<div className={[uiStyles.tab, props.tabClass].join(' ')} >
				<button onClick={props.onClick} data-target={props.id}> {props.title} </button>
		</div>
	)	
}

export class Tab extends React.Component{	
	render(){
		return(
			<TabItem {...this.props}/>
			
		)
	}
}


