import React from "react"
import { graphql } from "gatsby"
//import queryString from 'query-string'

import Layout from "../components/singleprogramlayout"


export default ({data, location}) => {
//parse pararmeters for cofingruation. console.log(queryString.parse(location.search),' master')
	return (

    <Layout
    {...data.contentfulSingleProgramLandingPage}
    programs={data.allContentfulProgramInfo}
    location={location}/>

  )
}


export const query = graphql`
	query singleprogramquery($slug: String){	
		contentfulSingleProgramLandingPage(slug: { eq: $slug }) {
			pageName
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
		      }
		      programContent {
		        selectedProgram {
		          pageName {
		            en_US
		          }
		          programCode {
		            en_US
		          }
		          programDetails {
		            en_US {
		              headline
		              content
		            }
		          }
		          programInfo {
		            en_US {
		              items {
		                content {
		                  icon
		                  tagline
		                }
		              }
		            }
		          }
		          careerOpportunities {
		            en_US {
		              headline
		              content
		            }
		          }
		          applyBy {
		            en_US
		          }
		          startClasses {
		            en_US
		          }
		          creditHours {
		            en_US
		          }
		          totalCost {
		            en_US
		          }
		          tuition {
		            en_US
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
		        headline
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
		      awards {
		        headline
		        items {
		          content {
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
		        }
		      }
		      bottomContentSection {
		        headline
		        content
		      }
			
		}
		allContentfulProgramInfo {
			edges{
				node{
					id
			        shortName
			        programCode
			        pageSlug
			    }
		     }
		  }
	}  
`