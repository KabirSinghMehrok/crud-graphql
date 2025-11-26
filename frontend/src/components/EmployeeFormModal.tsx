import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import type { Employee } from '../types';

interface EmployeeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Employee, 'id'>) => void;
  initialData?: Employee | null;
  title: string;
}

const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({ isOpen, onClose, onSubmit, initialData, title }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    class: '',
    subjects: '',
    attendance: '',
    role: 'employee'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        age: initialData.age.toString(),
        class: initialData.class,
        subjects: initialData.subjects.join(', '),
        attendance: initialData.attendance.toString(),
        role: initialData.role || 'employee'
      });
    } else {
      setFormData({
        name: '',
        age: '',
        class: '',
        subjects: '',
        attendance: '',
        role: 'employee'
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      age: parseInt(formData.age) || 0,
      class: formData.class,
      subjects: formData.subjects.split(',').map(s => s.trim()).filter(s => s),
      attendance: parseFloat(formData.attendance) || 0,
      role: formData.role
    } as any); // Type assertion needed because id is missing, which is expected
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 animate-fade-in backdrop-blur-sm">
      <div className="w-full max-w-md bg-surface rounded-xl shadow-2xl animate-slide-up overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border bg-slate-50">
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <button onClick={onClose} className="btn btn-icon btn-ghost">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Name</label>
            <input
              type="text"
              required
              className="px-3 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700">Age</label>
              <input
                type="number"
                required
                className="px-3 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                value={formData.age}
                onChange={e => setFormData({ ...formData, age: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700">Class</label>
              <input
                type="text"
                required
                className="px-3 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                value={formData.class}
                onChange={e => setFormData({ ...formData, class: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Subjects (comma separated)</label>
            <input
              type="text"
              required
              placeholder="Math, Physics, Chemistry"
              className="px-3 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              value={formData.subjects}
              onChange={e => setFormData({ ...formData, subjects: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700">Attendance (%)</label>
              <input
                type="number"
                step="0.1"
                max="100"
                required
                className="px-3 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                value={formData.attendance}
                onChange={e => setFormData({ ...formData, attendance: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700">Role</label>
              <select
                className="px-3 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-border">
            <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
            <button type="submit" className="btn btn-primary">
              <Save size={18} />
              Save Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeFormModal;
