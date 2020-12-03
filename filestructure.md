# File structure
- Mapping files from the root directory
#
```
app-backend
├── node_modules
├── src
│   ├── controllers
│   │   ├── pagination
│   │   │   ├── pagination.controller.ts
│   │   ├── user
│   │   │   ├── address.controller.ts
│   │   │   ├── anamnesis.controller.ts
│   │   │   ├── exercise.controller.ts
│   │   │   ├── measures.controller.ts
│   │   │   ├── payment.controller.ts
│   │   │   ├── photo.controller.ts
│   │   │   └── user.controller.ts
│   │   ├── auth.controller.ts
│   │   ├── evaluation.controller.ts
│   │   └── promotion.controller.ts
│   ├── middlewares
│   │   ├── http.status.ts
│   │   ├── profile.photo.ts
│   │   ├── response.ts
│   │   └── token.validation.ts
│   ├── models
│   │   ├── user
│   │   │   ├── address.model.ts
│   │   │   ├── anamnesis.model.ts
│   │   │   ├── exercise.model.ts
│   │   │   ├── measures.model.ts
│   │   │   ├── payment.model.ts
│   │   │   ├── photo.model.ts
│   │   │   └── user.model.ts
│   │   ├── validators
│   │   │   ├── address.validator.ts
│   │   │   ├── anamnesis.validator.ts
│   │   │   ├── evaluation.validator.ts
│   │   │   ├── exercise.validator.ts
│   │   │   ├── measures.validator.ts
│   │   │   ├── payment.validator.ts
│   │   │   ├── promotion.validator.ts
│   │   │   └── user.validator.ts
│   │   ├── evaluation.model.ts
│   │   └── promotions.model.ts
│   ├── routes
│   │   ├── auth.routes.ts
│   │   ├── evaluation.routes.ts
│   │   ├── promotion.routes.ts
│   │   ├── routes.ts
│   │   └── user.routes.ts
│   ├── app.ts
│   ├── database.ts
│   ├── index.ts
│   └── swagger.json
├── uploads
├── .env
├── .env.example
├── .gitignore
├── filestructure.md
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
└── types.d.ts
```
#