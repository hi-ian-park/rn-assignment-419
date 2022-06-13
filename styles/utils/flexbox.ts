function convertFullName(value: string): string {
  switch (value) {
    case 'start':
      return 'flex-start';
    case 'end':
      return 'flex-end';
    case 'between':
      return 'space-between';
    case 'around':
      return 'space-around';
    default:
      return value;
  }
}

export const flexBox = (
  direction = 'row',
  align = 'center',
  justify = 'center'
) => `
flex-direction: ${direction};
align-items: ${convertFullName(align)};
justify-content: ${convertFullName(justify)};
`;
