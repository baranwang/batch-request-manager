type RequestFunction<T1, R> = (args: T1) => Promise<R>;
type MergeArgsFunction<T1, T2> = (requests: T2[]) => T1;

interface RequestParams<T> {
  args: T;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}
export class BatchRequestManager<T1, T2 = T1, R = any> {
  private requests: RequestParams<T2>[] = [];

  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly requestFunction: RequestFunction<T1, R>,
    private readonly mergeArgsFunction: MergeArgsFunction<T1, T2>,
    private readonly waitTime: number = 100,
  ) {}

  request(args: T2): Promise<R> {
    return new Promise((resolve, reject) => {
      this.requests.push({ args, resolve, reject });

      if (!this.timer) {
        this.timer = setTimeout(async () => {
          this.timer = null;

          const requests = [...this.requests];
          this.requests = [];

          try {
            const mergedArgs = this.mergeArgsFunction(
              requests.map(request => request.args),
            );
            const result = await this.requestFunction(mergedArgs);
            requests.forEach(({ resolve }) => resolve(result));
          } catch (error) {
            requests.forEach(({ reject }) => reject(error));
          }
        }, this.waitTime);
      }
    });
  }
}
