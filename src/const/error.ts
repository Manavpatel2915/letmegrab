
export const ERROR = {
    MESSAGE: {
        UNAUTHORIZED : "Unauthorized",
        ALL_FIELDS_REQUIRED : "All fields required",
        FORBIDDEN : "Forbidden",
        NOT_FOUND : "Not Found",
        invalid:(args: string) => `${args} invalid`,
        notFound: (args: string) => `${args} Not Found`,
        conflict: (args: string) => `${args} already exists`,
    },
    STATUSCODE: {
        UNAUTHORIZED: 401,
        ALL_FIELDS_REQUIRED: 422,
        FORBIDDEN: 403,
        SERVER_ERROR: 500,
        NOT_FOUND: 404,
        CONFLICT: 409,
    },
}