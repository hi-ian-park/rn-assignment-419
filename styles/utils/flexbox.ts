export const flexBox = (
  direction = 'row',
  align = 'center',
  justify = 'center'
) => `
flex-direction: ${direction};
align-items: ${align};
justify-content: ${justify};
`;
