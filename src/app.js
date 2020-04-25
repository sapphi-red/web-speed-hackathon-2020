import { render } from './foundation/render';
import { setupMockAPIData } from './foundation/gateway';
import './foundation/styles';

function init() {
  if (process.env.USE_MOCK_DATA === 'true') {
    setupMockAPIData();
  }

  render();
}

// defer script
init();
