import { JSONType } from "@/data/model";

export interface Encrypt {
  encrypt (value: JSONType): string
}