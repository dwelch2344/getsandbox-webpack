

// we store "non-public" data on our resources under `_` property, so remove it for render 
// (or remove it from all entries in an array)
export const strip = (data) => {
  if( data instanceof Array ){
    return data.map(strip)
  }else {
    return _.omit(data, '_')
  }
}