 
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
}
const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.'
  )
}

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
	{
    resolve: "gatsby-plugin-react-svg",
	    options: {
	      rule: {
	        include: /images/ // See below to configure properly
	      }
	    }
	  },
	  `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: [`Material+Icons`,
           `Roboto:300,400,500,700`,
           `Open+Sans:400,600,700`]
        },
        typekit:{
	        id:`qsg0lqq`
        }
      }
    },
    {
	    resolve: 'gatsby-plugin-google-tagmanager',
	    options: {
	      id: 'GTM-WVQZZ82',
	
	      // Include GTM in development.
	      // Defaults to false meaning GTM will only be loaded in production.
	      includeInDevelopment: true,
	
	      // datalayer to be set before GTM is loaded
	      // should be an object or a function that is executed in the browser
	      // Defaults to null
	      defaultDataLayer:{},
	
	
	      // Specify optional GTM environment details.
	    },
	}
	  
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
