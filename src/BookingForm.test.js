import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BookingForm from "./BookingForm";
import * as api from './api';

let mockAvailableTimes;
let mockFormData;
let mockSetFormData;
let mockDispatch;
let tomorrow;

const getFutureDate = (daysAhead = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split('T')[0];
};

beforeEach(() => {
    tomorrow = getFutureDate(1);
    mockAvailableTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
    mockFormData = {
        date: tomorrow,
        time: '21:00',
        guests: 2,
        occasion: 'Birthday',
    };
    mockSetFormData = jest.fn();
    mockDispatch = jest.fn();
    localStorage.clear();
});

afterEach(() => {
    jest.restoreAllMocks();
});

test('Renders the BookingForm heading', () => {
    render(
        <MemoryRouter>
            <BookingForm
                availableTimes={mockAvailableTimes}
                formData={mockFormData}
                dispatch={mockDispatch}
            />
        </MemoryRouter>
    );
    const headingElement = screen.getByText("Book Now");
    expect(headingElement).toBeInTheDocument();
});

test('Form can be submitted by the user', () => {

    // Set up mock fetch response
    jest.spyOn(api, 'fetchAPI').mockReturnValue(['18:00', '19:30']);

    render(
        <MemoryRouter>
            <BookingForm
                formData={mockFormData}
                setFormData={mockSetFormData}
                availableTimes={['17:00', '18:00']}
                dispatch={mockDispatch}
            />
        </MemoryRouter>
    );

    // Fill in the form fields
    const newdate = getFutureDate(5);
    fireEvent.change(screen.getByLabelText(/date/i), {
        target: { value: newdate },
    });

    fireEvent.change(screen.getByLabelText(/time/i), {
        target: { value: '18:00' },
    });

    fireEvent.change(screen.getByLabelText(/number of guests/i), {
        target: { value: 4 },
    });

    fireEvent.change(screen.getByLabelText(/occasion/i), {
        target: { value: 'Anniversary' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /submit reservation form/i }));

    expect(mockDispatch).toHaveBeenCalledWith({
        type: 'update_times',
        times: ['18:00', '19:30']
    });

    // Assert that formData was updated through setFormData
    expect(mockSetFormData).toHaveBeenCalled(); // crude check
});

test('submits the correct formData', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    jest.spyOn(api, 'submitAPI').mockReturnValue(true);

    render(
        <MemoryRouter>
            <BookingForm
                formData={mockFormData}
                setFormData={mockSetFormData}
                availableTimes={['17:00', '18:00']}
                dispatch={mockDispatch}
            />
        </MemoryRouter>
    );

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /submit reservation form/i });
    fireEvent.click(submitButton);

    expect(logSpy).toHaveBeenCalledWith('✅ Reservation submitted!', mockFormData);
    expect(api.submitAPI).toHaveBeenCalledWith(mockFormData);
});

test('Writes and reads to local storage correctly', () => {
    render(
        <MemoryRouter>
            <BookingForm
                formData={mockFormData}
                setFormData={mockSetFormData}
                availableTimes={['17:00', '18:00']}
                dispatch={mockDispatch}
            />
        </MemoryRouter>
    );

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /submit reservation form/i });
    fireEvent.click(submitButton);

    const saved = JSON.parse(localStorage.getItem('bookings'));
    expect(saved).toContainEqual(mockFormData);
});

test('Error message appears if date in past chosen', () => {

    render(
        <MemoryRouter>
            <BookingForm
                formData={mockFormData}
                setFormData={mockSetFormData}
                availableTimes={['17:00', '18:00']}
                dispatch={mockDispatch}
            />
        </MemoryRouter>
    );

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/date/i), {
        target: { value: '2022-04-01' },
    });

    const errorElement = screen.getByText("Please select today or a future date.");
    expect(errorElement).toBeInTheDocument();
});

test('Error message appears if date in past chosen', () => {

    render(
        <MemoryRouter>
            <BookingForm
                formData={mockFormData}
                setFormData={mockSetFormData}
                availableTimes={['17:00', '18:00']}
                dispatch={mockDispatch}
            />
        </MemoryRouter>
    );

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/date/i), {
        target: { value: '2022-04-01' },
    });

    const errorElement = screen.getByText("Please select today or a future date.");
    expect(errorElement).toBeInTheDocument();
});

test('Error message appears if no time is chosen', () => {

    render(
        <MemoryRouter>
            <BookingForm
                formData={mockFormData}
                setFormData={mockSetFormData}
                availableTimes={['17:00', '18:00']}
                dispatch={mockDispatch}
            />
        </MemoryRouter>
    );

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/time/i), {
        target: { value: '' },
    });

    const errorElement = screen.getByText("Please select a time for your booking.");
    expect(errorElement).toBeInTheDocument();
});

test('Error message appears if <1 guests selected', () => {

    render(
        <MemoryRouter>
            <BookingForm
                formData={mockFormData}
                setFormData={mockSetFormData}
                availableTimes={['17:00', '18:00']}
                dispatch={mockDispatch}
            />
        </MemoryRouter>
    );

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/guests/i), {
        target: { value: '0' },
    });

    const errorElement = screen.getByText("Choose a table for 1-10 guests only.");
    expect(errorElement).toBeInTheDocument();
});

test('Error message appears if >10 guests selected', () => {

    render(
        <MemoryRouter>
            <BookingForm
                formData={mockFormData}
                setFormData={mockSetFormData}
                availableTimes={['17:00', '18:00']}
                dispatch={mockDispatch}
            />
        </MemoryRouter>
    );

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/guests/i), {
        target: { value: '11' },
    });

    const errorElement = screen.getByText("Choose a table for 1-10 guests only.");
    expect(errorElement).toBeInTheDocument();
});