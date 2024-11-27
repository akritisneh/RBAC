
# RBAC-UI Project: User, Role, and Permission Management System
## Project Overview

The RBAC-UI (Role-Based Access Control User Interface) project is a frontend application that provides functionality for managing users, roles, and permissions in a system. This application is built using ReactJS and allows the creation, editing, and deletion of data for users, roles, and permissions. Currently, the data is stored temporarily in memory (not in a database), and operations are performed on a static list fetched from APIs.

## Features and Functionality
The RBAC-UI consists of three core management pages:

* User Management
* Role Management
* Permission Management

## 1. User Management:
This page allows administrators to manage users by performing the following actions:
* Add New Users: Create a new user by providing details like name, email, department, role, and status.
* Edit Users: Modify existing user details.
* Delete Users: Remove a user permanently from the list.
* Toggle User Status: Mark users as "Active" or "Inactive."

## Key Display Features:
* Displays a list of users with columns for name, email, department, roles, status, and actions.
* Status is toggleable using a switch component.
* A summary at the bottom shows the count of active and inactive users.

## 2. Role Management
This page provides tools for managing roles in the system:

* Add New Roles: Add new roles to the system with a description and associated permissions.
* Edit Roles: Modify role details and associated permissions.
* Delete Roles: Remove roles permanently from the list.
  
## Key Display Features:
* Displays a list of roles with columns for name, description, permissions, and actions.
* Each role shows the permissions associated with it. Currently, the permissions column is marked as "No Permissions" since dynamic permissions assignment is not implemented.
  
## 3. Permission Management
This page is dedicated to managing system-wide permissions:

* Add New Permissions: Add permissions that specify actions users can perform (e.g., "Manage Users," "Edit Payroll").
* Edit Permissions: Modify existing permissions to update actions or descriptions.
  
## Key Display Features:
* Displays permission categories (e.g., IT Systems, HR Systems, Finance Systems).
* Each category lists the associated actions, like "Manage Users" or "Edit Payroll."
  
# Data Handling:

* User data is fetched from a predefined list and not from a database.
* All changes (add/edit/delete) are temporary and stored in the frontend.
  
# Technologies Used
* React.js: Frontend framework for building the UI.
* Material-UI (MUI): UI library for buttons, tables, and toggles.
* JavaScript: Core logic for handling state and interactions.
* CSS: Basic styling for components.

## Future Enhancements
* Integration with a real backend database.
* Persistent data storage using APIs.
* Adding dynamic permission assignment to roles.
* Role and permission hierarchical modeling.

Working :
https://github.com/user-attachments/assets/71d3d453-a556-4167-85b1-8b790cdab52c

