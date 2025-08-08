export const validateRequiredField = (text) => {
  let resp = {
    msg: "",
    isValid: true,
  };
  if (!text.trim()) {
    resp.msg = "This field is required.";
    resp.isValid = false;
  }

  return resp;
};

export const formatDateTime = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  const hours = String(date.getHours() % 12 || 12).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
};

export const formatHeaderName = (key) => {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters
    .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize first letter
};
