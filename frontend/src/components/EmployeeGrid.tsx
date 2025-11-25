import React from 'react';
import { MoreHorizontal, Edit, Trash2, Flag } from 'lucide-react';
import type { Employee } from '../types';

interface EmployeeGridProps {
  employees: Employee[];
  onSelect: (employee: Employee) => void;
}

const EmployeeGrid: React.FC<EmployeeGridProps> = ({ employees, onSelect }) => {
  return (
    <div className="rounded-xl border border-border overflow-x-auto shadow-sm bg-surface">
      <table className="w-full border-collapse min-w-[1000px]">
        <thead>
          <tr className="bg-slate-50 border-b border-border">
            <th className="px-4 py-3 text-left font-semibold text-slate-500 text-sm">ID</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-500 text-sm">Name</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-500 text-sm">Age</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-500 text-sm">Class</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-500 text-sm">Subjects</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-500 text-sm">Attendance</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-500 text-sm">Role</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-500 text-sm">Status</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-500 text-sm">Joined</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-500 text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr
              key={employee.id}
              className="border-b border-border hover:bg-slate-50 transition-colors cursor-pointer group"
              onClick={() => onSelect(employee)}
            >
              <td className="px-4 py-3 text-sm text-slate-500 font-mono">{employee.id.slice(0, 8)}...</td>
              <td className="px-4 py-3 font-medium text-slate-900">{employee.name}</td>
              <td className="px-4 py-3 text-slate-700">{employee.age}</td>
              <td className="px-4 py-3">
                <span className="bg-indigo-50 text-indigo-600 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                  {employee.class}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-slate-500">
                {employee.subjects.slice(0, 2).join(', ')}{employee.subjects.length > 2 ? '...' : ''}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${employee.attendance > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      style={{ width: `${Math.min(employee.attendance, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-slate-600">{employee.attendance}%</span>
                </div>
              </td>
              <td className="px-4 py-3 capitalize text-slate-700">{employee.role || 'Employee'}</td>
              <td className="px-4 py-3">
                <div className="flex items-center text-slate-700 text-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                  Active
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-slate-500">2023-01-15</td>
              <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                <button className="btn btn-icon btn-ghost opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeGrid;
