import PropTypes from "prop-types";
import { useContext } from "react";
import { TicketContext } from "../../contextStore/ticketContext";

const TicketCardView = () => {
  const tickets = useContext(TicketContext);
  return (
    <div className="card-view">
      {tickets?.map((ticket) => (
        <div key={ticket.ticketId} className="ticket-card">
          <div className="ticket-field">
            <strong>Ticket Id:</strong> {ticket.ticketId}
          </div>
          <div className="ticket-field">
            <strong>Title:</strong> <span>{ticket.title}</span>
          </div>
          <div className="ticket-field">
            <strong>Description:</strong> <span>{ticket.description}</span>
          </div>
          <div className="ticket-field">
            <strong>Priority:</strong> {ticket.priority}
          </div>
          <div className="ticket-field">
            <strong>Created Date:</strong> {ticket.createdDate}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketCardView;
