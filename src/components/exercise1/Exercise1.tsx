import { Button, Container, Drawer, Group, Title } from "@mantine/core";
import { useState } from "react";
import BaiLam1 from "./bailam1/BaiLam1";
import DeBai1 from "./DeBai1";

export default function Exercise1() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Group position="apart">
        <Title order={1}>Exercise 1: Simple React Component</Title>
        <Button onClick={() => setOpened(true)}>Đề bài</Button>
      </Group>

      <Container py="lg" px={0}>
        <BaiLam1 />
      </Container>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Đề bài 1"
        position="right"
        padding="xl"
        size="xl"
      >
        <DeBai1 />
      </Drawer>
    </>
  );
}
