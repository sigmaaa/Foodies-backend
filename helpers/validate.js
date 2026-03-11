import HttpError from './HttpError.js';

export function validate(schema, body) {
    const { value, error } = schema.validate(body);
    if (error) {
        throw HttpError(400, error.details.map((err) => err.message).join(' ; '));
    }
}
