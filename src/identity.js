
import Base from './base'

export default class Identities extends Base {

  constructor(state){
    super(state, 'identities')
  }

  getSponsor = (req, res) => {
    res.json({test: true})
  }

  configureSandbox(Sandbox){
    super.configureSandbox(Sandbox)
    const {resource} = this
    Sandbox.define(`${resource}/{id}/sponsor`, 'get', this.getSponsor)
  }

}