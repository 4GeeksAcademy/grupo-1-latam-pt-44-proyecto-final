export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      },
    ],
    people: [],
    favorites: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "add_task":
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };

    case "set_favorites":
      const { datafavorites } = action.payload;
      console.log(datafavorites);
      return { ...store, favorites: [...datafavorites] };

    case "add_to_favorite":
      const { historia_id, nombre_historia } = action.payload;

      return {
        ...store,
        favorites: store.favorites.some(
          (item) => item.historia_id === historia_id
        )
          ? store.favorites
          : [
              ...store.favorites,
              { historia_id: historia_id, nombre_historia: nombre_historia },
            ],
      };

    case "delete_from_favorite":
      const { historia_id: deleteHistoriaId } = action.payload;
      return {
        ...store,
        favorites: store.favorites.filter(
          (item) => item.historia_id != deleteHistoriaId
        ),
      };

    default:
      throw Error("Unknown action.");
  }
}
