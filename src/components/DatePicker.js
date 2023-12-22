// DatePicker.js
import './DatePicker.css';

const DatePicker = ({selectedDate,setSelectedDate}) => {

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="date-picker-container">
      <label htmlFor="datepicker">Select a Date:</label>
      <input
        min='2016-01-01'
        max='2023-12-31'
        type="date"
        id="datepicker"
        value={selectedDate}
        onChange={handleDateChange}
      />
      {selectedDate && <p>You selected: {new Date(selectedDate).toLocaleDateString("en-US")}</p>}
    </div>
  );
};

export default DatePicker;
