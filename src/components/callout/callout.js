import React from "react"
import styled from "styled-components"
import Icon from '../../images/icons'
import './callout.scss'

const IconBox = styled.div`
	
`
export default class Callout extends React.Component{

	render(){
		const {message, icon} = this.props;
		const cleanMessage = (message)?message.replace(/(<([/fp]+)>)/ig,"").replace(/ (?=[^ ]*$)/i, "&nbsp;"):'';
		return(
		  	<section className="callout">
			  	<div className="desktop-shim">
			  		<IconBox className="iconBox">
			  			<Icon name={icon} fill="#fff"/>
			  		</IconBox>
					<h3 dangerouslySetInnerHTML={{__html:cleanMessage}}/>
				</div>
			</section>
		)
	}
} 