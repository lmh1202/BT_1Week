import create from "zustand";
import { v4 as uuidv4 } from "uuid";


interface todosZustand {
  uuid: string,
  name: string,
  stutus: 'pending' | 'completed';
};

type storeZustand = {
  todos: todosZustand[];
  newTodo: string,
  addTodo: () => void;
  setNewTodo: (text: string) => void;
};
export const useStore = create<storeZustand>()((set) => ({
  todos: [
    {
      uuid: '1',
      name: 'Giat do',
      stutus: 'pending'
    },
    {
      uuid: '2',
      name: 'Nau com',
      stutus: 'pending'
    }
  ],
  newTodo: '',
  addTodo: () =>
    set((state) => ({
      todos: [...state.todos, { uuid: uuidv4(), name: state.newTodo, stutus: 'pending' }],
      newTodo: "",
    })),
  setNewTodo: (newTodo: string) =>
    set((state) => ({
      ...state,
      newTodo,
    })),
}));


