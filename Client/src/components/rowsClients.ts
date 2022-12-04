/*import {
Client
} from "../models/client";*/
import { useMemo } from "react";

export default function useRows() {
  const rows = useMemo(
    () => [
      {
        id: "1",
        Name: "Felipe",
        Telephone: "6479014847",
        Email: "felipe961031@gmail.com",
        Address: "1484 Torrington",
        PostalCode: "L5V",
        City: "Mississsauga",
        Province: "ON",
      },
      {
        id: "2",
        Name: "Deiby",
        Telephone: "00014455",
        Email: "deiby@gmail.com",
        Address: "1484 pronvincial rd",
        PostalCode: "L3A",
        City: "Mississsauga",
        Province: "ON",
      },
    ],
    []
  );

  return rows;
}
