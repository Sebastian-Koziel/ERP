

export const getObjectById = (array: any[], id: any) => {
    return array.find(item => item._id === id);
  }

