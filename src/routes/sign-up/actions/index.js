export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export function register(payload, next) {
  return {
    type:REGISTER,
    payload,
    next
  }
}
