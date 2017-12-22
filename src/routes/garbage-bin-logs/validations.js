import Validator from 'validatorjs'

const store = (data) => {
  const rules = {
    elevation: 'required'
  }

  return new Validator(data, rules)
}

export default {
  store
}
