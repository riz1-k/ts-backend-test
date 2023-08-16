import ErrorSchema, {
  type ErrorLogType,
} from '../../models/common/Error.schema';

export async function errorLogger(error: ErrorLogType) {
  try {
    const errorLog = new ErrorSchema(error);
    await errorLog.save();
  } catch (error) {
    console.log(error);
  }
}
