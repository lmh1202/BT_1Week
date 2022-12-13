import { Menu, Button, Text, Tabs, Card, Input, ActionIcon, Center, Box, Checkbox, Group, Stack, TextInput } from "@mantine/core";
import { IconChecklist, IconSortAscending, IconDots, IconTrash } from "@tabler/icons";
import { parse, v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from "@mantine/hooks";
import { KeyboardEvent, useState } from "react";
import data, { Todo } from "../data/todo.type";

export default function BaiLamC1() {
  const getDataLocal: Todo[] = JSON.parse(localStorage.getItem("todoList"));
  const [toDoList, setTodoList] = useState(getDataLocal);
  const [textInput, setTextInput] = useState("");
  const [checkInput, setCheckInput] = useState(true);
  const [renderFilter, setRenderFilter] = useState("all");

  //Input
  const onAddToDo = (e: KeyboardEvent) => {
    if (e.key === "Enter" && textInput) {
      setTodoList(todo => {
        const newToDo = [...todo, { uuid: uuidv4(), name: textInput, status: "pending" }];
        return [...todo, { uuid: uuidv4(), name: textInput, status: "pending" }];
      });
      setTextInput("");
      setCheckInput(true);
      console.log(toDoList);
    }
    else if (e.key === "Enter" && !textInput) {
      setCheckInput(false);
    }
  };

  //Completed
  const checkCompleted = (index: number) => {
    console.log(index);
    const newTodoList = [...toDoList];
    //change status
    newTodoList[index] = {
      ...newTodoList[index],
      status: newTodoList[index].status === "pending" ? "completed" : "pending"
    };
    console.log(newTodoList);
    setTodoList(newTodoList);
  };

  //Filter
  const allFilter = () => {
    setRenderFilter("all");
    console.log(rending);
  };

  const pendingFilter = () => {
    setRenderFilter("pending");
    console.log(rending);
  };

  const completedFilter = () => {
    setRenderFilter("completed");
    console.log(rending);
  };
  const rending = toDoList.filter(todos => renderFilter === "all" || renderFilter === todos.status);

  //Delete Todo
  const deleteTodo = (index: number) => {
    const newTodo = [...toDoList];
    const deleteTodo = newTodo.filter(todo => {
      return todo.uuid !== newTodo[index].uuid;
    });
    setTodoList(deleteTodo);
  };

  //Save Local Storage
  const saveLocalStore = () => {
    const listTodoStorage = [...toDoList];
    const saveLocalStore = JSON.stringify(listTodoStorage);
    localStorage.setItem("todoList", saveLocalStore);
  };

  return (
    <>
      <Card radius='md' p={20}>
        <Stack spacing='xl'>
          <Input.Wrapper error={(checkInput) ? "" : "Error message"}>
            <Input
              icon={<IconSortAscending />}
              placeholder="Add a new task"
              value={textInput}
              onChange={(e) => {
                setTextInput(e.target.value);
              }}
              onKeyPress={(e) => onAddToDo(e)}
            />
          </Input.Wrapper>

          <Tabs>
            <Tabs.List grow>
              <Tabs.Tab value="all" onClick={allFilter}>All</Tabs.Tab>
              <Tabs.Tab value="Pending" onClick={pendingFilter}>Pending</Tabs.Tab>
              <Tabs.Tab value="Completed" onClick={completedFilter}>Completed</Tabs.Tab>
            </Tabs.List>
          </Tabs>
          {rending.map((todo, index) => (
            <>
              <Box>
                <Group position='apart'>
                  <Checkbox label={todo.name} onClick={() => checkCompleted(index)} />
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
            </>
          ))}
        </Stack>

        <Center mt={50}>
          <Button leftIcon={<IconChecklist size={18} />} onClick={saveLocalStore}>Save</Button>
        </Center>
      </Card>
    </>
  );
}
