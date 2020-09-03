//
// User schema
//
module.exports = {
  type: "object",
  properties: {
    _id: {
      type: "string",
      description: "MongoDB document id"
    },
    name: {
      type: "string"
    },
    email: {
      type: "string"
    },
    role: {
      type: "string",
      description: "User access level",
      enum: [
        "student",
        "admin"
      ]
    },
    created: {
      type: "string",
      format: "date-time"
    }
  }
}
