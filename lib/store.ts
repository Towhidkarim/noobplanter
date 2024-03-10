import { create } from 'zustand';

type Store = {
  cart: {
    id: number;
    tempID: string;
    name: string;
    count: number;
    price: number;
  }[];
  environmentData: {
    temperature: number;
    humidity: number;
    sunlight: number;
  };
  addToCart: ({
    id,
    name,
    count,
    price,
    tempID,
  }: {
    id: number;
    tempID: string;
    name: string;
    count: number;
    price: number;
  }) => void;
  removeFromCart: (tempID: string) => void;
  changeQuantity: (tempID: string, quantity: number) => void;
  setEnviromentData: ({
    temperature,
    sunlight,
    humidity,
  }: {
    temperature: number;
    humidity: number;
    sunlight: number;
  }) => void;
};

export const useStore = create<Store>((set) => ({
  cart: [],
  environmentData: {
    humidity: 0,
    sunlight: 0,
    temperature: 0,
  },
  addToCart: ({
    id,
    name,
    count,
    price,
    tempID,
  }: {
    id: number;
    name: string;
    count: number;
    price: number;
    tempID: string;
  }) => {
    set((state) => ({
      cart: [{ id, name, count, price, tempID }, ...state.cart],
    }));
  },
  removeFromCart: (tempID: string) => {
    set((state) => ({
      cart: state.cart.filter((item, i) =>
        tempID === item.tempID ? false : true
      ),
    }));
  },
  changeQuantity: (tempID: string, quantity: number) => {
    set((state) => ({
      cart: state.cart.map((item, i) =>
        tempID === item.tempID
          ? {
              ...item,
              count: item.count + quantity < 0 ? 0 : item.count + quantity,
            }
          : item
      ),
    }));
  },
  setEnviromentData: ({
    temperature,
    sunlight,
    humidity,
  }: {
    temperature: number;
    humidity: number;
    sunlight: number;
  }) => {
    set({ environmentData: { temperature, sunlight, humidity } });
  },
}));
