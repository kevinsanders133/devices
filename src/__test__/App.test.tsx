import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, screen, waitFor } from '@testing-library/react'
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from '../utils/test-utils'
import List from '../Components/List';
import dataHTTP from './dataHTTP.json';
import dataWS from './dataWS.json';
import App from '../App'

const DEVICES_URL = `${process.env.REACT_APP_HTTP_HOST}${process.env.REACT_APP_DEVICES_API}`;
const WS_URL = `${process.env.REACT_APP_WS_HOST}${process.env.REACT_APP_WS_API}`;

export const handlers = [
    rest.get(DEVICES_URL, (_req, res, ctx) => {
        return res(ctx.json(dataHTTP), ctx.delay(150))
    }),
    rest.get(WS_URL, (_req, res, ctx) => {
        return res(ctx.json(dataWS), ctx.delay(150))
    })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

test('fetches devices and shows them', async () => {
    renderWithProviders(<List />)

    expect(await screen.findByText(/bulb1/i)).toBeInTheDocument()
    expect(await screen.findByText(/outlet1/i)).toBeInTheDocument()
})

test('after click on item, dialog with correct data shows up', async () => {
    renderWithProviders(<App />)

    expect(await screen.findByText(/bulb1/i)).toBeInTheDocument()

    fireEvent.click(screen.getByText(/bulb1/i))
    expect(await screen.findByTestId('dialog')).toBeInTheDocument()
    expect(await screen.findByTestId('dialog')).toHaveTextContent(/bulb1/i)
})

test('after click on another item, dialog should update its content', async () => {
    renderWithProviders(<App />)

    expect(await screen.findByText(/bulb1/i)).toBeInTheDocument()

    fireEvent.click(screen.getByText(/bulb1/i))
    expect(await screen.findByTestId('dialog')).toBeInTheDocument()
    
    fireEvent.click(screen.getByText(/outlet1/i))
    expect(await screen.findByTestId('dialog')).toBeInTheDocument()
    expect(await screen.findByTestId('dialog')).toHaveTextContent(/outlet1/i)
})

test('after click close button, dialog should disappear', async () => {
    renderWithProviders(<App />)

    expect(await screen.findByText(/bulb1/i)).toBeInTheDocument()

    fireEvent.click(screen.getByText(/bulb1/i))
    await waitFor(() => {
        expect(screen.getByTestId('dialog')).toBeInTheDocument()
    })
    
    fireEvent.click(screen.getByTestId('close-button'))
    await waitFor(() => {
        expect(screen.queryByTestId('dialog')).not.toBeInTheDocument()
    })
})