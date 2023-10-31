import type { Meta, StoryObj } from "@storybook/react";

import { SelectDemo } from "./FilterBuilder";

const meta: Meta<typeof SelectDemo> = {
  component: SelectDemo,
};

export default meta;
type Story = StoryObj<typeof SelectDemo>;

export const Primary: Story = {
  args: {
    primary: true,
    label: "SelectDemo",
  },
};
