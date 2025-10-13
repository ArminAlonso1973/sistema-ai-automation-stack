// tests/components/ConversationList.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ConversationList } from '../../src/components/ConversationList'

// Mock useAPI hook
vi.mock('../../src/hooks/useAPI', () => ({
  useAPI: vi.fn()
}))

describe('ConversationList Component', () => {
  const mockUseAPI = vi.fn()
  
  beforeEach(async () => {
    const { useAPI } = await import('../../src/hooks/useAPI')
    useAPI.mockImplementation(() => mockUseAPI())
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Loading State', () => {
    it('debe mostrar skeleton cuando está cargando', () => {
      mockUseAPI.mockReturnValue({
        data: null,
        loading: true,
        error: null,
        refetch: vi.fn()
      })

      render(<ConversationList />)

      // Should show loading skeletons
      const skeletonElements = document.querySelectorAll('.animate-pulse')
      expect(skeletonElements.length).toBeGreaterThan(0)
    })
  })

  describe('Error State', () => {
    it('debe mostrar error y botón de reintentar', () => {
      const mockRefetch = vi.fn()
      mockUseAPI.mockReturnValue({
        data: null,
        loading: false,
        error: 'Network error',
        refetch: mockRefetch
      })

      render(<ConversationList />)

      expect(screen.getByText('Error al cargar conversaciones')).toBeInTheDocument()
      expect(screen.getByText('Network error')).toBeInTheDocument()
      
      const retryButton = screen.getByText('Reintentar')
      fireEvent.click(retryButton)
      
      expect(mockRefetch).toHaveBeenCalledTimes(1)
    })
  })

  describe('Empty State', () => {
    it('debe mostrar mensaje cuando no hay conversaciones', () => {
      mockUseAPI.mockReturnValue({
        data: { conversations: [], pagination: { totalPages: 1 } },
        loading: false,
        error: null,
        refetch: vi.fn()
      })

      render(<ConversationList />)

      expect(screen.getByText('No hay conversaciones')).toBeInTheDocument()
      expect(screen.getByText('Cuando lleguen mensajes de WhatsApp, aparecerán aquí.')).toBeInTheDocument()
    })
  })

  describe('Conversations Display', () => {
    const mockConversations = [
      {
        id: '1',
        phone_number: '+1234567890',
        last_message: 'Hola, necesito información',
        created_at: '2024-01-15T10:30:00Z',
        status: 'active',
        messages_count: 5,
        ai_classification: 'interested'
      },
      {
        id: '2',
        phone_number: '+0987654321',
        last_message: 'Gracias por la información',
        created_at: '2024-01-14T15:45:00Z',
        status: 'pending',
        messages_count: 2,
        ai_classification: 'warm'
      }
    ]

    it('debe mostrar lista de conversaciones', () => {
      mockUseAPI.mockReturnValue({
        data: { 
          conversations: mockConversations,
          pagination: { totalPages: 1 }
        },
        loading: false,
        error: null,
        refetch: vi.fn()
      })

      render(<ConversationList />)

      expect(screen.getByText('Conversaciones Recientes')).toBeInTheDocument()
      expect(screen.getByText('+1234567890')).toBeInTheDocument()
      expect(screen.getByText('Hola, necesito información')).toBeInTheDocument()
      expect(screen.getByText('+0987654321')).toBeInTheDocument()
      expect(screen.getByText('Gracias por la información')).toBeInTheDocument()
    })

    it('debe permitir expandir conversaciones para ver detalles', async () => {
      mockUseAPI.mockReturnValue({
        data: { 
          conversations: mockConversations,
          pagination: { totalPages: 1 }
        },
        loading: false,
        error: null,
        refetch: vi.fn()
      })

      render(<ConversationList />)

      // Find expand button for first conversation
      const expandButtons = screen.getAllByRole('button')
      const expandButton = expandButtons.find(btn => 
        btn.querySelector('svg') && btn.getAttribute('class')?.includes('text-gray-400')
      )
      
      expect(expandButton).toBeInTheDocument()
      fireEvent.click(expandButton)

      await waitFor(() => {
        expect(screen.getByText('ID:')).toBeInTheDocument()
        expect(screen.getByText('1')).toBeInTheDocument()
        expect(screen.getByText('Mensajes:')).toBeInTheDocument()
        expect(screen.getByText('5')).toBeInTheDocument()
      })
    })

    it('debe mostrar estado de conversaciones con colores correctos', () => {
      mockUseAPI.mockReturnValue({
        data: { 
          conversations: mockConversations,
          pagination: { totalPages: 1 }
        },
        loading: false,
        error: null,
        refetch: vi.fn()
      })

      render(<ConversationList />)

      const activeStatus = screen.getByText('active')
      const pendingStatus = screen.getByText('pending')
      
      expect(activeStatus).toHaveClass('bg-green-100', 'text-green-800')
      expect(pendingStatus).toHaveClass('bg-yellow-100', 'text-yellow-800')
    })
  })

  describe('Pagination', () => {
    it('debe mostrar paginación cuando hay múltiples páginas', () => {
      const mockConversations = [
        {
          id: '1',
          phone_number: '+1234567890',
          last_message: 'Test message',
          created_at: '2024-01-15T10:30:00Z',
          status: 'active'
        }
      ]

      mockUseAPI.mockReturnValue({
        data: { 
          conversations: mockConversations,
          pagination: { totalPages: 3 }
        },
        loading: false,
        error: null,
        refetch: vi.fn()
      })

      render(<ConversationList showPagination={true} />)

      expect(screen.getByText(/Página/)).toBeInTheDocument()
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('no debe mostrar paginación cuando showPagination es false', () => {
      mockUseAPI.mockReturnValue({
        data: { 
          conversations: [],
          pagination: { totalPages: 3 }
        },
        loading: false,
        error: null,
        refetch: vi.fn()
      })

      render(<ConversationList showPagination={false} />)

      expect(screen.queryByText('Página')).not.toBeInTheDocument()
    })
  })

  describe('Refresh Functionality', () => {
    it('debe permitir actualizar conversaciones', () => {
      const mockRefetch = vi.fn()
      const mockConversations = [
        {
          id: '1',
          phone_number: '+1234567890',
          last_message: 'Test message',
          created_at: '2024-01-15T10:30:00Z',
          status: 'active'
        }
      ]

      mockUseAPI.mockReturnValue({
        data: { 
          conversations: mockConversations,
          pagination: { totalPages: 1 }
        },
        loading: false,
        error: null,
        refetch: mockRefetch
      })

      render(<ConversationList />)

      const refreshButton = screen.getByText('Actualizar')
      fireEvent.click(refreshButton)
      
      expect(mockRefetch).toHaveBeenCalledTimes(1)
    })

    it('debe deshabilitar botón de actualizar cuando está loading', () => {
      const mockConversations = [
        {
          id: '1',
          phone_number: '+1234567890',
          last_message: 'Test message',
          created_at: '2024-01-15T10:30:00Z',
          status: 'active'
        }
      ]

      mockUseAPI.mockReturnValue({
        data: { 
          conversations: mockConversations,
          pagination: { totalPages: 1 }
        },
        loading: true,
        error: null,
        refetch: vi.fn()
      })

      render(<ConversationList />)

      const refreshButton = screen.getByText('Actualizando...')
      expect(refreshButton).toBeDisabled()
    })
  })

  describe('Date Formatting', () => {
    it('debe formatear fechas correctamente', () => {
      const recentDate = new Date()
      recentDate.setMinutes(recentDate.getMinutes() - 30)
      
      const mockConversation = [{
        id: '1',
        phone_number: '+1234567890',
        last_message: 'Test message',
        created_at: recentDate.toISOString(),
        status: 'active'
      }]

      mockUseAPI.mockReturnValue({
        data: { 
          conversations: mockConversation,
          pagination: { totalPages: 1 }
        },
        loading: false,
        error: null,
        refetch: vi.fn()
      })

      render(<ConversationList />)

      // Should show relative time (like "30m")
      expect(screen.getByText(/\d+m/)).toBeInTheDocument()
    })
  })
})