function Toggle({ options, active, onChange }) {
  return (
    <div className="toggle">
      {options.map((option) => (
        <button
          key={option}
          className={option === active ? 'toggle-btn active' : 'toggle-btn'}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default Toggle
