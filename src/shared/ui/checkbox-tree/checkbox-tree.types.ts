export type NestedOption = {
  value: string;
  label: string;
  children?: NestedOption[];
};

export type TreeNodeMeta = {
  value: string;
  parentValue: string | null;
};
