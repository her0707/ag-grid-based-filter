const options = {
  contains: "contains",
  notContains: "notContains",
  equals: "equals",
  "=": "equals",
  notEqual: "notEqual",
  "!=": "notEqual",
  startsWith: "startsWith",
  endsWith: "endsWith",
  blank: "blank",
  notBlank: "notBlank",
  ">": "greaterThan",
  ">=": "greaterThanOrEqual",
  "<": "lessThan",
  "<=": "lessThanOrEqual",
  is_true: "true",
  is_false: "false",
};

const optionsText = {
  contains: "contains",
  notContains: "does not contain",
  textEquals: "equals",
  equals: "=",
  textNotEqual: "not equal",
  notEqual: "!=",
  startsWith: "starts with",
  endsWith: "ends with",
  blank: "is blank",
  notBlank: "not blank",
  greaterThan: ">",
  greaterThanOrEqual: ">=",
  lessThan: "<",
  lessThanOrEqual: "<=",
  true: "is true",
  false: "is false",
};

const operators = [
  {
    value: "contains",
    text: "contains",
  },
  {
    value: "notContains",
    text: "does not contain",
  },
  {
    value: "equals",
    text: "equals",
  },
  {
    value: "notEqual",
    text: "not equal",
  },
  {
    value: "startsWith",
    text: "starts with",
  },
  {
    value: "endsWith",
    text: "ends with",
  },
  {
    value: "blank",
    text: "is blank",
  },
  {
    value: "notBlank",
    text: "not blank",
  },
  {
    value: "equals",
    text: "=",
  },
  {
    value: "notEqual",
    text: "!=",
  },
  {
    value: "greaterThan",
    text: ">",
  },
  {
    value: "greaterThanOrEqual",
    text: ">=",
  },
  {
    value: "lessThan",
    text: "<",
  },
  {
    value: "lessThanOrEqual",
    text: "<=",
  },
  {
    value: "true",
    text: "is true",
  },
  {
    value: "false",
    text: "is false",
  },
];

export const operator = {
  text: [
    {
      value: "contains",
      text: "contains",
    },
    {
      value: "notContains",
      text: "does not contain",
    },
    {
      value: "equals",
      text: "equals",
    },
    {
      value: "notEqual",
      text: "not equal",
    },
    {
      value: "startsWith",
      text: "starts with",
    },
    {
      value: "endsWith",
      text: "ends with",
    },
    {
      value: "blank",
      text: "is blank",
    },
    {
      value: "notBlank",
      text: "not blank",
    },
  ],
  number: [
    {
      value: "equals",
      text: "=",
    },
    {
      value: "notEqual",
      text: "!=",
    },
    {
      value: "greaterThan",
      text: ">",
    },
    {
      value: "greaterThanOrEqual",
      text: ">=",
    },
    {
      value: "lessThan",
      text: "<",
    },
    {
      value: "lessThanOrEqual",
      text: "<=",
    },
  ],
  boolean: [
    {
      value: "true",
      text: "is true",
    },
    {
      value: "false",
      text: "is false",
    },
  ],
  object: [
    {
      value: "contains",
      text: "contains",
    },
    {
      value: "notContains",
      text: "does not contain",
    },
    {
      value: "equals",
      text: "equals",
    },
  ],
  date: [
    {
      value: "equals",
      text: "=",
    },
    {
      value: "notEqual",
      text: "!=",
    },
    {
      value: "greaterThan",
      text: ">",
    },
    {
      value: "greaterThanOrEqual",
      text: ">=",
    },
    {
      value: "lessThan",
      text: "<",
    },
    {
      value: "lessThanOrEqual",
      text: "<=",
    },
  ],
  dateString: [
    {
      value: "equals",
      text: "=",
    },
    {
      value: "notEqual",
      text: "!=",
    },
    {
      value: "greaterThan",
      text: ">",
    },
    {
      value: "greaterThanOrEqual",
      text: ">=",
    },
    {
      value: "lessThan",
      text: "<",
    },
    {
      value: "lessThanOrEqual",
      text: "<=",
    },
  ],
};
