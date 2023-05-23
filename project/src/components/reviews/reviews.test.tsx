import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import Reviews from './reviews';
import userEvent from '@testing-library/user-event';
import { reviewsList } from '../../mockForTests';

const history = createMemoryHistory();

describe('Component: Reviews', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Reviews
          reviews={reviewsList}
          openSendReviewModal={jest.fn()}
        />
      </HistoryRouter>
    );

    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('Leave a review')).toBeInTheDocument();
    expect(screen.getByText('Show more reviews')).toBeInTheDocument();
  });

  it('should hide the button when "Show more reviews" will be click (reviews amount in array is equal four)', async () => {
    render(
      <HistoryRouter history={history}>
        <Reviews
          reviews={reviewsList}
          openSendReviewModal={jest.fn()}
        />
      </HistoryRouter>
    );

    await userEvent.click(screen.getByText('Show more reviews'));

    expect(screen.queryByText('Show more reviews')).not.toBeInTheDocument();
  });

  it('openModal should called when user clicked "Leave a review" button', async () => {
    const sendReviewButtonClick = jest.fn();
    render(
      <HistoryRouter history={history}>
        <Reviews
          reviews={reviewsList}
          openSendReviewModal={sendReviewButtonClick}
        />
      </HistoryRouter>
    );

    await userEvent.click(screen.getByText('Leave a review'));

    expect(sendReviewButtonClick).toBeCalled();
  });
});
