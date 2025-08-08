import { useState } from "react";
import "./CreateTicketForm.css";
import { PRIORITY_OPTIONS } from "../../utils/appConstants";
import { formatDateTime, validateRequiredField } from "../../utils/helper";
import PropTypes from "prop-types";

const CreateTicketForm = ({ createTicket, count }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [error, setError] = useState({
    titleError: "",
    descriptionError: "",
    priorityError: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const titleValidation = validateRequiredField(title);
    const descValidation = validateRequiredField(description);
    const priorityValidation = validateRequiredField(priority);
    setError({
      titleError: titleValidation.msg,
      descriptionError: descValidation.msg,
      priorityError: priorityValidation.msg,
    });

    // Check if all fields are valid
    if (
      titleValidation.isValid &&
      descValidation.isValid &&
      priorityValidation.isValid
    ) {
      createTicket({
        ticketId: "SPT-" + ++count,
        title,
        description,
        priority,
        createdDate: formatDateTime(new Date()),
      });
      //reset form
      setTitle("");
      setDescription("");
      setPriority("");
      setError({
        titleError: "",
        descriptionError: "",
        priorityError: "",
      });
    } else {
      console.log("Validation failed");
    }
  };

  return (
    <form
      className="create-ticket-form"
      onSubmit={(e) => {
        handleFormSubmit(e);
      }}
    >
      <div className="create-ticket-form-element-container">
        <label htmlFor="formTitle" className="create-ticket-form-label">
          Title<span className="create-ticket-form-label-required">*</span> :
        </label>
        <input
          id="formTitle"
          type="text"
          className="create-ticket-form-input"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        {error.titleError ? (
          <label className="create-ticket-form-label-required">
            {error.titleError}
          </label>
        ) : null}
      </div>

      <div className="create-ticket-form-element-container">
        <label htmlFor="formDescription" className="create-ticket-form-label">
          Description
          <span className="create-ticket-form-label-required">*</span> :
        </label>
        <textarea
          id="formDescription"
          className="create-ticket-form-textarea"
          rows={6}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        {error.descriptionError ? (
          <label className="create-ticket-form-label-required">
            {error.descriptionError}
          </label>
        ) : null}
      </div>

      <div className="create-ticket-form-element-container">
        <label htmlFor="formPriority" className="create-ticket-form-label">
          Priority<span className="create-ticket-form-label-required">*</span> :
        </label>
        <select
          id="formPriority"
          name="priority"
          className="create-ticket-form-select"
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value);
          }}
        >
          {PRIORITY_OPTIONS?.map((optionItem) => (
            <option key={optionItem.value} value={optionItem.value}>
              {optionItem.label}
            </option>
          ))}
        </select>
        {error.priorityError ? (
          <label className="create-ticket-form-label-required">
            {error.priorityError}
          </label>
        ) : null}
      </div>
      <div>
        <button
          id="formSaveButton"
          className="create-ticket-form-button"
          type="Sumbit"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default CreateTicketForm;

CreateTicketForm.propTypes = {
  createTicket: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};
