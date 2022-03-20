import { useState } from 'react'

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import Button from '../button/button.component'
import FormInput from '../form-input/form-input.component'

import './sign-up-form.styles.scss'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  
  const [ formFields, setFormFields ] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  console.log(formFields)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if(password !== confirmPassword) {
      alert("passwors do not match")
      return
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)
      console.log(user)

      await createUserDocumentFromAuth(user, { displayName })
      resetFormFields()
    } catch(error) {
      if(error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use')
      } else {
        console.log(error);
      }
    }

  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({...formFields, [name]: value})

  }

  return (
    <div className='sign-up-form-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label="Display Name"
          onChange={handleChange} 
          required 
          type="text" 
          name="displayName" 
          value={displayName}
        />

        <FormInput 
          label="Email"
          onChange={handleChange} 
          required 
          type="email" 
          name="email" 
          value={email}
        />

        <FormInput 
          label="Password"
          onChange={handleChange} 
          required 
          type="password" 
          name="password" 
          value={password}
        />

        <FormInput 
          label="Confirm Password"
          onChange={handleChange} 
          required 
          type="confirmPassword" 
          name="confirmPassword" 
          value={confirmPassword}
        />
        <Button 
          type='submit'
        >
          SIGN UP
        </Button>
      </form>
    </div>
  )
}

export default SignUpForm