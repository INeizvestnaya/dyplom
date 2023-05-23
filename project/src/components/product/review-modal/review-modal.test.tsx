import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../../components/history-router/history-router';
import ReviewModal from './review-modal';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({DATA: {isPostSentSuccessful: true}});

describe('Component: ReviewModal', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewModal
            onCloseBtnOrOverlayClick={jest.fn()}
            cameraId={'1'}
            isReviewModalOpened
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Leave review')).toBeInTheDocument();
    expect(screen.getByText('Ваше имя')).toBeInTheDocument();
    expect(screen.getByLabelText(/Pros/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Comment/i)).toBeInTheDocument();
    expect(screen.getByText('Finish review')).toHaveClass('form-review__btn');
  });

  it('should get an error when input "Your name" is filled, input "Pros" is empty and clicked submit button', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewModal
            onCloseBtnOrOverlayClick={jest.fn()}
            cameraId={'1'}
            isReviewModalOpened
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Leave review')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('input-user-name'), 'Name');
    await userEvent.click(screen.getByText('Finish review'));

    expect(screen.getByTestId('div-user-name')).not.toHaveClass('is-invalid');
    expect(screen.getByTestId('div-user-plus')).toHaveClass('is-invalid');
  });
});
