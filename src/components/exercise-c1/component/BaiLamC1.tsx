import { Menu, Button, Tabs, Card, Input, ActionIcon, Center, Box, Checkbox, Group, Stack } from "@mantine/core";
import { IconChecklist, IconSortAscending, IconDots, IconTrash } from "@tabler/icons";
import { v4 as uuidv4 } from 'uuid';
import { KeyboardEvent, useState, } from "react";
import { Todo } from "../data/todo.type";
import "../css/style.css";

export default function BaiLamC1() {
  const getDataLocal: Todo[] = JSON.parse(localStorage.getItem("todoList") || '[]');
  const [todoList, setTodoList] = useState(getDataLocal);
  const [textInput, setTextInput] = useState("");
  const [error, setError] = useState<null | string>(null);
  const [activeTab, setActiveTab] = useState<string | null>('all');

  //Input
  const onAddTodo = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      if (textInput.trim() === '') {
        setError('Not Empty');
        return;
      }
      setTodoList(todo => {
        const newToDo: Todo[] = [...todo, { uuid: uuidv4(), name: textInput, status: "pending" }];
        return newToDo;
      });
      setTextInput("");
    }
  };

  //Completed
  const checkCompleted = (index: number) => {
    const newTodoList = [...todoList];
    //change status
    newTodoList[index] = {
      ...newTodoList[index],
      status: newTodoList[index].status === "pending" ? "completed" : "pending"
    };
    setTodoList(newTodoList);
  };

  //Filter
  const filteredTodos = todoList.filter(todos => activeTab === "all" || activeTab === todos.status);

  //Delete Todo
  const deleteTodo = (index: number) => {
    const newTodo = [...todoList];
    const deleteTodo = newTodo.filter(todo => todo.uuid !== newTodo[index].uuid);
    setTodoList(deleteTodo);
  };

  //Save Local Storage
  const saveLocalStore = () => {
    const listTodoStorage = [...todoList];
    const saveLocalStore = JSON.stringify(listTodoStorage);
    localStorage.setItem("todoList", saveLocalStore);
  };

  return (
    <>
      <Card radius='md' p={20}>
        <Stack spacing='xl'>
          <Input.Wrapper error={error ?? ''}>
            <Input
              icon={<IconSortAscending />}
              placeholder="Add a new task"
              value={textInput}
              onChange={(e) => {
                setTextInput(e.target.value);
              }}
              onKeyPress={(e) => onAddTodo(e)}
            />
          </Input.Wrapper>

          <Tabs onTabChange={(tab) => setActiveTab(tab)}>
            <Tabs.List grow>
              <Tabs.Tab value="all" >All</Tabs.Tab>
              <Tabs.Tab value="pending" >Pending</Tabs.Tab>
              <Tabs.Tab value="completed" >Completed</Tabs.Tab>
            </Tabs.List>
          </Tabs>

          {filteredTodos.map((todo, index) => (
            <Box
              key={todo.uuid}
              className={todo.status === 'completed' ? "todoCompleted" : ""}
            >
              <Group position='apart'>
                <Checkbox
                  checked={todo.status === 'completed' ? true : false}
                  label={todo.name}
                  onChange={() => checkCompleted(index)}
                />
                <Menu>
                  <Menu.Target>
                    <ActionIcon>
                      <IconDots size={18} />
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item onClick={() => deleteTodo(index)} icon={<IconTrash size={12} />}>Delete</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Box>
          ))}
        </Stack>

        <Center mt={50}>
          <Button leftIcon={<IconChecklist size={18} />} onClick={saveLocalStore}>Save</Button>
        </Center>
      </Card>
    </>
  );
}
