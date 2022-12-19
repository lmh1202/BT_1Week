import create from "zustand";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "@mantine/hooks";
import zustand from "zustand";

export interface TodosZustand {
  uuid: string,
  name: string,
  status: 'pending' | 'completed';
};

type StoreZustand = {
  todos: TodosZustand[];
  addTodo: (text: string) => void;
  updateStatus: (uuid: string) => void;
  deleteTodo: (index: number) => void;
  filter: string;
  changeFilter: (filter: string) => void;
  saveLocal: () => void;
};

export const useStore = create<StoreZustand>()((set, get) => ({
  todos: JSON.parse(localStorage.getItem("todoListC2") || '[]'),
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
  saveLocal: () => {
    console.log(get().todos);

    // localStorage.setItem
  }
}));



