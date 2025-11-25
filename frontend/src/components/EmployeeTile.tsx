import React, { useState } from 'react';
import { MoreVertical, Edit, Trash2, Flag, User } from 'lucide-react';
import type { Employee } from '../types';

interface EmployeeTileProps {
  employee: Employee;
  onSelect: (employee: Employee) => void;
}

const EmployeeTile: React.FC<EmployeeTileProps> = ({ employee, onSelect }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <div
      className="card group cursor-pointer animate-fade-in relative overflow-visible"
      onClick={() => onSelect(employee)}
    >
      <div className="p-6 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md text-white">
            <User size={24} />
          </div>
          <div className="relative">
            <button
              className="btn btn-icon btn-ghost opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleMenuClick}
            >
              <MoreVertical size={20} />
            </button>
            {showMenu && (
              <div
                className="absolute top-full right-0 w-[140px] bg-surface rounded-lg shadow-xl border border-border p-1 z-10 flex flex-col gap-0.5"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="flex items-center gap-2 px-3 py-2 w-full text-left rounded-md text-sm font-medium text-primary hover:bg-slate-50">
                  <Edit size={16} /> Edit
                </button>
                <button className="flex items-center gap-2 px-3 py-2 w-full text-left rounded-md text-sm font-medium text-warning hover:bg-slate-50">
                  <Flag size={16} /> Flag
                </button>
                <button className="flex items-center gap-2 px-3 py-2 w-full text-left rounded-md text-sm font-medium text-danger hover:bg-slate-50">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900">{employee.name}</h3>
          <p className="text-slate-500 text-sm">{employee.role || 'Employee'} • {employee.class}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-border">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Age</span>
            <span className="font-semibold text-slate-900">{employee.age}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Attendance</span>
            <span
              className={`font-semibold ${employee.attendance > 90 ? 'text-emerald-500' : 'text-amber-500'}`}
            >
              {employee.attendance}%
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-1">
          {employee.subjects.slice(0, 3).map(sub => (
            <span key={sub} className="bg-slate-50 px-2 py-1 rounded-md text-xs text-slate-500 border border-border">
              {sub}
            </span>
          ))}
          {employee.subjects.length > 3 && (
            <span className="bg-slate-50 px-2 py-1 rounded-md text-xs text-slate-500 border border-border">
              +{employee.subjects.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeTile;
