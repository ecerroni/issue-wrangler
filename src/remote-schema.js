const { createHttpLink, HttpLink } = require('apollo-link-http')
const { makeRemoteExecutableSchema } = require('graphql-tools')
const { buildClientSchema } = require('graphql/utilities')


const schemas = {
  small: {
    id: 'small',
    uri: 'https://countries.trevorblades.com/'
  },
  medium: {
    id: 'medium',
    uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index'
  },
  big: {
    id: 'big',
    uri: 'https://anilist.co/graphql'
  },
}


/** CHANGE ONLY THIS */
const schemaType = 'small'; // small | medium | big
// BEHAVIOR
// small => wrangler dev works | wrangler publish works
// medium => wrangler dev does not work | wrangler publish works (it might not deploy at first, but you have to retry)
// big => wrangler dev does not work | wrangler publish does not work (script always times out)

const { __schema } = require(`./remote-schema-${schemas[schemaType].id}.json`)

const remote = buildClientSchema({ __schema })
console.log('remote', remote);
const remoteExecutableSchema = makeRemoteExecutableSchema({
  schema: remote,
  link: createHttpLink({
    uri: schemas[schemaType].uri,
    fetch
  })
});
if (remoteExecutableSchema) {
  console.log('[INFO] Remote schema ready');
}

module.exports = {
  remoteExecutableSchema
}