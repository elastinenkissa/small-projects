import { useState } from 'react'
import Country from './components/Country'
import { useCountry, useField } from './hooks'

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const findCountryHandler = (event) => {
    event.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={findCountryHandler}>
        <input {...nameInput} />
        <button type='submit'>Find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
