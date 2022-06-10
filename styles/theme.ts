export const color = {
  white: '#fff',
  tint: '#ff3c78',
  text: '#000',
};

export const mixins = {
  // flex
  flexBox: (direction = 'row', align = 'center', justify = 'center') => `
    flex-direction: ${direction};
    align-items: ${align};
    justify-content: ${justify};
  `,
};
