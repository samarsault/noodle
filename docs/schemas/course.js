//
// Course Schema
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
    subtitle: {
      type: "string"
    },
    coverImage: {
      type: "string",
      description: "URL to cover image",
    },
    isArchived: {
      type: "boolean",
      description: "Whether course has been archived"
    },
    created: {
      type: "string",
      format: "date-time"
    },
    instructors: {
      type: "array",
      items: {
        $ref: "#/components/schemas/user"
      }
    }
  }
}
