import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../../components/history-router/history-router';
import ReviewSuccessModal from './review-success-modal';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({});

describe('Component: ReviewSuccessModal', ()=> {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewSuccessModal
            onCloseBtnOrOverlayClick={jest.fn()}
            isReviewSuccessModalOpened
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Thank you for a review!')).toBeInTheDocument();
    expect(screen.getByText('Back to shopping')).toBeInTheDocument();
  });

  it('should close modal when user clicked "Back to shopping" button', async () => {
    const backToShoppingButtonClickHandle = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewSuccessModal
            onCloseBtnOrOverlayClick={backToShoppingButtonClickHandle}
            isReviewSuccessModalOpened
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Thank you for a review!')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Back to shopping'));

    expect(backToShoppingButtonClickHandle).toBeCalled();
  });
});
