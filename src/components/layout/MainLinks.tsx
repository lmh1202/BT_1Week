import React from "react";
import {
  IconHomeQuestion,
  IconLayoutGridAdd,
  IconArrowsMoveHorizontal,
  IconFishHook,
  IconListCheck,
  IconArticle,
  IconListSearch,
  IconSitemap,
  IconTornado,
} from "@tabler/icons";
import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";

const data = [
  {
    icon: <IconHomeQuestion size={16} />,
    color: "blue",
    label: "Giải Thích Đề Bài",
    link: "/about",
  },
  {
    icon: <IconLayoutGridAdd size={16} />,
    color: "teal",
    label: "A1: Component",
    link: "/exercise/1",
  },
  {
    icon: <IconArrowsMoveHorizontal size={16} />,
    color: "cyan",
    label: "A2: State",
    link: "/exercise/2",
  },
  {
    icon: <IconFishHook size={16} />,
    color: "pink",
    label: "A3: Hook",
    link: "/exercise/3",
  },
  {
    icon: <IconArticle size={16} />,
    color: "violet",
    label: "A4: Form",
    link: "/exercise/4",
  },
  {
    icon: <IconListCheck size={16} />,
    color: "grape",
    label: "A5: List & Detail",
    link: "/exercise/5",
  },
  {
    icon: <IconListSearch size={16} />,
    color: "red",
    label: "B1: Array Handling",
    link: "/exercise/b1",
  },
  {
    icon: <IconSitemap size={16} />,
    color: "orange",
    label: "B2: Object Handling",
    link: "/exercise/b2",
  },
  {
    icon: <IconArrowsMoveHorizontal size={16} />,
    color: "yellow",
    label: "C1: Todo App State",
    link: "/exercise/c1",
  },
  {
    icon: <IconTornado size={16} />,
    color: "blue",
    label: "C2: Todo App Zustand",
    link: "/exercise/c2"
  }
];

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  link: string;
}

function MainLink({ icon, color, label, link }: MainLinkProps) {
  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <UnstyledButton
        sx={(theme) => ({
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        })}
      >
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>

          <Text size="sm">{label}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
}

export default function MainLinks() {
  return (
    <div>
      {data.map((link) => (
        <MainLink {...link} key={link.label} />
      ))}
    </div>
  );
}
