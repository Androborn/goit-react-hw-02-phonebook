import { Component } from "react";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";

import { handleInputChange } from "../../utils";
import {
  ContactAddForm,
  NameLabel,
  NameInput,
  NumberLabel,
  NamberInput,
  SubmitBtn,
} from "./ContactForm.styled";

export class ContactForm extends Component {
  state = { name: "", number: "" };

  #nameInputId = nanoid();
  #numberInputId = nanoid();

  handleSubmitInputChange = handleInputChange.bind(this);

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, number } = this.state;
    this.props.onSubmit(name, number);

    this.resetForm();
  };

  resetForm = () =>
    this.setState({
      name: "",
      number: "",
    });

  render() {
    const { name, number } = this.state;

    return (
      <ContactAddForm onSubmit={this.handleSubmit}>
        <NameLabel htmlFor={this.#nameInputId}>Name</NameLabel>
        <NameInput
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={this.handleSubmitInputChange}
          id={this.#nameInputId}
        />
        <NumberLabel htmlFor={this.#numberInputId}>Number</NumberLabel>
        <NamberInput
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={this.handleSubmitInputChange}
          id={this.#numberInputId}
        />
        <SubmitBtn type={"submit"}>Add contact</SubmitBtn>
      </ContactAddForm>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
