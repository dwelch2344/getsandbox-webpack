// const faker = require('faker')

// we store "non-public" data on our resources under `_` property, so remove it for render 
// (or remove it from all entries in an array)
export const strip = (data) => {
  if( data instanceof Array ){
    return data.map(strip)
  }else {
    return _.omit(data, '_')
  }
}


export const fakes = {
  user: (tenants) => {
    const tenant = faker.helpers.randomize(tenants)
    const card = faker.helpers.createCard()
    const { name, username:tenant_oid, email } = card 
    const password = faker.random.number()
    return ({
      tenant_id: tenant.id,
      name, email,
      tenant_oid,
      _: { password }
    })
  }, 
  tenant: () => {
    const { name, catchPhrase:phrase } = faker.helpers.createCard().company
    return { name, phrase }
  }
}

export const generate = (state, configs, services) => {
  state.tenants = []
  state.identities = []
  
  for( let i = 0; i < configs.tenants; i++ ){
    const obj = fakes.tenant()
    obj.id = i
    state.tenants.push(obj)
  }
  for( let i = 0; i < configs.ids; i++ ){
    const obj = fakes.user(services.tenants.col())
    obj.id = i
    state.identities.push(obj)
  }
}





