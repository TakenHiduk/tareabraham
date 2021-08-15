/**
 * Only contains alphanumeric characters(a-z0-9._), underscore(_) and dot(.).
 * Underscore and dot can't be next to each other (e.g user_.name).
 * Underscore or dot can't be used multiple times in a row (e.g user__name / user..name).
 * Number of characters must be between 5 to 30.
 *
 * REGEX: /^(?=.{5,30}$)(?!.*[_.]{2})[a-z0-9._]+$/
 *
 * ^(?=.{5,30}$)(?!.*[_.]{2})[a-z0-9._]+$
 *  └─────┬────┘└─────┬─────┘└────┬───┘
 *        │           │           │
 *        │           │           allowed characters
 *        │           │
 *        │           no __ or _. or ._ or .. inside
 *        │
 *        username is 5-30 characters long
 * */

export const UsernameRegex = new RegExp(
  /^(?=.{5,30}$)(?!.*[_.]{2})[a-z0-9._]+$/,
);
