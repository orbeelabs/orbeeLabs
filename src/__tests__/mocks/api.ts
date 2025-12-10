// Mock global do fetch para testes
export const mockFetch = (response: unknown, ok: boolean = true) => {
  return jest.fn(() =>
    Promise.resolve({
      ok,
      json: () => Promise.resolve(response),
      status: ok ? 200 : 400,
      statusText: ok ? 'OK' : 'Bad Request',
    } as Response)
  );
};

// Mock de resposta de sucesso
export const mockSuccessResponse = {
  success: true,
  message: 'Mensagem enviada com sucesso',
};

// Mock de resposta de erro
export const mockErrorResponse = {
  success: false,
  error: 'Erro ao enviar mensagem',
};

// Helper para resetar mocks
export const resetFetchMock = () => {
  global.fetch = jest.fn();
};

