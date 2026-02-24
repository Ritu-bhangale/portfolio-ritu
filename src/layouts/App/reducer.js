export const initialState = {
  theme: 'dark',
  seasonIndex: null,
};

export function reducer(state, action) {
  const { type, value } = action;

  switch (type) {
    case 'setTheme':
      return { ...state, theme: value };
    case 'toggleTheme': {
      const newThemeId = state.theme === 'dark' ? 'light' : 'dark';
      return { ...state, theme: newThemeId };
    }
    case 'setSeason':
      return { ...state, seasonIndex: value };
    default:
      throw new Error();
  }
}
