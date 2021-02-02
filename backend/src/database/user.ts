import {prop, getModelForClass, ReturnModelType, DocumentType, index} from '@typegoose/typegoose';
import {generateHash, hash} from "./hash.js";

@index({ username: 1 }, { unique: true })
export class User {
    @prop({required: true})
    public username?: string;

    @prop({required: true})
    public password?: string;

    @prop({required: true})
    public hashIterations: number = 1;

    @prop({required: true})
    public salt: string = "";

    public static async findByName(this: ReturnModelType<typeof User>, name: string) {
        return this.find({username: name}).exec()
    }

    public static async createUser(this: ReturnModelType<typeof User>, name: string, password: string) {
        // Generate hash, salt and number of iterations
        const {hash: hashedPassword, salt, iterations} = generateHash(password)
        // Create and return object
        return await this.create({username: name, password: hashedPassword, hashIterations: iterations, salt} as User)
    }

    public checkPassword(this: DocumentType<User>, password: string) {
        // Hash provided password with stored salt and iteration number
        const hashedInput = hash(password, this.salt, this.hashIterations)
        // Check if it is the same as the stored password
        return hashedInput === this.password
    }
}

export const UserModel = getModelForClass(User); // UserModel is a regular Mongoose Model with correct types