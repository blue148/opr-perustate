 
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
	environment: 'heroimagetest'
}
if(process.env.CONTENTFUL_PREVIEW_TOKEN){
	contentfulConfig.host='preview.contentful.com';
	contentfulConfig.accessToken=process.env.CONTENTFUL_PREVIEW_TOKEN;
}else{
	//console.log(contentfulConfig, ' live')
}
const { spaceId, accessToken } = contentfulConfig

/*if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.'
  )
}*/

module.exports = {
  siteMetadata: {
    title: `Peru State College Online`,
    description: ``,
    author: `Jason Sonderman`,
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
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    'gatsby-plugin-styled-components',
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
   /*{
	    resolve: 'gatsby-plugin-google-tagmanager',
	    options: {
	      id: 'GTM-WVQZZ82',
	
	      // Include GTM in development.
	      // Defaults to false meaning GTM will only be loaded in production.
	      includeInDevelopment: true,
	
	      // datalayer to be set before GTM is loaded
	      // should be an object or a function that is executed in the browser
	      // Defaults to null
	      defaultDataLayer:{
  				     'experimentId': process.env.GATSBY_EXPID||null,
				     'variationId': 0,
	      },
	
	
	      // Specify optional GTM environment details.
	    },
	},*/
	{
		resolve: 'gatsby-plugin-google-marketing-platform',
	    options: {
	      dataLayer: {
	        experimentId: process.env.GATSBY_EXPID||null,
	        variationId: 1
	      },
	      tagmanager: {
	        id: 'GTM-WVQZZ82'
	    },
	    optimize: {
	        id: process.env.GATSBY_EXPID,
	      }
	     }
    },	  
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
