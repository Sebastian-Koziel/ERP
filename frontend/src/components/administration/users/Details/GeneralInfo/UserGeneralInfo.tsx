import { User } from "../../Interfaces/user.interface";
import {
  Container,
  Input,
  Button,
  Spacer, 
  Stack,
  Select,
  FormLabel
} from "@chakra-ui/react";
import { roles } from "../../Utils/roles";
import { useState } from "react";
import { useInput } from "../../../../../hooks/form/use-input";
import { useSelect } from "../../../../../hooks/form/use-select";
import { Form } from "react-router-dom";

function UserGeneralInfo(props:any) {
  
  const [user, setUser] = useState<User>(props.user)

  //handle inputs
  const {
    value: enteredName, 
    isValid: enteredNameIsValid,
    hasError: nameInputHasError, 
    valueChangeHandler: nameChangedHandler, 
    inputBlurHandler: nameBlurHandler,
    cancelEdit: nameCancelEdit,
    message: errorMessage
  } = useInput([{name: 'required'}], user.name);

  const {
    value: enteredRole, 
    isValid: enteredRoleIsValid,
    hasError: roleInputHasError, 
    valueChangeHandler: roleChangedHandler, 
    inputBlurHandler: roleBlurHandler,
    cancelEdit: roleCancelEdit,
    generateOptions: roleGenerateOptions,
    message: roleErrorMessage
  } = useSelect(roles,[], user.role);

  const {
    value: enteredLogin, 
    isValid: enteredLoginIsValid,
    hasError: LoginInputHasError, 
    valueChangeHandler: loginChangedHandler, 
    inputBlurHandler: loginBlurHandler,
    cancelEdit: loginCancelEdit,
    message: loginErrorMessage
  } = useInput([{name: 'required'}], user.login);

  const {
    value: enteredSurname, 
    isValid: enteredSurnameIsValid,
    hasError: surnameInputHasError, 
    valueChangeHandler: surnameChangedHandler, 
    inputBlurHandler: surnameBlurHandler,
    cancelEdit: surnameCancelEdit,
    message: surnameErrorMessage
  } = useInput([{name: 'required'}], user.surname);

  //form validation
  let formIsValid = false;

  if (enteredNameIsValid && enteredRoleIsValid && enteredSurnameIsValid && enteredLoginIsValid) {
    formIsValid = true;
  }

  //edit handle
  const [editing, setEditing] = useState(false);
  const editButtonHandler = () =>{
    if(editing){
      nameCancelEdit();
      roleCancelEdit();
      surnameCancelEdit();
      loginCancelEdit();
    }
    setEditing(!editing);
  }

  return (
    <>
    <Form method="post">
          <FormLabel>Login</FormLabel>
          <Input
            id="login"
            type="text"
            name="login"
            onChange={loginChangedHandler}
            onBlur={loginBlurHandler}
            value={enteredLogin}
            readOnly={!editing}
          />
          {LoginInputHasError && (
            <span>{loginErrorMessage}</span>
          )}
          
          <FormLabel>Name</FormLabel>
          <Input
            id="name"
            type="text"
            name="name"
            onChange={nameChangedHandler}
            onBlur={nameBlurHandler}
            value={enteredName}
            readOnly={!editing}
          />
          {nameInputHasError && (
            <span>{errorMessage}</span>
          )}
          <FormLabel>Surname</FormLabel>
          <Input
            id="surname"
            type="text"
            name="surname"
            onChange={surnameChangedHandler}
            onBlur={surnameBlurHandler}
            value={user.surname}
            readOnly={!editing}
          />
          {surnameInputHasError && (
            <span>{surnameErrorMessage}</span>
          )}
          <FormLabel>Role</FormLabel>
          <Select 
            id="role"
            name="role" 
            value={enteredRole}
            disabled={!editing}
            onChange={roleChangedHandler}
            onBlur={roleBlurHandler}
            >
          {roleGenerateOptions()} 
            
          </Select>
        </Form>
        <button onClick={editButtonHandler}>{!editing? 'Edit' : 'cancel' }</button>
            {editing && (<button disabled={!formIsValid} onClick={()=>console.log(`nice`)}>save</button>)}
        </>
  );
}

export default UserGeneralInfo;



