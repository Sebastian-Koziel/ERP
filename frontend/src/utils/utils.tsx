

export const getObjectById = (array: any[], id: any) => {
    return array.find(item => item._id === id);
  }

export const generateTimestampId = () => {
    
  const timestamp = Date.now();
  const randomPart = Math.floor(Math.random() * 10000); 
  const uniqueId = `${timestamp}${randomPart.toString().padStart(4, '0')}`;
  
    return uniqueId;
  }
  
  
  