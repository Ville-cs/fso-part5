import LoginForm from "./LoginForm"
import Togglable from "./Togglable"
import Notification from "./Notification"

const Login = ({
  errorMessage,
  message,
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
}) => {
  return (
    <div>
      <h2>Login to see blogs</h2>
      <Notification errorMessage={errorMessage} message={message} />
      <Togglable buttonLabel="Log in here">
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </Togglable>
    </div>
  )
}

export default Login
