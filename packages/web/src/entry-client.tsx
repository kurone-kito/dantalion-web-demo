// @refresh reload
import { mount, StartClient } from '@solidjs/start/client';

const mountPoint = document.getElementById('app');

if (!mountPoint) {
  throw new Error('The app mount point was not found.');
}

export default mount(() => <StartClient />, mountPoint);
