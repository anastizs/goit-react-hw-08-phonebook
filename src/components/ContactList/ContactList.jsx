import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  selectIsLoading,
  selectError,
  selectVisibleContacts,
} from "redux/selectors";
import { fetchContacts, deleteContact } from "redux/operations";
import ContactItem from "components/ContactItem/ContactItem";
import { List, Error } from "./ContactList.styled";
import { Loader } from "components/Loader/Loader";

export const ContactList = () => {
  const contacts = useSelector(selectVisibleContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {" "}
      {isLoading && <Loader />}
      {error && <Error>{error}</Error>}
      <List>
        {contacts.map(({ id, name, number }) => (
          <ContactItem
            key={id}
            name={name}
            number={number}
            onDelete={() => {
              dispatch(deleteContact(id));
            }}
          />
        ))}
      </List>
    </>
  );
};
