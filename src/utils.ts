export class LzResponse<T> {
  success: boolean;
  message: string;
  data: T;
  constructor(option = { success: true, message: '操作成功', data: null }) {
    const { success, message, data = null } = option;
    this.data = data;
    this.success = success;
    this.message = message;
  }
}
