import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BookingForm from "./BookingForm";
import * as api from './api';

const mockAvailableTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
const mockFormData = {
    date: '2025-04-15',
    time: '17:00',
    guests: 2,
    occasion: 'Birthday',
};

const mockSetFormData = jest.fn();
const mockDispatch = jest.fn();

test('Renders the BookingForm heading', () => {
    render(
        <MemoryRouter>
            <BookingForm
                availableTimes={mockAvailableTimes}
                formData={mockFormData}
                dispatch={mockDispatch}
            />
        </MemoryRouter>);
    const headingElement = screen.getByText("Book Now");
    expect(headingElement).toBeInTheDocument();
})

test('Form can be submitted by the user', () => {

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
    fireEvent.change(screen.getByLabelText(/date/i), {
        target: { value: '2025-04-19' },
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

    jest.restoreAllMocks();
});

test('submits the correct formData', () => {
    const mockFormData = {
        date: '2025-04-20',
        time: '18:00',
        guests: 4,
        occasion: 'Anniversary',
    };

    const mockSetFormData = jest.fn();
    const mockDispatch = jest.fn();

    //Spy on the form submit functions and console log
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

    jest.restoreAllMocks();
});

test('Writes and reads to local storage correctly', () => {
    const mockFormData = {
        date: '2025-04-20',
        time: '17:00',
        guests: 4,
        occasion: 'Anniversary',
    };

    const mockSetFormData = jest.fn();
    const mockDispatch = jest.fn();

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

    jest.restoreAllMocks();
});