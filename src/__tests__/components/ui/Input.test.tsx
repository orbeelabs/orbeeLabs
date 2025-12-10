import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/components/ui/input';

describe('Input Component', () => {
  it('deve renderizar o input corretamente', () => {
    render(<Input placeholder="Digite aqui" />);
    const input = screen.getByPlaceholderText('Digite aqui');
    
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe('INPUT');
  });

  it('deve aceitar e exibir valor', () => {
    render(<Input value="Texto de teste" onChange={() => {}} />);
    const input = screen.getByDisplayValue('Texto de teste');
    
    expect(input).toHaveValue('Texto de teste');
  });

  it('deve chamar onChange quando valor muda', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'teste');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('deve aceitar diferentes tipos de input', () => {
    const { rerender } = render(<Input type="text" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    
    rerender(<Input type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    
    rerender(<Input type="password" />);
    expect(screen.getByDisplayValue('')).toHaveAttribute('type', 'password');
  });

  it('deve estar desabilitado quando disabled é true', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    
    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:cursor-not-allowed');
  });

  it('deve aceitar placeholder', () => {
    render(<Input placeholder="Digite seu nome" />);
    const input = screen.getByPlaceholderText('Digite seu nome');
    
    expect(input).toBeInTheDocument();
  });

  it('deve aceitar className customizada', () => {
    render(<Input className="custom-input" />);
    const input = screen.getByRole('textbox');
    
    expect(input).toHaveClass('custom-input');
  });

  it('deve aceitar required', () => {
    render(<Input required />);
    const input = screen.getByRole('textbox');
    
    expect(input).toBeRequired();
  });

  it('deve aceitar maxLength', () => {
    render(<Input maxLength={10} />);
    const input = screen.getByRole('textbox');
    
    expect(input).toHaveAttribute('maxLength', '10');
  });
});

