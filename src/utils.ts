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

/**
 *
 * @param timeStr1 时间戳
 * @param timeStr2 时间戳
 */
export function isSameDay(timeStr1: string, timeStr2: string) {
  const dateA = new Date(Number(timeStr1));
  const dateB = new Date(Number(timeStr2));

  const ymdA =
    dateA.getFullYear().toString() +
    dateA.getMonth().toString() +
    dateA.getDay().toString();
  const ymdB =
    dateB.getFullYear().toString() +
    dateB.getMonth().toString() +
    dateB.getDay().toString();

  // console.log(isSameDay, timeStr1, timeStr2, ymdA, ymdB);

  return ymdA === ymdB;
}
