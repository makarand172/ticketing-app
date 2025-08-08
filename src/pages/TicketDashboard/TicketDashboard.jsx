import { useEffect, useState } from "react";
import "./TicketDashboard.css";
import CreateTicketForm from "../../components/CreateTicket/CreateTicketForm";
import TicketView from "../../components/TicketView/TicketView";
import { TicketContext } from "../../contextStore/ticketContext";

const TicketDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchedTickets, setSearchedTickets] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateTicket = (ticketData) => {
    setTickets([ticketData, ...tickets]);
    closeModal();
  };

  useEffect(() => {
    const handleSearch = (value) => {
      let lowerCaseKeyword = value.toLowerCase();

      const result = tickets?.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(lowerCaseKeyword) ||
          ticket.description.toLowerCase().includes(lowerCaseKeyword)
      );

      setSearchedTickets(result);
    };
    handleSearch(searchInput);
  }, [searchInput]);

  return (
    <TicketContext.Provider value={searchInput ? searchedTickets : tickets}>
      <div className="ticket-app-dashboard-container">
        <div className="ticket-app-header">
          <h2>Support Tickets</h2>
          <button className="ticket-app-header-create-btn" onClick={openModal}>
            + Create new ticket
          </button>
        </div>
        <input
          type="text"
          className="ticket-app-searchbar"
          placeholder="Search by Description, Title"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        {searchInput ? (
          searchedTickets.length > 0 ? (
            <TicketView tickets={searchedTickets} />
          ) : (
            <h3>No results found</h3>
          )
        ) : tickets.length > 0 ? (
          <TicketView tickets={tickets} />
        ) : (
          <h3>No tickets</h3>
        )}
      </div>
      <Modal title="Create Ticket" isOpen={isModalOpen} onClose={closeModal}>
        <CreateTicketForm
          createTicket={handleCreateTicket}
          count={tickets.length}
        />
      </Modal>
    </TicketContext.Provider>
  );
};

export default TicketDashboard;

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="ticket-app-modal-overlay">
      <div className="ticket-app-modal">
        <div className="ticket-app-modal-close">
          <h3>{title || ""}</h3>
          <button onClick={onClose}>x</button>
        </div>
        <div className="ticket-app-modal-content">{children}</div>
      </div>
    </div>
  );
};
