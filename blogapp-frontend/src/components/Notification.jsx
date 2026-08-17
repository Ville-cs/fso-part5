const Notification = ({ errorMessage, message }) => {
  if (errorMessage) {
    return <div className="errorStyle">{errorMessage}</div>
  } else if (message) {
    return <div className="messageStyle">{message}</div>
  }

  return null
}

export default Notification
