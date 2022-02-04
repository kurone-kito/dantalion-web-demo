import { createTitle } from './createTitle';

describe('createTitle', () => {
  it('should create the title', () => {
    expect(createTitle({ appName: 'app', pageName: 'page' })).toEqual(
      'page::app'
    );
    expect(createTitle({ appName: 'app' })).toEqual('app');
    expect(createTitle({ pageName: 'page' })).toEqual('page');
    expect(createTitle()).toEqual('');
  });
});
