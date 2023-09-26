import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  client: Yup.string()
    .required('Client name is required')
    .min(3, 'Client name must be at least 3 characters'),
  issue: Yup.string()
    .required('Issue is required')
    .min(6, 'Issue must be at least 6 characters'),
});
