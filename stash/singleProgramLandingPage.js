import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"


export default ({data}) => {
	return (
    <Layout
    {...data.contentfulNestedTabbedLandingPage}/>
  )
}


export const query = graphql`
	query singleprogramlandingpagequery($slug: String){	
		contentfulSingleProgramLandingPage(slug: { eq: $slug }){
			id
			slug
			heroArea {
	            headline
	            image {
	              fields {
	                file {
	                  en_US {
	                    url
	                  }
	                }
	              }
	            }
	            items {
	              content {
	                icon
	                tagline
	              }
	            }
	          }
	    
	          accolades {
	            items {
	              content {
	                icon
	                tagline
	              }
	            }
	          }
	          testimonial {
	            testimonial {
	              image {
	                fields {
	                  file {
	                    en_US {
	                      url
	                    }
	                  }
	                }
	              }
	              content
	            }
	          }
	  		}
	}  
`