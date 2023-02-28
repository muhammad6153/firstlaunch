import { LoginCredentials } from "@/app/models/login-credentials";

export interface NewUser extends LoginCredentials {
  readonly name: string;
}
