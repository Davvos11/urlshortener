import {getModelForClass, index, prop, Ref, ReturnModelType} from "@typegoose/typegoose";
import {User} from "./user.js";

@index({path: 1}, {unique: true})
export class URL {
    @prop({required: true})
    public path?: string

    @prop({required: true})
    public value?: string

    @prop({required: true})
    public creator?: Ref<User>

    public static async get(this: ReturnModelType<typeof URL>, path: string) {
        return this.find({path}).exec()
    }

    public static async add(this: ReturnModelType<typeof User>,
                            path: string, value: string, creator: User) {
        return this.create({path, value, creator} as URL)
    }
}

export const URLModel = getModelForClass(URL)
