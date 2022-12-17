import create from "zustand";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "@mantine/hooks";
import zustand from "zustand";

export interface todosZustand {
  uuid: string,
  name: string,
  status: 'pending' | 'completed';
};

type storeZustand = {
  todos: todosZustand[];
  addTodo: (text: string) => void;
  updateStatus: (uuid: string) => void;
  deleteTodo: (index: number) => void;
  filter: string;
  changeFilter: (filter: string) => void;
  saveLocal: (todo: todosZustand[]) => void;
};

export const useStore = create<storeZustand>()((set) => ({
  todos: [
    {
      uuid: '1',
      name: 'Giat do',
      status: 'pending'
    },
    {
      uuid: '2',
      name: 'Nau com',
      status: 'pending'
    }
  ],
  addTodo: (text: string) => set((state) => ({
    todos: [...state.todos, { uuid: uuidv4(), name: text, status: 'pending' }],
  })),
  updateStatus: (uuid: string) => set((state) => ({
    todos: state.todos.map((todo) => {
      return { ...todo, status: todo.uuid === uuid ? (todo.status === 'pending' ? 'completed' : 'pending') : todo.status };
    })
  })),
  deleteTodo: (index: number) => set((state) => ({
    todos: state.todos.filter((todo) => {
      return todo.uuid !== state.todos[index].uuid;
    })
  })),
  filter: 'all',
  changeFilter: (filter: string) => set((state) => ({
    filter: state.filter = filter,
  })),
  saveLocal: (todo: todosZustand[]) => set((state) => ({

  }))
}));



