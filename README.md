# Ticket Management Application

This is a GitHub repository for a ticket management application built with Vite and React.

## Getting Started

### Cloning the Repository

Clone the repository and follow the commands below to set up and run the application.

```bash
git clone <https://github.com/makarand172/ticketing-app.git>
```

The app is located in the `main` branch hence checkout respectively.

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Navigate to the root level of the project:
   ```bash
   cd <project-folder>
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server with the following command:

```bash
npm run dev
```

# Design Decisions for Ticket Management Application

## Component Structure: Why Did You Structure Components This Way?

I structured the components to maintain modularity, separation, and scalability:

1. **Feature-Based Grouping**

   - Each component or logical unit is grouped by its feature, such as:
     - `CreateTicket`
     - `TicketCardView`
     - `TicketListView`
     - `TicketView`
   - This makes it easier to locate, understand, and update related files without sifting through an unstructured component list.

2. **Cohesion Between JSX and CSS**

   - Each folder includes both `.jsx` and `.css` files:
     - E.g., `CreateTicketForm.jsx` and `CreateTicketForm.css`
   - This ensures styles are scoped and directly associated with the corresponding component, reducing conflicts and improving maintainability.

3. **Context Store**

   - File: `contextStore/ticketContext.js`
   - This handles global/shared state using React Context, cleanly separated to increase app’s reusability and to avoid prop drilling.

4. **Page vs. Component Distinction**

   - Pages like `TicketDashboard` live under `pages/`
   - UI components live under `components/`
   - This gives a clear distinction between page-level containers (which deal with layout/routing) and presentational or reusable UI components. Also created separately so that if the app gets scalable in the future, there will be page-level presentation and it will be easy to route and maintain.

5. **Utilities and Constants**

   - Files: `utils/appConstants.js` and `utils/helper.js`
   - Reusable constants and utility functions are abstracted out to prevent repetition and improve code clarity.

6. **Central Entry Points**
   - Files: `App.jsx` and `main.jsx`
   - These serve as the application’s entry points and routing setup, separated cleanly from the feature logic.

### Benefits of This Structure

- **Scalable**: Easy to extend with new features or components.
- **Maintainable**: Each feature is self-contained.
- **Developer-friendly**: Clear separation helps onboarding new developers quickly.

## State Management: Where Is State Stored and Why?

1. **Centralized State (Global)**

   - File: `contextStore/ticketContext.js`
   - **Why**:
     - This file uses React Context to manage shared/global state such as:
       - Ticket list - all the created tickets are in this context.
     - To avoid prop drilling.
   - **Use Case**: Components like `TicketListView`, `TicketCardView` need access to the same data (e.g., the list of tickets), so storing it globally avoids prop drilling.

2. **Local State (Component-Level) (UseState Hook)**
   - Files: Inside individual component `.jsx` files like `CreateTicketForm.jsx`, `TicketView.jsx`, etc.
   - **Why**:
     - Local state is used for:
       - Form inputs
       - UI interactions (Create Ticket Form modal visibility)
       - Temporary values that don’t need to persist or be shared
   - **Use Case**: `CreateTicketForm.jsx` handles local state for the new ticket fields before submitting them, and `TicketDashboard.jsx` uses local state to handle modal close and open functionality, and handling the tickets list for `SearchInput` and searched tickets.

## Performance Considerations: What Would You Optimize If the App Scaled to 1,000+ Tickets?

1. **Pagination**

   - **Why**: No need for all data at once, so load the data on the next page.
   - **How**:
     - Load tickets in batches (e.g., 50 at a time).
     - Use cursor-based pagination for API calls.

2. **Memoization**

   - **Why**: To avoid re-rendering expensive components unnecessarily.
   - **How**:
     - `React.memo()` for `TicketCardView.jsx`
     - Especially important if tickets include complex UI (attachments, status badges, tooltips).

3. **Efficient State Management**

   - **Why**: Large global state or unnecessary re-renders can slow the app.
   - **How**:
     - Minimize context updates by splitting state (e.g., separate read-only and editable contexts).
     - Use tools like Zustand or Redux Toolkit with selectors to keep updates fine-grained.

4. **Lazy Load Components**
   - **Why**: Reduce initial load time.
   - **How**: Use `React.lazy()` + `Suspense` to lazy-load components like `TicketView.jsx` or modals.

## Search Behavior: What Improvements Would You Make to the Search UX?

1. **Debounced Search Input**

   - **Problem**: Without debouncing, every keystroke triggers a re-render or API call.
   - **Solution**: Use a debounce function to delay search execution until the user stops typing. Improves performance and reduces unnecessary operations.

2. **Highlight Matching Text**

   - **Problem**: It's hard for users to visually scan the result.
   - **Solution**: Highlight matching keywords in the ticket title or description. Improves clarity and usability.

3. **Search Categories & Filters**

   - **Problem**: One big search bar is not flexible for complex queries.
   - **Solution**: Add filters like:
     - Ticket status (Open, Closed)
     - Priority (Low, High)
     - Date ranges
     - Assigned user/team
   - Enables users to narrow down results precisely.

4. **Smart Defaults & Saved Searches**
   - Show recent searches or most frequent filters
   - Allow users to save filter combinations (like Jira)
   - Personalization improves workflow efficiency.

## What Did You Google or Use GPT For?

- Used Google for some CSS properties on MDN references.
- Used GPT for date and time format and regex in `helper.js` file.
- Used GPT for document formatting.
