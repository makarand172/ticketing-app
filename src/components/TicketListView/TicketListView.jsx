import PropTypes from "prop-types";
import { useContext } from "react";
import { TicketContext } from "../../contextStore/ticketContext";
import { formatHeaderName } from "../../utils/helper";

const TicketListView = () => {
  const tickets = useContext(TicketContext);
  const headers = tickets?.length > 0 ? Object.keys(tickets[0]) : [];

  return (
    <div className="ticket-list-view-table-wrapper">
      <table className="ticket-list-view-table">
        <thead>
          <tr>
            {headers.map((key) => (
              <th key={key} className={`${key}-column`}>
                {formatHeaderName(key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tickets?.map((ticket) => (
            <tr key={ticket.ticketId}>
              <td className="id-column">{ticket.ticketId}</td>
              <td className="title-column">{ticket.title}</td>
              <td className="description-column">{ticket.description}</td>
              <td className="priority-column">{ticket.priority}</td>
              <td className="created-date-column-column">
                {ticket.createdDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketListView;

TicketListView.propTypes = {
  tickets: PropTypes.object.isRequired,
};
