import { strip } from './util'

export default class Base {

  constructor(state, STATE_PROP, resource=`/${STATE_PROP}`){
    this.STATE_PROP = STATE_PROP
    this[STATE_PROP] = state[STATE_PROP] = state[STATE_PROP] || []
    this.resource = resource
  }

  nextId = 1
  generatedId = () => nextId++

  col = () => this[this.STATE_PROP]

  getId = obj => obj.id
  setId = (obj, id) => obj.id = id
  findById = id => _.find(this.col(), e => this.getId(e) == id)
  findByIndex = id => _.findIndex(this.col(), (e => this.getId(e) == id ))
  persist = obj => {
    var col = this.col()
    var idx = this.findByIndex( this.getId(obj) )
    if( idx >= 0 ){
      col[idx] = obj
    }else{
      col.push(obj)
    }
  }

  get = (req, res) => {
    const data = this.col()
    return res.json( { data })
  }

  getOne = (req, res) => {
    const { id } = req.params
    const match = this.findById(id)
    if( match ) {
      return res.json( strip(match) )
    }else{
      return res.json(404, {
        "errors": [
            {
                "title": "Resource Not Found",
                "detail": "ID `" + id + "` was not found."
            }
        ]
      }); 
    }
  }

  put = (req, res) => {
    const { id } = req.params
    const match = this.findById(id)
    if( match ) {
      const updated = req.body
      this.setId(updated, this.getId(match))
      this.persist(updated)
      return res.json( strip(updated) )
    }else{
      return res.json(404, {
        "errors": [
            {
                "title": "Resource Not Found",
                "detail": "ID `" + id + "` was not found."
            }
        ]
      }); 
    }
  }

  patch = (req, res) => {
    const { id } = req.params
    const match = this.findById(id)
    if( match ) {
      const result = _.extend({}, match, req.body)
      this.setId(result, this.getId(match))
      this.persist(result)
      return res.json( strip(result) )
    }else{
      return res.json(404, {
        "errors": [
            {
                "title": "Resource Not Found",
                "detail": "ID `" + id + "` was not found."
            }
        ]
      }); 
    }
  }

  post = (req, res) => {
    const { body } = req
    body.id = this.generatedId()
    this.persist(body)
    return res.json(body)
  }

  delete = (req, res) => {
    const { id } = req.params
    const match = this.findByIndex(id)
    if( match >= 0 ) {
      delete this.col()[match]
      return res.json( {message: 'ok'} )
    }else{
      return res.json(404, {
        "errors": [
            {
                "title": "Resource Not Found",
                "detail": `Resource ${this.STATE_PROP}=>${id} was not found.`
            }
        ]
      }); 
    }
  }

  configureSandbox(Sandbox){        
    const {resource} = this
    Sandbox.define(resource, 'get', this.get)
    Sandbox.define(resource, 'post', this.post)
    Sandbox.define(`${resource}/{id}`, 'get', this.getOne)
    Sandbox.define(`${resource}/{id}`, 'put', this.put)
    Sandbox.define(`${resource}/{id}`, 'patch', this.patch)
    Sandbox.define(`${resource}/{id}`, 'delete', this.delete)
  }
}