const mockRoles = [
  {
    id: 1,
    name: "IT Admin",
    description: "Full control of IT systems and infrastructure.",
    permissions: ["Read", "Write", "Delete", "Manage Users", "Configure Systems"]
  },
  {
    id: 2,
    name: "HR Manager",
    description: "Access to employee data and payroll systems.",
    permissions: ["Read", "Write", "Delete", "View Payroll"]
  },
  {
    id: 3,
    name: "Finance Analyst",
    description: "View financial reports and budgets.",
    permissions: ["Read", "View Financial Reports", "Export Data"]
  },
  {
    id: 4,
    name: "Employee",
    description: "Basic access to self-service portals.",
    permissions: ["Read", "Update Profile"]
  },
];

module.exports = mockRoles;
