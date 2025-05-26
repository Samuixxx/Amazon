const CREATE_PRODUCT = 'INSERT INTO products (name, vendor, description, specifications, price, quantity, subcategory_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *'
const ADD_IMAGE_TO_PRODUCT = 'INSERT INTO product_images (product_id, image_url) VALUES ($1, $2)'
const ADD_3DMODEL_TO_PRODUCT = 'INSERT INTO product_models (product_id, model_url) VALUES ($1, $2)'
const GET_SPECIAL_OFFERS_PRODUCTS = `
  SELECT 
      p.id AS product_id,
      p.name,
      so.discount_percent as discount,
      so.end_date,
      (
          SELECT pr.model_url 
          FROM public.product_models pr 
          WHERE pr.product_id = p.id AND pr.model_url IS NOT NULL 
          LIMIT 1
      ) AS model_path,
      (
          CASE 
              WHEN EXISTS (
                  SELECT 1 
                  FROM public.product_models pr 
                  WHERE pr.product_id = p.id AND pr.model_url IS NOT NULL
              )
              THEN NULL
              ELSE (
                  SELECT pi.image_url 
                  FROM public.product_images pi 
                  WHERE pi.product_id = p.id AND pi.image_url IS NOT NULL 
                  LIMIT 1
              )
          END
      ) AS image_path
  FROM special_offers so
  JOIN products p ON so.product_id = p.id
  ORDER BY RANDOM()
  LIMIT $1;
`
const GET_RANDOM_PRODUCTS = `
  SELECT 
      p.id AS product_id,
      p.name,
      p.vendor,
      p.price,
      (
          SELECT pr.model_url 
          FROM public.product_models pr 
          WHERE pr.product_id = p.id AND pr.model_url IS NOT NULL 
          LIMIT 1
      ) AS model_path,
      (
          CASE 
              WHEN EXISTS (
                  SELECT 1 
                  FROM public.product_models pr 
                  WHERE pr.product_id = p.id AND pr.model_url IS NOT NULL
              )
              THEN NULL
              ELSE (
                  SELECT pi.image_url 
                  FROM public.product_images pi 
                  WHERE pi.product_id = p.id AND pi.image_url IS NOT NULL 
                  LIMIT 1
              )
          END
      ) AS image_path
  FROM products p
  ORDER BY RANDOM()
  LIMIT $1;
`
const GET_PRODUCTS_BY_CATEGORY = `
  SELECT 
      p.id AS product_id,
      p.name,
      p.vendor,
      p.price,
      (
          SELECT pr.model_url 
          FROM public.product_models pr 
          WHERE pr.product_id = p.id AND pr.model_url IS NOT NULL 
          LIMIT 1
      ) AS model_path,
      (
          CASE 
              WHEN EXISTS (
                  SELECT 1 
                  FROM public.product_models pr 
                  WHERE pr.product_id = p.id AND pr.model_url IS NOT NULL
              )
              THEN NULL
              ELSE (
                  SELECT pi.image_url 
                  FROM public.product_images pi 
                  WHERE pi.product_id = p.id AND pi.image_url IS NOT NULL 
                  LIMIT 1
              )
          END
      ) AS image_path,
      COALESCE(AVG(r.rating), 0) AS average_rating,
      COUNT(r.id) AS review_count
  FROM products p
  LEFT JOIN subcategories s ON p.subcategory_id = s.id
  LEFT JOIN categories c ON s.category_id = c.id
  LEFT JOIN reviews r ON r.product_id = p.id
  WHERE c.name = $1
  GROUP BY p.id, p.name, p.vendor, p.price
  ORDER BY RANDOM()
  LIMIT $2;
`
const GET_PRODUCT_SPECIFIC_INFO = `
   SELECT 
    p.id AS product_id,
    p.name,
    p.vendor,
    p.price,
    p.quantity,
    p.description,
    p.specifications,
    s.name AS subcategory_name,
    (
        SELECT pr.model_url 
        FROM public.product_models pr 
        WHERE pr.product_id = p.id AND pr.model_url IS NOT NULL 
        LIMIT 1
    ) AS model_path,
    (
        SELECT json_agg(pi.image_url)
        FROM public.product_images pi
        WHERE pi.product_id = p.id AND pi.image_url IS NOT NULL
    ) AS image_paths,
    (
        SELECT json_build_object(
            'average', COALESCE(AVG(r.rating), 0),
            'count', COUNT(r.id),
            'items', (
                SELECT json_agg(
                    json_build_object(
                        'rating', r2.rating,
                        'text', r2.text,
                        'reviser', u.name || ' ' || u.surname,
                        'timestamp', r2.timestamp
                    )
                )
                FROM public.reviews r2
                JOIN public.users u ON u.id = r2.user_id
                WHERE r2.product_id = p.id
            )
        )
        FROM public.reviews r
        WHERE r.product_id = p.id
    ) AS reviews,
    (
        SELECT json_build_object(
            'active', true,
            'end_date', so.end_date,
            'discount_percent', so.discount_percent
        )
        FROM public.special_offers so
        WHERE so.product_id = p.id
        LIMIT 1
    ) AS special_offer
FROM public.products p
LEFT JOIN public.subcategories s ON p.subcategory_id = s.id
WHERE p.id = $1;
`
const GET_PRODUCT_PREVIEW = `
    SELECT 
    p.id AS product_id,
    p.name,
    p.vendor,
    p.price,

    -- Mostra un solo model_url se esiste
    (
        SELECT pr.model_url 
        FROM public.product_models pr 
        WHERE pr.product_id = p.id AND pr.model_url IS NOT NULL 
        LIMIT 1
    ) AS model_path,

    -- Mostra una sola image_url solo se NON esiste un model_url
    (
        CASE 
            WHEN EXISTS (
                SELECT 1 
                FROM public.product_models pr 
                WHERE pr.product_id = p.id AND pr.model_url IS NOT NULL
            )
            THEN NULL
            ELSE (
                SELECT pi.image_url 
                FROM public.product_images pi 
                WHERE pi.product_id = p.id AND pi.image_url IS NOT NULL 
                LIMIT 1
            )
        END
    ) AS image_path

FROM public.products p

-- Subcategory
LEFT JOIN public.subcategories s ON p.subcategory_id = s.id
WHERE p.id = $1
;`


module.exports = { CREATE_PRODUCT, ADD_IMAGE_TO_PRODUCT, ADD_3DMODEL_TO_PRODUCT, GET_SPECIAL_OFFERS_PRODUCTS, GET_RANDOM_PRODUCTS, GET_PRODUCTS_BY_CATEGORY, GET_PRODUCT_SPECIFIC_INFO, GET_PRODUCT_PREVIEW }