import React, { createContext, useContext, useState, ReactNode } from "react";

interface TableContextType {
  tableNumber: string | null;
  setTableNumber: (table: string | null) => void;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider = ({ children }: { children: ReactNode }) => {
  const [tableNumber, setTableNumber] = useState<string | null>(null);

  return (
    <TableContext.Provider value={{ tableNumber, setTableNumber }}>
      {children}
    </TableContext.Provider>
  );
};

export function useTable() {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTable deve ser usado dentro de TableProvider");
  }
  return context;
}
