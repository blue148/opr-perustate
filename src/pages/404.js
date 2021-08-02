import React from "react"
import Footer from "../components/footer"
import Logo from "../images/peru-logo-online-final.svg"
import { Helmet } from "react-helmet"
import styled, {ThemeProvider} from "styled-components"
import "../components/404.scss"
//import queryString from 'query-string'



const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../components/_variables.scss');
const Page = styled.div`
	
`
const ContentArea = styled.section``

export default ({data, location}) => {
//parse pararmeters for cofingruation. console.log(queryString.parse(location.search),' master')
	return (
	<ThemeProvider theme={theme}>
			<Helmet>
			  <meta charSet="utf-8" />
			  <title>Peru State Online</title>
			  <meta name="robots" content="noindex, nofollow"/>
			  <meta name="facebook-domain-verification" content="09l1oqph57rjeekolpkqriye9km9na"/>
			  <link rel="shortcut icon" href="https://www.peru.edu/favicon.ico"/>
			</Helmet>
			<header>
				<div className="headerContainer">
				    <div className='logobox'>
				      <a 
				      	href="https://online.peru.edu"
				      >
				      	<Logo/>
				      </a>
				    </div>
				</div>
			</header>
		    <Page className="pageContainer singleProgram">   

				<main>
					
					<ContentArea className="contentArea">
						<section className="HeroBox" >
					    	<h1>Peru State Online Programs</h1>
					    </section>
						<section className="mainArea">
							<h2>Page Not Found</h2>
						</section>
																		
					</ContentArea>

					
					<Footer/>
				</main>
			</Page>
	    </ThemeProvider>

  )
}


