export interface Employee {
  id: string;
  name: string;
  age: number;
  class: string;
  subjects: string[];
  attendance: number;
  role?: string;
}

export interface PaginatedEmployees {
  employees: Employee[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
