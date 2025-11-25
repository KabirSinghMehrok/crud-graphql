import React from 'react';
import { X, Calendar, Book, Clock, User, Shield } from 'lucide-react';
import type { Employee } from '../types';

interface EmployeeDetailProps {
  employee: Employee;
  onClose: () => void;
}

const EmployeeDetail: React.FC<EmployeeDetailProps> = ({ employee, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 animate-fade-in backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[700px] max-h-[90vh] overflow-y-auto bg-surface rounded-2xl shadow-2xl relative animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="h-[120px] bg-gradient-to-br from-primary to-secondary"></div>
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors backdrop-blur-md"
            onClick={onClose}
          >
            <X size={24} />
          </button>
          <div className="px-8 -mt-10 flex items-end gap-6 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-slate-800 border-4 border-surface flex items-center justify-center shadow-lg text-white">
              <User size={48} />
            </div>
            <div className="mb-2">
              <h1 className="text-2xl font-bold text-slate-900">{employee.name}</h1>
              <p className="text-slate-500">{employee.role || 'Employee'} • {employee.class}</p>
            </div>
          </div>
        </div>

        <div className="px-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-4 border-b border-border pb-2">Personal Info</h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <User size={16} /> <span>ID</span>
                  </div>
                  <span className="font-mono text-slate-900 pl-6">{employee.id}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar size={16} /> <span>Age</span>
                  </div>
                  <span className="font-medium text-slate-900 pl-6">{employee.age} Years</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Shield size={16} /> <span>Role</span>
                  </div>
                  <span className="font-medium text-slate-900 pl-6 capitalize">{employee.role || 'Employee'}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-4 border-b border-border pb-2">Academic</h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Book size={16} /> <span>Subjects</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pl-6">
                    {employee.subjects.map(sub => (
                      <span key={sub} className="bg-slate-50 px-2.5 py-1 rounded-md text-sm text-slate-600 border border-border">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock size={16} /> <span>Attendance</span>
                  </div>
                  <div className="pl-6 flex items-center gap-4">
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${employee.attendance > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                        style={{ width: `${Math.min(employee.attendance, 100)}%` }}
                      ></div>
                    </div>
                    <span className="font-medium text-slate-700">{employee.attendance}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
