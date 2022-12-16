import { ActionIcon, Box, Button, Card, Checkbox, Input, Menu, Stack, Tabs, Group, Center, Aside } from "@mantine/core";
import { IconCheck, IconDots, IconSearch, IconTrash } from "@tabler/icons";
import { KeyboardEvent, useState } from "react";
import { useStore } from "./data/store.zustand";

export default function BaiLamC2() {
  const todoList = useStore((state) => state.todos);
  const todoListStore = useStore();
  const [text, setText] = useState("");
  const submit = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      todoListStore.addTodo(text);
      setText(" ");
    }
  };
  const checkbox = (index: number) => {
    console.log(index);
  };
  console.log(todoList);
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
              <Tabs.Tab value="all">All</Tabs.Tab>
              <Tabs.Tab value="pending">Pending</Tabs.Tab>
              <Tabs.Tab value="completed">Completed</Tabs.Tab>
            </Tabs.List>
          </Tabs>
          {todoList.map((todos, index) => (
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
            <Button leftIcon={<IconCheck />}>Save</Button>
          </Center>
        </Stack>
      </Card>
    </>
  );
}
