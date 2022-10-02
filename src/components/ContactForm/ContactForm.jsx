import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import { handleInputChange } from '../../utils';
import {
  ContactAddForm,
  NameLabel,
  NameInput,
  NumberLabel,
  NamberInput,
  SubmitBtn,
} from './ContactForm.styled';

export class ContactForm extends Component {
  constructor() {
    super();
    this.handleSubmitInputChange = handleInputChange.bind(this);
  }

  state = { name: '', number: '' };

  _nameInputId = nanoid();
  _numberInputId = nanoid();

  handleSubmit = e => {
    e.preventDefault();

    const { state, props, resetForm } = this;
    const { name, number } = state;

    props.onSubmit(name, number);
    resetForm();
  };

  resetForm = () =>
    this.setState({
      name: '',
      number: '',
    });

  render() {
    const {
      state,
      _nameInputId,
      _numberInputId,
      handleSubmit,
      handleSubmitInputChange,
    } = this;
    const { name, number } = state;

    return (
      <ContactAddForm onSubmit={handleSubmit}>
        <NameLabel htmlFor={_nameInputId}>Name</NameLabel>
        <NameInput
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleSubmitInputChange}
          id={_nameInputId}
        />
        <NumberLabel htmlFor={_numberInputId}>Number</NumberLabel>
        <NamberInput
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleSubmitInputChange}
          id={_numberInputId}
        />
        <SubmitBtn type={'submit'}>Add contact</SubmitBtn>
      </ContactAddForm>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
