import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import Slider from './slider';
import { camerasList } from '../../mockForTests';

const history = createMemoryHistory();

describe('Component: Icons', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Slider
          similarCameras={camerasList}
          onBuyButtonClick={jest.fn()}
          basketProductsIdentifiers={[]}
        />
      </HistoryRouter>
    );

    expect(screen.getByText('Similar items')).toBeInTheDocument();
    expect(screen.getByTestId('slider-controls--prev')).toHaveAttribute('disabled');
    expect(screen.getByTestId('slider-controls--next')).not.toHaveAttribute('disabled');
  });
});
