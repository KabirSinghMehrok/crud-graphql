import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation, useQuery } from "@apollo/client/react";
import { LayoutGrid, List, Plus, Search, Filter } from 'lucide-react';
import Layout from './components/Layout';
import EmployeeGrid from './components/EmployeeGrid';
import EmployeeTile from './components/EmployeeTile';
import EmployeeDetail from './components/EmployeeDetail';
import EmployeeFormModal from './components/EmployeeFormModal';
import type { Employee } from './types';

const GET_EMPLOYEES = gql`
  query GetEmployees($filter: EmployeeFilter, $sort: EmployeeSort) {
    employees(filter: $filter, sort: $sort) {
      employees {
        id
        name
        age
        class
        subjects
        attendance
        role
      }
      totalCount
    }
  }
`;

const ADD_EMPLOYEE = gql`
  mutation AddEmployee($input: AddEmployeeInput!) {
    addEmployee(input: $input) {
      id
      name
      age
      class
      subjects
      attendance
      role
    }
  }
`;

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $input: UpdateEmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
      id
      name
      age
      class
      subjects
      attendance
      role
    }
  }
`;

function App() {
  const [viewMode, setViewMode] = useState<'grid' | 'tile'>('grid');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEES);
  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    onCompleted: () => refetch()
  });
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    onCompleted: () => refetch()
  });

  const handleAddClick = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (formData: any) => {
    try {
      if (editingEmployee) {
        await updateEmployee({
          variables: {
            id: editingEmployee.id,
            input: formData
          }
        });
      } else {
        await addEmployee({
          variables: {
            input: formData
          }
        });
      }
      setIsModalOpen(false); // Close modal on successful submit
    } catch (err) {
      console.error('Error saving employee:', err);
      alert('Failed to save employee. Check console for details.');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="w-12 h-12 border-4 border-primary border-b-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error) return <div className="p-8 text-danger font-medium">Error: {error.message}</div>;

  const employees = data?.employees?.employees || [];

  return (
    <Layout>
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1">Employees</h1>
            <p className="text-slate-500">Manage your team members</p>
          </div>
          <button onClick={handleAddClick} className="btn btn-primary">
            <Plus size={20} />
            Add Employee
          </button>
        </div>

        <div className="bg-surface p-3 rounded-xl border border-border shadow-sm flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-[300px]">
            <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-lg border border-border flex-1 max-w-md focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search employees..."
                className="bg-transparent border-none outline-none w-full text-slate-900 placeholder-slate-400"
              />
            </div>
            <button className="btn btn-ghost btn-icon">
              <Filter size={20} />
            </button>
          </div>

          <div className="flex bg-background p-1 rounded-lg border border-border">
            <button
              className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <List size={20} />
            </button>
            <button
              className={`p-2 rounded-md transition-all ${viewMode === 'tile' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
              onClick={() => setViewMode('tile')}
              title="Tile View"
            >
              <LayoutGrid size={20} />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <EmployeeGrid
          employees={employees}
          onSelect={setSelectedEmployee}
          onEdit={handleEditClick}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {employees.map((emp: Employee) => (
            <EmployeeTile
              key={emp.id}
              employee={emp}
              onSelect={setSelectedEmployee}
              onEdit={handleEditClick}
            />
          ))}
        </div>
      )}

      {selectedEmployee && (
        <EmployeeDetail
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}

      <EmployeeFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingEmployee}
        title={editingEmployee ? 'Edit Employee' : 'Add New Employee'}
      />
    </Layout>
  );
}

export default App;
