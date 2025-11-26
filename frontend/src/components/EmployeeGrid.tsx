import React from 'react';
import { MoreHorizontal, Edit, Trash2, Flag } from 'lucide-react';
import type { Employee } from '../types';

interface EmployeeGridProps {
  employees: Employee[];
  onSelect: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
}

const EmployeeGrid: React.FC<EmployeeGridProps> = ({ employees, onSelect, onEdit }) => {
  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-border">
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Age</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Class</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Subjects</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Attendance</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {employees.map((emp) => (
              <tr
                key={emp.id}
                className="hover:bg-slate-50 transition-colors cursor-pointer group"
                onClick={() => onSelect(emp)}
              >
                <td className="p-4">
                  <div className="font-medium text-slate-900">{emp.name}</div>
                  <div className="text-xs text-slate-500 capitalize">{emp.role || 'Employee'}</div>
                </td>
                <td className="p-4 font-mono text-xs text-slate-500">{emp.id}</td>
                <td className="p-4 text-slate-700">{emp.age}</td>
                <td className="p-4 text-slate-700">{emp.class}</td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {emp.subjects.slice(0, 2).map(sub => (
                      <span key={sub} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs border border-slate-200">
                        {sub}
                      </span>
                    ))}
                    {emp.subjects.length > 2 && (
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-xs border border-slate-200">
                        +{emp.subjects.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${emp.attendance > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                        style={{ width: `${Math.min(emp.attendance, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-slate-600">{emp.attendance}%</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${emp.attendance > 90
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                    {emp.attendance > 90 ? 'Excellent' : 'Average'}
                  </span>
                </td>
                <td className="p-4 text-right" onClick={e => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                      onClick={(e) => { e.stopPropagation(); onEdit(emp); }}
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-warning hover:bg-warning/10 rounded-md transition-colors" title="Flag">
                      <Flag size={16} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-danger hover:bg-danger/10 rounded-md transition-colors" title="Delete">
                      <Trash2 size={16} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeGrid;
