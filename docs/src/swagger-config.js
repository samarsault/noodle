const schemas = require('../schemas')

module.exports = {
  openapi: "3.0.0",
  info: {
    "version": "0.1",
    "title": "Noodle API",
    "description": "API spec for Noodle LMS"
  },
  servers: [
    {
      url: "/",
      description: "Local Server"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },
    schemas
  },
  security: [
    {
      bearerAuth: []
    }
  ],
  tags: [
    {
      name: "user",
      description: "User related endpoints"
    },
    {
      name: "courses",
      description: "Course operations"
    }
  ],
  paths: {
    "/public/courses": {
      get: {
        tags: [
          "courses"
        ],
        summary: "Get list of available courses",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/courses"
                }
              }
            }    
          }
        }
      }
    },
    "/api/user": {
      get: {
        tags: [
          "user"
        ],
        summary: "Get information about the currently logged in user",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/user"
                }
              }
            }
          },
          401: {
            description: "Unauthorized"
          }
        }
      }
    },
    "/auth/login": {
      post: {
        tags: [ "user" ],
        summary: "Login user & obtain bearer token",
        requestBody: {
          description: "Pet to add to the store",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string"
                  },
                  password: {
                    type: "string"
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "OK"
          }
        }
      }
    }
  }
}
