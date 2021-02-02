import crypto from "crypto";
import random from "random";

const SALT_LENGTH = 20
const HASH_ITERATION_RANGE = [1000, 100000]
const HASH_ALGORITHM = 'md5'

/**
 * Generate salt, amount of iterations and a hash (using the salt and iterations) for the provided text
 * @param password the text to hash
 */
export function generateHash(password: string) {
    const salt = crypto.randomBytes(SALT_LENGTH).toString('hex')
    const iterations = random.int(HASH_ITERATION_RANGE[0], HASH_ITERATION_RANGE[1])

    return {input: password, hash: hash(password, salt, iterations), salt, iterations}
}

/**
 * Hash the provided text + salt n times
 * @param text the text to hash
 * @param salt the salt to add
 * @param iterations the amount of times to hash
 */
export function hash(text: string, salt: string, iterations: number) {
    let hashedString = salt + text
    for (let i = 0; i < iterations; i++) {
        hashedString = crypto.createHash(HASH_ALGORITHM).update(hashedString).digest('hex');
    }
    return hashedString
}