// Storage service for tickets, users, and authentication

const TICKETS_KEY = "ticketapp_tickets";
const SESSION_KEY = "ticketapp_session";
const USERS_KEY = "ticketapp_users";

// ===== User Management =====

export function getUsers() {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error("Error reading users:", error);
    return [];
  }
}

export function findUserByEmail(email) {
  const users = getUsers();
  return users.find((user) => user.email === email) || null;
}

export function addUser(userData) {
  const users = getUsers();
  const newUser = {
    id: userData.id || Date.now().toString(),
    name: userData.name,
    email: userData.email,
    password: userData.password,
    createdAt: Date.now(),
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  return newUser;
}

// ===== Auth Functions =====

export function getSession() {
  try {
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) return null;

    const parsed = JSON.parse(session);

    // Check if session is expired
    if (parsed.expires && Date.now() > parsed.expires) {
      clearSession();
      return null;
    }

    return parsed;
  } catch (error) {
    console.error("Error reading session:", error);
    return null;
  }
}

export function setSession(token, userData) {
  const session = {
    token: token,
    user: {
      id: userData.id,
      name: userData.name,
      email: userData.email,
    },
    expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function isAuthenticated() {
  const session = getSession();
  return session !== null;
}

// ===== Ticket Functions =====

export function getTickets() {
  try {
    const tickets = localStorage.getItem(TICKETS_KEY);
    return tickets ? JSON.parse(tickets) : [];
  } catch (error) {
    console.error("Error reading tickets:", error);
    return [];
  }
}

export function getTicketById(id) {
  const tickets = getTickets();
  return tickets.find((ticket) => ticket.id === id) || null;
}

export function createTicket(ticketData) {
  const tickets = getTickets();

  const newTicket = {
    id: generateId(),
    title: ticketData.title,
    status: ticketData.status,
    description: ticketData.description || "",
    priority: ticketData.priority || "medium",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  tickets.push(newTicket);
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));

  return newTicket;
}

export function updateTicket(id, updates) {
  const tickets = getTickets();
  const index = tickets.findIndex((ticket) => ticket.id === id);

  if (index === -1) {
    throw new Error("Ticket not found");
  }

  tickets[index] = {
    ...tickets[index],
    ...updates,
    updatedAt: Date.now(),
  };

  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  return tickets[index];
}

export function deleteTicket(id) {
  const tickets = getTickets();
  const filtered = tickets.filter((ticket) => ticket.id !== id);

  if (tickets.length === filtered.length) {
    throw new Error("Ticket not found");
  }

  localStorage.setItem(TICKETS_KEY, JSON.stringify(filtered));
  return true;
}

export function getTicketStats() {
  const tickets = getTickets();

  return {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    inProgress: tickets.filter((t) => t.status === "in_progress").length,
    closed: tickets.filter((t) => t.status === "closed").length,
  };
}

// ===== Helper Functions =====

function generateId() {
  return `ticket-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Initialize with demo data
export function initializeDemoData() {
  // Initialize demo user if no users exist
  const users = getUsers();
  if (users.length === 0) {
    addUser({
      name: "Demo User",
      email: "demo@ticket.app",
      password: "password123",
    });
  }

  // Initialize demo tickets
  const tickets = getTickets();
  if (tickets.length === 0) {
    const demoTickets = [
      {
        id: generateId(),
        title: "Fix login page responsiveness",
        status: "open",
        description: "The login page is not responsive on mobile devices.",
        priority: "high",
        createdAt: Date.now() - 86400000,
        updatedAt: Date.now() - 86400000,
      },
      {
        id: generateId(),
        title: "Update user documentation",
        status: "in_progress",
        description: "Need to update the user guide with new features.",
        priority: "medium",
        createdAt: Date.now() - 172800000,
        updatedAt: Date.now() - 3600000,
      },
      {
        id: generateId(),
        title: "Database optimization",
        status: "closed",
        description: "Optimize database queries for better performance.",
        priority: "high",
        createdAt: Date.now() - 259200000,
        updatedAt: Date.now() - 86400000,
      },
    ];

    localStorage.setItem(TICKETS_KEY, JSON.stringify(demoTickets));
  }
}
