import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification.message);
  const style = notification
    ? {
        border: 'solid',
        padding: 10,
        borderWidth: 1
      }
    : { display: 'none' };
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification