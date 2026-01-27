export default interface RegisterUserTP {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "PROVIDER";
}
