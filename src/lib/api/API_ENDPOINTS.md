# API integration (from api.json)

## Auth (admin login)
| Method | Path | Description |
|--------|------|--------------|
| POST | `/auth/login-account` | Login with email/password; returns `access_token`, `refresh_token` |
| POST | `/auth/refresh-token` | Refresh access token |

## Admin
| Method | Path | Description |
|--------|------|--------------|
| GET | `/admin/stats` | Dashboard statistics |
| GET | `/admin/users` | List users (query: `limit`, `offset`) |
| GET | `/admin/users/{id}` | Get user by ID |
| PATCH | `/admin/users/{id}/status` | Activate/deactivate user (body: `id`, `is_active`) |

## Amenities
| Method | Path | Description |
|--------|------|--------------|
| GET | `/amenities/amenities-list` | List (query: `page_id`, `page_size`) |
| GET | `/amenities/get-amenities/{id}` | Get one |
| POST | `/amenities/create` | Create (body: `amenity`) |
| PATCH | `/amenities/update/{id}` | Update (body: `id`, `amenities`) |
| DELETE | `/amenities/delete/{id}` | Delete |

## Category
| Method | Path | Description |
|--------|------|--------------|
| GET | `/category/category-list` | List (query: `page_id`, `page_size`) |
| GET | `/category/get-category/{id}` | Get one |
| POST | `/category/create` | Create (body: `category`) |
| PATCH | `/category/update/{id}` | Update (body: `id`, `category`) |
| DELETE | `/category/delete/{id}` | Delete |

## Property
| Method | Path | Description |
|--------|------|--------------|
| GET | `/property/property-list` | List (query: `page_size`, `page_id`, `search`, `min_price`, `max_price`, `category`, `amenity`) |
| GET | `/property/property-owner-list` | Owner list (query: `page_size`, `page_id`, `status`) |
| GET | `/property/get-property/{id}` | Get one |
| PUT | `/property/update/{id}` | Update |
| DELETE | `/property/delete/{id}` | Delete |

## Security
- **BearerAuth**: header `Authorization: Bearer <access_token>`
- **ApiKeyAuth**: header `api-access-key`

Responses use `SuccessResponse`: `{ data, message?, status }`. Errors use `ErrorResponse`: `{ code, message, status }`.
