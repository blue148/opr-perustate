import React,{useEffect} from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
//import queryString from 'query-string'

import Layout from "../components/transferlayout"


export default ({data, location}) => {
//parse pararmeters for cofingruation. console.log(queryString.parse(location.search),' master')
	return (
		<>
			<Helmet>
			  <meta charSet="utf-8" />
			  <title>{
				  (data.contentfulNonProgramPage.metaTitle)?
				  	data.contentfulNonProgramPage.metaTitle:
				  	data.contentfulNonProgramPage.heroArea.headline.replace(/(<([/fp]+)>)/ig,"")
				  	}
				</title>
			  <meta name="robots" content="noindex, nofollow"/>
			</Helmet>
			<Layout
			{...data.contentfulNonProgramPage}
			programs={data.allContentfulProgramInfo}
			location={location}
			/>
	    </>

  )
}


export const query = graphql`
	query transferpage($slug: String){	
		contentfulNonProgramPage(slug: { eq: $slug }) {
		  pageName
	      slug
	      callout{
				content{
					icon
					display
				}
			}
	      heroArea {
	        headline
	        subHeadline
	        itemsType
	        bullets
	        items{
		        content{
			        icon
			        tagline
			        }
			    }
	        image {
	          fields {
	            file {
	              en_US {
	                url
	              }
	            }
	          }
	        }
	      }
	      introduction {
	        headline
	        content
	      }
	      tuitionSection {
	        headline
	        content
	      }
	      educationSection {
	        headline
	        content
	      }
	      applySection {
	        headline
	        content
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
	      bottomContentSection {
	        headline
	        content
	      }
	      formSettings {
            headline
            subheadline
            successMsg
            redirect
            redirectUrl
            phone
          }
			
		}
		allContentfulProgramInfo {
			edges{
				node{
					id
					contentful_id
			        shortName
			        pageName
			        programCode
			        pageSlug
			        applyBy
		            startClasses
			    }
		     }
		  }
	}  
`