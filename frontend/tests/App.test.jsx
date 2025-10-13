import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App.jsx';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
vi.stubGlobal('localStorage', localStorageMock);

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('debe renderizar pantalla de login cuando no está autenticado', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Sistema AI Automation')).toBeInTheDocument();
    expect(screen.getByText('Ingresa tu ID de cliente para acceder')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Acceder' })).toBeInTheDocument();
  });

  it('debe mostrar dashboard cuando está autenticado', () => {
    localStorageMock.getItem.mockReturnValue('test_client');

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Buscar elementos que sí existen en el dashboard
    expect(screen.getByText(/Sistema AI Automation Stack/)).toBeInTheDocument();
  });

  it('debe manejar rutas correctamente', () => {
    localStorageMock.getItem.mockReturnValue('test_client');

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Sistema AI Automation Stack/)).toBeInTheDocument();
  });
});
