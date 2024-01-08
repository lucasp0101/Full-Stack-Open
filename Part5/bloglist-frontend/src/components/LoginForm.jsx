const LoginForm = ({ handleLogin, setUsername, setPassword }) => {
  return <
    form onSubmit={handleLogin}>
    <div>
          username
      <input
        type="text"
        name='Username'
        onChange={( { target } ) => setUsername(target.value)}
      />
    </div>
    <div>
          password
      <input
        type="text"
        name='Password'
        onChange={ ( { target } ) => setPassword(target.value)}
      />
    </div>
    <button type='submit'>Login</button>
  </form>
}

export default LoginForm