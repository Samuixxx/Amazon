const INIT_PROFILE = 'SELECT id, name, surname, email FROM USERS WHERE id = $1'

const SIGNUP_USER_QUERY = `
  INSERT INTO USERS (
    name, surname, email, telephone, "password", country, address, city, postalcode, 
    specifications, latitude, longitude, termsaccepted, privacyaccepted, cookiesaccepted, marketingaccepted,
    google_id, facebook_id, microsoft_id, is_completed
  ) 
  VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, 
    $10, $11, $12, $13, $14, $15, $16,
    $17, $18, $19, $20
  ) 
  RETURNING id, name as "userDisplayName", email as "userEmail", country as "userCountry", cookiesaccepted;
`

const SESSION_DESERIALIZE_USER_QUERY = `SELECT * FROM USERS WHERE id = $1`

const SIGNIN_USER_QUERY = `SELECT id, password, name, email, country, cookiesaccepted FROM USERS WHERE email = $1`

const FIND_USER_BY_GOOGLEID = 'SELECT id FROM USERS WHERE google_id = $1'
const FIND_USER_BY_TELEPHONE = 'SELECT id FROM USERS WHERE telephone = $1'
const FIND_USER_BY_EMAIL = 'SELECT id FROM USERS WHERE email = $1'

module.exports = { INIT_PROFILE, SIGNUP_USER_QUERY, SESSION_DESERIALIZE_USER_QUERY, SIGNIN_USER_QUERY, FIND_USER_BY_GOOGLEID, FIND_USER_BY_TELEPHONE, FIND_USER_BY_EMAIL }