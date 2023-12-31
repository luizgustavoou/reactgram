class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}

function test() {
    throw new ValidationError("Whoops!");
}

try {
    test();
} catch (err) {
    if (err instanceof ValidationError) {
        console.log("Capturado!");
    }
}
