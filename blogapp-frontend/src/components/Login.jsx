import LoginForm from "./LoginForm"
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
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      />
    </div>
  )
}

export default Login
