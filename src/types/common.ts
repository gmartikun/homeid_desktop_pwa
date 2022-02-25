import { HeadersDefaults } from "axios";

export type CustomHeaders = {
  Authorization: string;
} & HeadersDefaults;
