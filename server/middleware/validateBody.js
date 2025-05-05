module.exports = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false })

  if (error) {
    return res.status(400).json({
      message: 'Errore validazione',
      errors: error.details.map((d) => d.message),
    })
  }

  next()
}