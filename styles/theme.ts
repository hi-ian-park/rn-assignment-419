export const color = {};

export const mixins = {
  // flex
  flexBox: (direction = 'row', align = 'center', justify = 'center') => `
    flex-direction: ${direction};
    align-items: ${align};
    justify-content: ${justify};
  `,
};
