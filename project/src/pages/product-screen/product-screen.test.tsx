import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import ProductScreen from './product-screen';
import { camerasList, reviewsList, cameraData, mockOrderData } from '../../mockForTests';
import thunk from 'redux-thunk';

window.scrollTo = jest.fn();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const store = mockStore({
  DATA: {
    similarCamerasList: camerasList,
    reviews: reviewsList,
    camera: cameraData,
    searchedCameras: camerasList,
    orderData: mockOrderData,
  },
});

describe('Page: ProductScreen', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Add to the cart/i)).toBeInTheDocument();
    expect(screen.getByText(/Characteristics/i)).toBeInTheDocument();
    expect(screen.getByText(/Description/i)).toBeInTheDocument();
  });
});
