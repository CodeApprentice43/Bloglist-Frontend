
import PropType from 'prop-types'
const LoginForm = ({ handleLogin, username, password, handleUsernameChange, handlePasswordChange }) => {
    return (
      <>
        <h2>Log In to Blogs </h2>
        <form onSubmit={handleLogin}>
          <div>
            username:
            <input type='text' value={username} onChange={handleUsernameChange} />
          </div>
          <br />
          <div>
            password:
            <input type='password' value={password} onChange={handlePasswordChange} />
          </div>
          <button type='submit'>Submit</button>
        </form>
      </>
    )
  }
  LoginForm.propTypes = 
  {
    handleLogin : PropType.func.isRequired,
    handleUsernameChange : PropType.func.isRequired,
    handlePasswordChange : PropType.func.isRequired,
    username : PropType.string.isRequired,
    password : PropType.string.isRequired

  }
  export default LoginForm