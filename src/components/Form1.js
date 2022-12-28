import React, { useState } from 'react';
import '../css/Form.css';

function Form1() {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can add code here to submit the formData to a backend or do some other action
  };

  return (
    <form onSubmit={handleSubmit} className="form" dir="rtl">
      <label htmlFor="name" className="form__label">
        الاسم:
      </label>
      <input
        type="text"
        name="name"
        id="name"
        className="form__input"
        value={formData.name || ''}
        onChange={handleChange}
      />

      <label htmlFor="email" className="form__label">
        البريد الإلكتروني:
      </label>
      <input
        type="email"
        name="email"
        id="email"
        className="form__input"
        value={formData.email || ''}
        onChange={handleChange}
      />

      <label htmlFor="message" className="form__label">
        الرسالة:
      </label>
      <textarea
        name="message"
        id="message"
        className="form__input form__textarea"
        value={formData.message || ''}
        onChange={handleChange}
      />

      <button type="submit" className="form__button">
        ارسل
      </button>
    </form>
  );
}

export default Form1;