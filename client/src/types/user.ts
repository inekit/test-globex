export interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  position_name: string;
  department: string;
  hire_date: string;
}

export interface ApiResponse {
  data: User[];
  success: boolean;
  error?: {
    message: string;
    code: number;
  };
}
