interface UpdateUserByIdDto {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  active: boolean;
}

export interface UpdateUserByIdRequest {
  id: string;
  userData: UpdateUserByIdDto;
}
