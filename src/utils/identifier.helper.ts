import * as EmailValidator from 'email-validator';
import { IDRegex } from '../common/regex/id.regex';
import { UsernameRegex } from '../common/regex/username.regex';

export enum IdentifierType {
  ID,
  USERNAME,
  EMAIL,
}

const validateIdentifier = (identifier: string): IdentifierType | undefined => {
  const isID = IDRegex.test(identifier);
  if (isID) return IdentifierType.ID;

  const isUsername = UsernameRegex.test(identifier);
  if (isUsername) return IdentifierType.USERNAME;

  const isEmail = EmailValidator.validate(identifier);
  if (isEmail) return IdentifierType.EMAIL;

  return undefined;
};

export default validateIdentifier;
