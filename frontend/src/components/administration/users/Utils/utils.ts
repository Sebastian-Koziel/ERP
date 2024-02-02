export const moveIdTo0Index = (id:string, array:string[]) => {
    const index = array.indexOf(id);
    if (index !== -1) {
      // If the main stage ID is found in the array, move it to the beginning.
      const mainStage = array.splice(index, 1)[0]; // Remove the main stage from its current position
      array.unshift(mainStage); // Add the main stage to the beginning
    }
    return array;
  }