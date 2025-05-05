const SIGNUP_USER_QUERY = `
  INSERT INTO USERS (
    name, surname, email, telephone, "password", country, address, city, postalcode, 
    specifications, latitude, longitude, termsaccepted, privacyaccepted, cookiesaccepted, marketingaccepted
  ) 
  VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, 
    $10, $11, $12, $13, $14, $15, $16
  ) 
  RETURNING id;
`

module.exports = { SIGNUP_USER_QUERY }