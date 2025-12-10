import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('deve renderizar o texto do botão corretamente', () => {
    render(<Button>Clique Aqui</Button>);
    expect(screen.getByText('Clique Aqui')).toBeInTheDocument();
  });

  it('deve chamar onClick quando clicado', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(<Button onClick={handleClick}>Clique</Button>);
    
    const button = screen.getByText('Clique');
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('deve aplicar variante default por padrão', () => {
    render(<Button>Botão</Button>);
    const button = screen.getByText('Botão');
    
    expect(button).toHaveClass('bg-primary');
    expect(button).toHaveClass('text-primary-foreground');
  });

  it('deve aplicar variante secondary quando especificado', () => {
    render(<Button variant="secondary">Botão</Button>);
    const button = screen.getByText('Botão');
    
    expect(button).toHaveClass('bg-secondary');
    expect(button).toHaveClass('text-secondary-foreground');
  });

  it('deve aplicar variante outline quando especificado', () => {
    render(<Button variant="outline">Botão</Button>);
    const button = screen.getByText('Botão');
    
    expect(button).toHaveClass('border');
    expect(button).toHaveClass('bg-background');
  });

  it('deve aplicar variante ghost quando especificado', () => {
    render(<Button variant="ghost">Botão</Button>);
    const button = screen.getByText('Botão');
    
    expect(button).toHaveClass('hover:bg-accent');
  });

  it('deve aplicar tamanho sm quando especificado', () => {
    render(<Button size="sm">Botão</Button>);
    const button = screen.getByText('Botão');
    
    expect(button).toHaveClass('h-9');
    expect(button).toHaveClass('px-3');
  });

  it('deve aplicar tamanho lg quando especificado', () => {
    render(<Button size="lg">Botão</Button>);
    const button = screen.getByText('Botão');
    
    expect(button).toHaveClass('h-11');
    expect(button).toHaveClass('px-8');
  });

  it('deve estar desabilitado quando disabled é true', () => {
    render(<Button disabled>Botão</Button>);
    const button = screen.getByText('Botão');
    
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:pointer-events-none');
    expect(button).toHaveClass('disabled:opacity-50');
  });

  it('não deve chamar onClick quando disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(<Button disabled onClick={handleClick}>Botão</Button>);
    
    const button = screen.getByText('Botão');
    await user.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('deve aceitar className customizada', () => {
    render(<Button className="custom-class">Botão</Button>);
    const button = screen.getByText('Botão');
    
    expect(button).toHaveClass('custom-class');
  });

  it('deve renderizar como child quando asChild é true', () => {
    render(
      <Button asChild>
        <a href="/test">Link</a>
      </Button>
    );
    
    const link = screen.getByText('Link');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/test');
  });
});

