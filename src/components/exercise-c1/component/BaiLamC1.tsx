import { Menu, Button, Text, Tabs, Card, Input, ActionIcon, Center, Box, Checkbox, Group, Stack, TextInput } from "@mantine/core";
import { IconChecklist, IconSortAscending, IconDots, IconTrash } from "@tabler/icons";
import { v4 as uuidv4 } from 'uuid';
import { KeyboardEvent, useState } from "react";
import data from "../data/todo.type";

export default function BaiLamC1() {
  // const storeToDo = JSON.parse(localStorage.getItem('toDoList'))
  const [toDoList, setTodoList] = useState([data]);
  const [textInput, setTextInput] = useState("");
  const [checkInput, setCheckInput] = useState(true);
  const onAddToDo = (e: KeyboardEvent) => {
    if (e.key === "Enter" && textInput) {
      setTodoList(prev => {
        const newToDo = [...prev, [{ uuid: uuidv4(), name: textInput, status: "pending" }]];
        const jsonToDo = JSON.stringify(newToDo);
        localStorage.setItem('toDoList', jsonToDo);
        return [...prev, [{ uuid: uuidv4(), name: textInput, status: "pending" }]];
      });
      setTextInput("");
      setCheckInput(true);
    }
    else if (e.key === "Enter" && !textInput) {
      setCheckInput(false);
    }
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
              <Tabs.Tab value="All">All</Tabs.Tab>
              <Tabs.Tab value="Pending">Pending</Tabs.Tab>
              <Tabs.Tab value="Complete">Complete</Tabs.Tab>
            </Tabs.List>
          </Tabs>
          {toDoList.map((todo) => (
            <>
              <Box>
                <Group grow>
                  {todo.map((props) => (
                    <>
                      <Checkbox label={props.name} />
                      <Menu>
                        <Menu.Target>
                          <ActionIcon>
                            <IconDots size={18} />
                          </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Item icon={<IconTrash size={12} />}>Delete</Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </>
                  ))}
                </Group>
              </Box>
            </>
          ))}



        </Stack>


        <Center>
          <Button leftIcon={<IconChecklist size={18} />}>Save</Button>
        </Center>

      </Card>
    </>
  );
}
