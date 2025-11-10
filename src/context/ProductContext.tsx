import React, { createContext, useReducer, useContext, Dispatch, ReactNode } from 'react';
import { Product } from '../types/Product';
import { initialProducts } from '../data/initialProducts';

type State = { products: Product[] };
type Action =
  | { type: 'ADD'; payload: Product }
  | { type: 'UPDATE'; payload: Product }
  | { type: 'DELETE'; payload: number };

const ProductContext = createContext<{ state: State, dispatch: Dispatch<Action> } | undefined>(undefined);

function productReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD':
      return { products: [...state.products, action.payload] };
    case 'UPDATE':
      return { products: state.products.map(p => p.id === action.payload.id ? action.payload : p) };
    case 'DELETE':
      return { products: state.products.filter(p => p.id !== action.payload) };
    default:
      return state;
  }
}

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, { products: initialProducts });
  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProductContext must be used within ProductProvider');
  return context;
}
