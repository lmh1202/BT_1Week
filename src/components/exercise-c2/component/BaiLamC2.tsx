import { ActionIcon, Box, Button, Card, Checkbox, Input, Menu, Stack, Tabs, Group, Center, Aside } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconCheck, IconDots, IconSearch, IconTrash } from "@tabler/icons";
import { KeyboardEvent, useState } from "react";
import { todosZustand, useStore } from "./data/store.zustand";

export default function BaiLamC2() {
  const todoList = useStore((state) => state.todos);
  const [local, setLocal] = useLocalStorage({ key: 'todoListC2', defaultValue: todoList });
  const todoListStore = useStore();
  const [text, setText] = useState("");
  const submit = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      todoListStore.addTodo(text);
      setText("");
    }
  };
  const handleChangeFilter = (filter: string) => {
    todoListStore.changeFilter(filter);
    console.log(todoListStore.filter);
  };
  const handleSave = () => {
    setLocal(todoList);
    console.log(local, typeof (local));

  };
  const renderFilter = todoList.filter(todo => (todoListStore.filter === 'all' || todo.status === todoListStore.filter)
  );

  return (
    <>
      <Card mt={30}>
        <Stack>
          {/* Input */}
          <Input.Wrapper>
            <Input
              icon={<IconSearch />}
              placeholder="Add new todo"
              value={text}
              onChange={(event) => setText(event.target.value)}
              onKeyPress={(event: KeyboardEvent) => submit(event)}
            />
          </Input.Wrapper>
          {/* Tab Filter */}
          <Tabs>
            <Tabs.List grow>
              <Tabs.Tab value="all" onClick={() => handleChangeFilter('all')}>All</Tabs.Tab>
              <Tabs.Tab value="pending" onClick={() => handleChangeFilter('pending')}>Pending</Tabs.Tab>
              <Tabs.Tab value="completed" onClick={() => handleChangeFilter('completed')}>Completed</Tabs.Tab>
            </Tabs.List>
          </Tabs>
          {renderFilter.map((todos, index) => (
            <>
              <Box my={10}>
                <Group position='apart'>
                  <Checkbox label={todos.name} onChange={() => (todoListStore.updateStatus(todos.uuid))} />
                  <Menu position="left">
                    <Menu.Target>
                      <ActionIcon>
                        <IconDots size={12} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item icon={<IconTrash />} onClick={() => { todoListStore.deleteTodo(index); }}>Delete</Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Box>
            </>
          ))}
          {/* Button sava Local Storage */}
          <Center>
            <Button leftIcon={<IconCheck />} onClick={() => handleSave()}>Save</Button>
          </Center>
        </Stack>
      </Card>
    </>
  );
}
