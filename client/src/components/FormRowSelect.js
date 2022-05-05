const FormRowSelect = ({ name, label, value, onChange, list }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label || name}
      </label>
      <select
        className="form-select"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      >
        {list.map((item, idx) => {
          switch (item) {
            case "--":
              return (
                <option key={idx} value="all">
                  {item}
                </option>
              );
            case "latest":
              return (
                <option key={idx} value={item}>
                  décroissant
                </option>
              );
            case "oldest":
              return (
                <option key={idx} value={item}>
                  croissant
                </option>
              );
            default:
              return (
                <option key={idx} value={item}>
                  {item}
                </option>
              );
          }
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;
