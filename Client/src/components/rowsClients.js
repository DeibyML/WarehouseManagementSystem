import {
  Id,
  Name,
  Telephone,
  Email,
  Address,
  PostalCode,
  City,
  Province,
} from "../models/client";
import { useMemo } from "react";

export default function useRows() {
  const rows = useMemo(
    () => [
      {
        Id: "1",
        Name: "Felipe",
        Telephone: "6479014847",
        Email: "felipe961031@gmail.com",
        Address: "1484 Torrington",
        PostalCode: "L5V",
        City: "Mississsauga",
        Province: "ON",
      },
    ],
    []
  );

  return rows;
}
