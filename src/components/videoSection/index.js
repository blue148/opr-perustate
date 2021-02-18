/// Video Component
import React, { useState } from "react"
import FsLightbox from 'fslightbox-react';

import './video-section.scss';

export default function VideoSection(props){
	const [toggler, setToggler] = useState(false);
	const {video_id} = props;
	if(!video_id)return null;
	return(
	<section className="videoSection fullwidth">
		<div className="desktop-shim">
		<h2>What Our Students Have To Say</h2>
			<img onClick={() => setToggler(!toggler)}
				src={"https://img.youtube.com/vi/"+video_id+"/0.jpg"}	
			/>
			<FsLightbox
				toggler={toggler}
	            sources={ [
	                'https://www.youtube.com/watch?v='+video_id
	            ] }
	            onOpen = {()=>{
	                document.querySelector('#gatsby-focus-wrapper > header').classList.toggle('video-overlay')
	            }}
	            onClose = {()=>{
	                document.querySelector('#gatsby-focus-wrapper > header').classList.toggle('video-overlay')
	            }}
	        />
	        </div>
	   </section>
	)
	
}