import React, { useState } from 'react';
import { MoreVertical, Edit, Trash2, Flag, User } from 'lucide-react';
import type { Employee } from '../types';

interface EmployeeTileProps {
  employee: Employee;
  onSelect: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
}

const EmployeeTile: React.FC<EmployeeTileProps> = ({ employee, onSelect, onEdit }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className="bg-surface rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group relative animate-fade-in"
      onClick={() => onSelect(employee)}
    >
      <div className="absolute top-4 right-4 z-10">
        <button
          className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
        >
          <MoreVertical size={20} />
        </button>

        {showMenu && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(false);
              }}
            ></div>
            <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-xl border border-border z-20 py-1 animate-scale-in origin-top-right">
              <button
                className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                  onEdit(employee);
                }}
              >
                <Edit size={14} /> Edit
              </button>
              <button
                className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                }}
              >
                <Flag size={14} /> Flag
              </button>
              <button
                className="w-full px-4 py-2 text-left text-sm text-danger hover:bg-red-50 flex items-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                }}
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
          <User size={24} />
        </div>
        <div>
          <h3 className="font-bold text-slate-900">{employee.name}</h3>
          <p className="text-sm text-slate-500 capitalize">{employee.role || 'Employee'}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">ID</span>
          <span className="font-mono text-slate-700">{employee.id.slice(0, 8)}...</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Class</span>
          <span className="font-medium text-slate-700">{employee.class}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Attendance</span>
          <span className={`font-medium ${employee.attendance > 90 ? 'text-emerald-600' : 'text-amber-600'}`}>
            {employee.attendance}%
          </span>
        </div>
        <div className="pt-2">
          <div className="flex flex-wrap gap-1">
            {employee.subjects.slice(0, 3).map(sub => (
              <span key={sub} className="px-2 py-0.5 bg-slate-50 text-slate-600 rounded text-xs border border-slate-200">
                {sub}
              </span>
            ))}
            {employee.subjects.length > 3 && (
              <span className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded text-xs border border-slate-200">
                +{employee.subjects.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTile;
