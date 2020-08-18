import { FirstMiddleware } from './first.middleware';

describe('FirstMiddleware', () => {
  it('should be defined', () => {
    expect(new FirstMiddleware()).toBeDefined();
  });
});
