export interface IUpdateField {
  label: string;
  required: boolean;
  options: [string];
  logicJump?: {
    condition: string;
    value: string;
    goToField: string;
  };
}

export interface IUpdateForm {
  title: string;
  description: string;
  fields: IUpdateField[];
}
