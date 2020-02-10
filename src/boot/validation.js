import { required, confirmed, email } from 'vee-validate/dist/rules'
import { extend } from 'vee-validate'

extend('required', {
  ...required,
  message: 'this field is required'
})

extend('email', {
  ...email,
  message: 'inform a valid email'
})

extend('confirmed', {
  ...confirmed,
  message: 'confirmation does not match'
})
