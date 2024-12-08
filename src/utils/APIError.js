class APIError extends Error {
    constructor(message, status = 500, errors = [], stack = "") {
        super(message);
        this.status = status;
        this.data = null;
        this.message = message;
        this.errors = errors;
        this.success = false;

        if (stack.length > 0) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor.construct)
        }

    }
}

export { APIError };
