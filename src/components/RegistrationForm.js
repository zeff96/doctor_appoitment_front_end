import React from 'react'

function RegistrationForm() {
  return (
    <form onSubmit>
        <div>
            <label htmlFor='name'>
                Name:
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
            </label>
        </div>


        <div>
            <label htmlFor='email'>
                Email:
                <input
                  type='email'
                  value={emal}
                  onChange={(e) => setName(e.target.value)}
                />
            </label>
        </div>
    </form>
  )
}

export default RegistrationForm