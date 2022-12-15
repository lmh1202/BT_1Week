import { ActionIcon, Box, Button, Card, Checkbox, Input, Menu, Stack, Tabs, Group, Center, Aside } from "@mantine/core";
import { IconCheck, IconDots, IconSearch, IconTrash } from "@tabler/icons";
import { useStore } from "./data/store.zustand";

export default function BaiLamC2() {
  const todoList = useStore((state) => state.todos);
  const todoListStore = useStore();
  const submit = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      todoListStore.addTodo();
    }
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
              value={todoListStore.newTodo}
              onChange={(event) => todoListStore.setNewTodo(event.target.value)}
              onKeyDown={(e) => submit(e)}
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
          {todoList.map(todos => (
            <>
              <Box my={10}>
                <Group position='apart'>
                  <Checkbox label={todos.name} />
                  <Menu position="left">
                    <Menu.Target>
                      <ActionIcon>
                        <IconDots size={12} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item icon={<IconTrash />}>Delete</Menu.Item>
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
