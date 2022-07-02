import {
  FieldError,
  Form,
  FormError,
  Label,
  Submit,
  TextAreaField,
  TextField,
  useForm,
} from '@redwoodjs/forms';
import { MetaTags, useMutation } from '@redwoodjs/web';
import { toast, Toaster } from '@redwoodjs/web/toast';

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`;

const ContactPage = () => {
  const formMethods = useForm({ mode: 'onBlur' });
  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for your submission!');
      formMethods.reset();
    },
  });

  const onSubmit = (data) => {
    console.log(data);

    create({
      variables: {
        input: data,
      },
    });
  };

  return (
    <>
      <MetaTags
        title="Contact"
        description="Contact page"
      />

      <Toaster />

      <h1>ContactPage</h1>

      <Form
        onSubmit={onSubmit}
        config={{ mode: 'onBlur' }}
        error={error}
        formMethods={formMethods}
      >
        <FormError
          error={error}
          wrapperClassName="form-error"
        />
        <Label
          name="name"
          errorClassName="error"
        >
          Name:
        </Label>
        <TextField
          name="name"
          errorClassName="error"
          validation={{ required: true }}
        />
        <FieldError
          name="name"
          className="error"
        />

        <Label
          name="name"
          errorClassName="error"
        >
          Email:
        </Label>
        <TextField
          name="email"
          errorClassName="error"
          validation={{ required: true }}
        />
        <FieldError
          name="email"
          className="error"
        />

        <Label
          name="name"
          errorClassName="error"
        >
          Message:
        </Label>
        <TextAreaField
          name="message"
          errorClassName="error"
          validation={{ required: true }}
        />
        <FieldError
          name="message"
          className="error"
        />

        <Submit disabled={loading}>Save</Submit>
      </Form>
    </>
  );
};

export default ContactPage;
