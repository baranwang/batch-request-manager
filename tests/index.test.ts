import { BatchRequestManager } from '@/index';

describe('cases', () => {
  let requestFunction: jest.Mock;
  let mergeFunction: jest.Mock;
  let brm: BatchRequestManager<string, string>;

  beforeEach(() => {
    requestFunction = jest.fn().mockResolvedValue('response');
    mergeFunction = jest
      .fn()
      .mockImplementation((requests: string[]) => requests);
    brm = new BatchRequestManager(requestFunction, mergeFunction);
  });

  test('should be defined', () => {
    expect(brm).toBeInstanceOf(BatchRequestManager);
  });

  test('should call request function', async () => {
    await Promise.all([
      brm.request('test1'),
      brm.request('test2'),
      brm.request('test3'),
    ]);
    expect(requestFunction).toHaveBeenCalledWith(['test1', 'test2', 'test3']);
    expect(requestFunction).toHaveBeenCalledTimes(1);
  });

  test('should call merge function', async () => {
    await Promise.all([
      brm.request('test1'),
      brm.request('test2'),
      brm.request('test3'),
    ]);
    expect(mergeFunction).toHaveBeenCalledWith(['test1', 'test2', 'test3']);
  });
});
