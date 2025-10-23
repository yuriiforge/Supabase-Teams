import axios from "axios";

/**
 * Handles errors from Axios requests or any unknown error types
 * and throws a proper Error with a meaningful message.
 */
export function handleRequestError(err: unknown): never {
    if (axios.isAxiosError(err)) {
        // Axios error with possible response JSON
        const message = err.response?.data?.error || err.message;
        throw new Error(message);
    }

    if (err instanceof Error) {
        // Native Error
        throw err;
    }

    // Unknown type
    throw new Error("An unknown error occurred");
}
