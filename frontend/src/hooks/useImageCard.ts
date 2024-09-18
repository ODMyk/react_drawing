import {useCallback} from "react";

export const useImageCard = (refresh: () => void) => {
  const editTitle = useCallback(
    async (id: number) => {
      const title = prompt("Enter new title:");
      try {
        await fetch(`http://localhost:3001/images/${id}`, {
          method: "PATCH",
          body: JSON.stringify({title}),
          headers: {"Content-Type": "application/json"},
        });
        refresh();
      } catch (error) {
        console.error(JSON.stringify(error, null, 2));
      }
    },
    [refresh],
  );

  const deleteImage = useCallback(
    async (id: number) => {
      try {
        await fetch(`http://localhost:3001/images/${id}`, {
          method: "DELETE",
        });
        refresh();
      } catch (error) {
        console.error(JSON.stringify(error, null, 2));
      }
    },
    [refresh],
  );

  return {
    editTitle,
    deleteImage,
  };
};
