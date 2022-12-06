/*import {
Client
} from "../models/client";*/
import { useMemo } from "react";

export default function useRows() {
  const rows = useMemo(
    () => [
      {
        id: "1",
        name: "Felipe",
        telephone: "6479014847",
        email: "felipe961031@gmail.com",
        address: "1484 Torrington",
        postalCode: "L5V",
        city: "Mississsauga",
        province: "ON",
      },
      {
        id: "2",
        name: "Deiby",
        telephone: "00014455",
        email: "deiby@gmail.com",
        address: "1484 pronvincial rd",
        postalCode: "L3A",
        city: "Mississsauga",
        province: "ON",
      },
    ],
    []
  );

  return rows;
}
