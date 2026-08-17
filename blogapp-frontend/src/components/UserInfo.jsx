const UserInfo = ({ userDetails, handleClick }) => {
  return (
    <div>
      {`${userDetails.username} logged in`}
      <button onClick={handleClick} type="button">
        logout
      </button>
    </div>
  )
}

export default UserInfo
