import React from "react"
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
				bullets
				image {
					fields {
						file {
							en_US {
								url
							}
						}
					}
				}
				itemsType
				items {
					content {
						icon
						tagline
					}
				}
			}
			introduction {
				headline
				content
			}
			introductionList {
				headline
				content
			}
			applySection {
				headline
				content
			}
			learningSection {
				headline
				content
			}
			educationSection {
				headline
				content
			}
			tuitionSection {
				headline
				content
			}
			testimonial {
				testimonial {
					content
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
			
	        tabbedContent {
		        ... on ContentfulProgramTabContent {
	              	pageName
		            programs {
						pageSlug
						pageName
						programCode
						programDetails {
							headline
							content
						}
						careerOpportunities{
							content
						}
						programInfo{
							items{
								content{
									tagline
									icon
								}
							}
						}
						applyBy
						totalCost
						startClasses
						tuition
						transferrableCredits
						creditHours
					}
				}
				
		    }
		    programContent {
				programDetails {
					headline
					content
				}
				programInfo {
					items {
						content {
							icon
							tagline
						}
					}
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
			nodes{
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
`