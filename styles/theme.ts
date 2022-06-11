export const color = {
  white: '#fff',
  primary: '#ff3c78',
  ghost: 'transparent',
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
