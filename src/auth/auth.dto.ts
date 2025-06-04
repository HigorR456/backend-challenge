export class LoginDto {
  email: string;
  password: string;
}

export class RegisterDto {
  email: string;
  password: string;
}

export class ForgotPasswordDto {
  email: string;
}

export class ChangePasswordDto {
  email: string;
  password: string;
  new_password: string;
}