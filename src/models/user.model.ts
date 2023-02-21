import {
  Model,
  PassportLocalDocument,
  PassportLocalModel,
  PassportLocalSchema,
  Types,
  Schema,
  model,
} from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

import sessionSchema, { ISession } from './common/sessionSchema';

export interface IUser extends PassportLocalDocument {
  _id: Types.ObjectId;
  email: string;
  sessions: Types.DocumentArray<ISession>;
}

interface IUserModel extends PassportLocalModel<IUser> {
  isEmailExists: (email: string) => Promise<boolean>;
}

const userSchema: PassportLocalSchema<
  IUserModel,
  Model<IUser>
> = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    sessions: [sessionSchema],
  },
  { timestamps: true }
);

userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

userSchema.statics.isEmailExists = async function (email: string) {
  const user = await this.findOne({ email });
  return !!user;
};

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true,
  session: false,
});

export default model<IUser, IUserModel>('User', userSchema);
