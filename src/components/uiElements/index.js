import React from "react"
import styled from "styled-components"
import ScrollIntoView from 'react-scroll-into-view'
import uiStyles from './ui.module.css';

const StyledButton = styled.button`
	width:250px;
`
const ButtonLink = styled.a`
	display:block;
	@media (min-width:768px){
	width:250px;
	}
`
const ButtonArea = styled.div`

`

export class Button extends React.Component{
	
	render(){
		const buttonId = this.props.label.split(' ').join('-').toLowerCase();
		const button = (this.props.jumplink)?
			<ScrollIntoView selector={'#'+this.props.jumplink} className="buttonField">
				<ButtonLink id={buttonId} aria-label={this.props.label} className={"button "+this.props.theme}>
					{this.props.label}
				</ButtonLink>
			</ScrollIntoView>
		:
			<ScrollIntoView selector="#" className="buttonField">
				<ButtonLink id={buttonId} aria-label={this.props.label} className={"button "+this.props.theme} href={this.props.outlink||"#"}>
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

const TabItem = (props)=>{
	//console.log(props, 'TabItem')
	return(
		<div className={[uiStyles.tab, props.tabClass].join(' ')} >
				<a href="#"  onClick={props.onClick} data-target={props.id}> {props.title} </a>
			</div>
	)	
}

export class Tab extends React.Component{
	
	
	render(){
		//const {handleClick, title,className,id} = this.props;
		return(
			<TabItem {...this.props}/>
			
		)
	}
}


