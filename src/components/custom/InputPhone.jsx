import React, { useState } from "react";

export default function InputPhone() {
  const [phoneNumber, setPhoneNumber] = useState("+7-");
  const formatPhoneNumber = (number) => {
    const cleaned = ("" + number).replace(/\D/g, "");
    const limitedNumber = cleaned.slice(0, 10);
    return limitedNumber.replace(
      /(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/,
      (match, p1, p2, p3, p4) => {
        let formattedNumber = "";
        if (p1) formattedNumber += `${p1}`;
        if (p2) formattedNumber += `-${p2}`;
        if (p3) formattedNumber += `-${p3}`;
        if (p4) formattedNumber += `-${p4}`;
        return formattedNumber;
      }
    );
  };
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 3) {
      setPhoneNumber("+7-");
      return;
    }
    const userInput = inputValue.replace("+7-", "");
    const formattedInput = formatPhoneNumber(userInput);
    setPhoneNumber(`+7-${formattedInput}`);
  };

  return (
    <div>
      <div className="input-group">
        <span className="input-group-text">
          <i className="bi bi-telephone" style={{ fontSize: "16px" }}></i>
        </span>
        <input
          type="text"
          className="form-control form-control-sm"
          id="floatingInputGroup1"
          value={phoneNumber}
          onChange={handleInputChange}
          placeholder="+7-___-___-__-__"
          style={{
            fontSize: "14px", //
            padding: "0.375rem 0.75rem",
          }}
        />
      </div>
    </div>
  );
}
