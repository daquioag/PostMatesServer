export type User = {
    id: number;
    username: string;
    email: string;
    password: string;
    apiCalls: number;
    admin: boolean;
  };

  export type CreateUserParams = {
    username: string;
    email: string;
    password: string;
    admin?: boolean; // Making admin optional
  };

  export type DeleteUserParams = {
    id:number;
  }

  export type NewPasswordParams = {
    password: string;
  }

  export type updateUserParams = {
    username?: string;
    admin?: boolean;
    email?: string;
  }
  
  export type LoginUserParams = {
    email: string;
    password: string;
  };
  
  