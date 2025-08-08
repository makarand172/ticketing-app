import "./App.css";
import TicketDashboard from "./pages/TicketDashboard/TicketDashboard";

function App() {
  // this is the sample data for bug fix
  const sampleData = [
    { ticketId: 1, status: "closed" },
    { ticketId: 2, status: "closed" },
    { ticketId: 3, status: "closed" },
    { ticketId: 4, status: "open" },
    { ticketId: 5, status: "open" },
    { ticketId: 6, status: "open" },
  ];
  return (
    <>
      {/* Main application  */}
      <TicketDashboard />
      {/* Bug fix */}
      <div className="bug-fix">
        <h3> Debug- Fix a Broken Ticket Counter</h3>
        <TicketCounter tickets={sampleData} />
      </div>
    </>
  );
}

export default App;

function TicketCounter({ tickets }) {
  const openCount = tickets?.filter(
    (ticket) => ticket.status !== "closed"
  ).length;
  return <div>You have {openCount} open tickets</div>;
}
