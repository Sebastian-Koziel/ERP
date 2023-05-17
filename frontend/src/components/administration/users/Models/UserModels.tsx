export interface User {
  _id: string;
  //name: string,
  //surname: string,
  login: string;
  password: string;
  name: string;
  surname: string;
  access: {
    role: string;
    users: {
      general: true;
    };
    stages: {
      general: true;
    };
  };
}
