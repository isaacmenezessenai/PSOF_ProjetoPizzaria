import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TableContextData {
  tableNumber: string | null; 
  tableId: string | null;     // ID da Mesa adicionado aqui!!!
  setTableNumber: (number: string) => void;
  setTableId: (id: string) => void;
  clearTable: () => void; //Função para limpar a mesa em caso de logout ou troca de mesa
}

const TableContext = createContext<TableContextData>({} as TableContextData);

interface TableProviderProps {
  children: ReactNode;
}

export const TableProvider: React.FC<TableProviderProps> = ({ children }) => {
  const [tableNumber, setTableNumber] = useState<string | null>(null);
  const [tableId, setTableId] = useState<string | null>(null);

  const clearTable = () => {
    setTableNumber(null);
    setTableId(null);
  };

  return (
    <TableContext.Provider
      value={{
        tableNumber,
        tableId,
        setTableNumber,
        setTableId,
        clearTable, 
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export function useTable() {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error('useTable must be used within a TableProvider');
  }

  return context;
}