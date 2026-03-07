export const initialState = {
  seasonIndex: null,
};

export function reducer(state, action) {
  const { type, value } = action;

  switch (type) {
    case 'setSeason':
      return { ...state, seasonIndex: value };
    default:
      throw new Error();
  }
}
