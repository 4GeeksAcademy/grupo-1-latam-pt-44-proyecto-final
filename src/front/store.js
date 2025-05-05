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

    case "set_people_data":
      const dataPeople = action.payload;
      return { ...store, people: [...dataPeople] };

    case "add_to_favorite":
      const { uid, name, category, linkto } = action.payload;
      console.log("Leo ]]]]] add_to_favorite: category");
      console.log(action.payload);
      return {
        ...store,
        favorites: store.favorites.some(
          (item) => item.uid === uid && item.category === category
        )
          ? store.favorites
          : [
              ...store.favorites,
              { uid: uid, name: name, category: category, linkto: linkto },
            ],
      };

    case "delete_from_favorite":
      const { uid: deleteUid, category: deletecategory } = action.payload;
      return {
        ...store,
        favorites: store.favorites.filter(
          (item) =>
            !(item.uid === deleteUid && item.category === deletecategory)
        ),
      };

    default:
      throw Error("Unknown action.");
  }
}
