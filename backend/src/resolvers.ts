import { v4 as uuidv4 } from 'uuid';

// Mock Data Store
let employees = [
  {
    id: '1',
    name: 'John Doe',
    age: 30,
    class: 'Senior',
    subjects: ['Math', 'Physics'],
    attendance: 95.5,
    role: 'employee',
  },
  {
    id: '2',
    name: 'Jane Smith',
    age: 28,
    class: 'Junior',
    subjects: ['Chemistry', 'Biology'],
    attendance: 88.0,
    role: 'admin',
  },
  // Add more mock data for grid visualization
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `mock-${i + 3}`,
    name: `Employee ${i + 3}`,
    age: 20 + (i % 10),
    class: i % 2 === 0 ? 'Senior' : 'Junior',
    subjects: ['General'],
    attendance: 70 + (i % 30),
    role: 'employee',
  })),
];

export const resolvers = {
  Query: {
    employees: (_: any, { page = 1, limit = 10, filter, sort }: any) => {
      let result = [...employees];

      // Filtering
      if (filter) {
        if (filter.name) {
          result = result.filter((e) =>
            e.name.toLowerCase().includes(filter.name.toLowerCase())
          );
        }
        if (filter.class) {
          result = result.filter((e) =>
            e.class.toLowerCase().includes(filter.class.toLowerCase())
          );
        }
      }

      // Sorting
      if (sort) {
        const { field, order } = sort;
        result.sort((a: any, b: any) => {
          if (a[field] < b[field]) return order === 'ASC' ? -1 : 1;
          if (a[field] > b[field]) return order === 'ASC' ? 1 : -1;
          return 0;
        });
      }

      // Pagination
      const totalCount = result.length;
      const totalPages = Math.ceil(totalCount / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedEmployees = result.slice(startIndex, endIndex);

      return {
        employees: paginatedEmployees,
        totalCount,
        totalPages,
        currentPage: page,
      };
    },
    employee: (_: any, { id }: any) => {
      return employees.find((e) => e.id === id);
    },
  },
  Mutation: {
    addEmployee: (_: any, { input }: any, context: any) => {
      // Simple Auth Check (Mock)
      if (context.userRole !== 'admin') {
        throw new Error('Unauthorized: Only admins can add employees');
      }

      const newEmployee = {
        id: uuidv4(),
        ...input,
      };
      employees.push(newEmployee);
      return newEmployee;
    },
    updateEmployee: (_: any, { id, input }: any, context: any) => {
      // Simple Auth Check (Mock)
      if (context.userRole !== 'admin') {
        throw new Error('Unauthorized: Only admins can update employees');
      }

      const index = employees.findIndex((e) => e.id === id);
      if (index === -1) throw new Error('Employee not found');

      employees[index] = {
        ...employees[index],
        ...input,
      };
      return employees[index];
    },
    deleteEmployee: (_: any, { id }: any, context: any) => {
      // Simple Auth Check (Mock)
      if (context.userRole !== 'admin') {
        throw new Error('Unauthorized: Only admins can delete employees');
      }

      const initialLength = employees.length;
      employees = employees.filter((e) => e.id !== id);
      return employees.length !== initialLength;
    },
  },
};
