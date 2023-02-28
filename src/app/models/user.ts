export enum UserRole {
  User = "USER",
  Admin = "ADMIN",
  Partner = "PARTNER",
  Collaborator = "COLLABORATOR",
  Coordinator = "COORDINATOR",
}

export class User {
  public readonly id: number;
  public readonly uid: string;
  public readonly name: string;
  public readonly email: string;
  public readonly profilePicture: string;
  public readonly address: string;
  public readonly nationality: string;
  public readonly dateOfBirth: string;
  public readonly phoneNumber: string;
  public readonly cityOrZipcode: string;
  public readonly age: string;
  public readonly creationDate: string;
  public readonly accessToken: string;
  public readonly refreshToken: string;
  public readonly role: UserRole;

  constructor(user: Partial<User>) {
    this.id = user.id ?? 0;
    this.uid = user.uid ?? "";
    this.name = user.name ?? "";
    this.email = user.email ?? "";
    this.profilePicture = user.profilePicture ?? "";
    this.address = user.address ?? "";
    this.nationality = user.nationality ?? "";
    this.dateOfBirth = user.dateOfBirth ?? "";
    this.phoneNumber = user.phoneNumber ?? "";
    this.cityOrZipcode = user.cityOrZipcode ?? "";
    this.age = user.age ?? "";
    this.creationDate = user.creationDate ?? "";
    this.accessToken = user.accessToken ?? "";
    this.refreshToken = user.refreshToken ?? "";
    this.role = user.role ?? UserRole.User;
  }
}
