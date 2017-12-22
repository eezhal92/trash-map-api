import Validator from 'validatorjs'

const store = (data) => {
  const rules = {
    name: 'required',
    latitude: 'required',
    longitude: 'required'
  }

  return new Validator(data, rules)
}

export default {
  store
}
