function Popup({ success, title, message, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <div className={success ? 'popup-icon popup-success' : 'popup-icon popup-error'}>
          {success ? '✓' : '!'}
        </div>
        <h2>{title}</h2>
        <p>{message}</p>
        <button className="btn btn-dark auth-submit" onClick={onClose}>
          Okay
        </button>
      </div>
    </div>
  )
}

export default Popup
