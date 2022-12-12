import { Button, Container, Drawer, Group, Title } from "@mantine/core";
import { useState } from "react";
import BaiLam3 from "./bailam3/BaiLam3";
import DeBai3 from "./DeBai3";

export default function Exercise3() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Group position="apart">
        <Title order={1}>Exercise 3: Simple React Hook</Title>
        <Button onClick={() => setOpened(true)}>Đề bài</Button>
      </Group>

      <Container py="lg" px={0}>
        <BaiLam3 />
      </Container>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Đề bài 3"
        position="right"
        padding="xl"
        size="xl"
      >
        <DeBai3 />
      </Drawer>
    </>
  );
}
