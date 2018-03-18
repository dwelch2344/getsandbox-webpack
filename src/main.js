import Identities from './identity'
import Tenants from './tenants'
import { generate } from './util'

const ids = new Identities(state)
const tenants = new Tenants(state)

Sandbox.define('/_state', 'get', (req, res) => {
  res.json( state )
})

Sandbox.define('/_fake', 'get', (req, res) => {
  generate(state, {ids: 100, tenants: 10}, {
    ids, tenants
  })
  res.json( state )
})

ids.configureSandbox(Sandbox)
tenants.configureSandbox(Sandbox)
