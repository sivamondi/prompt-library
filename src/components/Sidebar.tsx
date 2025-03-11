import { useState } from 'react';

interface SidebarProps {
  roles: string[];
  onRoleSelect: (role: string) => void;
  selectedRole: string;
}

export default function Sidebar({ roles, onRoleSelect, selectedRole }: SidebarProps): JSX.Element {
  return (
    <div className="sidebar">
      <h3>Roles</h3>
      <ul className="sidebar-nav">
        <li 
          className={selectedRole === '' ? 'active' : ''} 
          onClick={() => onRoleSelect('')}
        >
          All Roles
        </li>
        {roles.map((role) => (
          <li
            key={role}
            className={selectedRole === role ? 'active' : ''}
            onClick={() => onRoleSelect(role)}
          >
            {role}
          </li>
        ))}
      </ul>
    </div>
  );
} 