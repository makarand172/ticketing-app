import TicketListView from "../TicketListView/TicketListView";
import TicketCardView from "../TicketCardView/TicketCardView";
import PropTypes from "prop-types";
import "./TicketView.css";
const TicketView = () => {
  return (
    <div className="ticket-list-view-container">
      <TicketListView />
      <TicketCardView />
    </div>
  );
};

export default TicketView;
