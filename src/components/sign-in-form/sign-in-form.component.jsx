import { useState } from 'react'

import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'
import Button from '../button/button.component'
import FormInput from '../form-input/form-input.component'

import './sign-in-form.styles.scss'

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  
  const [ formFields, setFormFields ] = useState(defaultFormFields)
  const { email, password } = formFields
  
  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email, 
        password
      )
      resetFormFields()
    } catch(error) {
      // eslint-disable-next-line default-case
      switch(error.code) {
        case 'auth/wrong-password' :
          alert('incorrect password for email');
          break
        case 'auth/user-not-found' :
          alert('no user associated with this email');
          break
        default:
          console.log(error)
      }
    }

  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({...formFields, [name]: value})

  }

  return (
    <div className='sign-in-form-container'>
      <h2>Already have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
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

       <div className='buttons-container'>
        <Button 
            type='submit'
          >
            SIGN IN
          </Button>
          <Button 
            buttonType='google'
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
       </div>
      </form>
    </div>
  )
}

export default SignInForm