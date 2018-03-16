import Identities from './identity'

Sandbox.define('/_state', 'get', (req, res) => {
  res.json( {keys: Object.keys(Sandbox) }, Sandbox.config )
})

new Identities(state).configureSandbox(Sandbox)
