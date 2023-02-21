import { ZodFormattedError } from 'zod';

const formatErrors = (errors: ZodFormattedError<Map<string, string>, string>) =>
  Object.entries(errors)
    .map(([_, value]) => {
      if (value && '_errors' in value) return value._errors.join(', ');
      return value;
    })
    .filter(Boolean);

export default formatErrors;
