import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

describe('Card Component', () => {
  it('deve renderizar o Card corretamente', () => {
    render(
      <Card>
        <div>Conteúdo do Card</div>
      </Card>
    );
    
    expect(screen.getByText('Conteúdo do Card')).toBeInTheDocument();
  });

  it('deve aplicar classes CSS corretas', () => {
    render(<Card data-testid="card">Conteúdo</Card>);
    const card = screen.getByTestId('card');
    
    expect(card).toHaveClass('rounded-lg');
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('bg-card');
    expect(card).toHaveClass('text-card-foreground');
    expect(card).toHaveClass('shadow-sm');
  });

  it('deve aceitar className customizada', () => {
    render(<Card className="custom-card" data-testid="card">Conteúdo</Card>);
    const card = screen.getByTestId('card');
    
    expect(card).toHaveClass('custom-card');
  });

  it('deve renderizar CardHeader corretamente', () => {
    render(
      <Card>
        <CardHeader data-testid="header">Header</CardHeader>
      </Card>
    );
    
    const header = screen.getByTestId('header');
    expect(header).toHaveClass('flex');
    expect(header).toHaveClass('flex-col');
    expect(header).toHaveClass('space-y-1.5');
    expect(header).toHaveClass('p-6');
  });

  it('deve renderizar CardTitle corretamente', () => {
    render(
      <Card>
        <CardTitle>Título do Card</CardTitle>
      </Card>
    );
    
    const title = screen.getByText('Título do Card');
    expect(title.tagName).toBe('H3');
    expect(title).toHaveClass('text-2xl');
    expect(title).toHaveClass('font-semibold');
  });

  it('deve renderizar CardDescription corretamente', () => {
    render(
      <Card>
        <CardDescription>Descrição do Card</CardDescription>
      </Card>
    );
    
    const description = screen.getByText('Descrição do Card');
    expect(description.tagName).toBe('P');
    expect(description).toHaveClass('text-sm');
    expect(description).toHaveClass('text-muted-foreground');
  });

  it('deve renderizar CardContent corretamente', () => {
    render(
      <Card>
        <CardContent data-testid="content">Conteúdo</CardContent>
      </Card>
    );
    
    const content = screen.getByTestId('content');
    expect(content).toHaveClass('p-6');
    expect(content).toHaveClass('pt-0');
  });

  it('deve renderizar CardFooter corretamente', () => {
    render(
      <Card>
        <CardFooter data-testid="footer">Footer</CardFooter>
      </Card>
    );
    
    const footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('flex');
    expect(footer).toHaveClass('items-center');
    expect(footer).toHaveClass('p-6');
    expect(footer).toHaveClass('pt-0');
  });

  it('deve renderizar Card completo com todas as partes', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Título</CardTitle>
          <CardDescription>Descrição</CardDescription>
        </CardHeader>
        <CardContent>Conteúdo principal</CardContent>
        <CardFooter>Rodapé</CardFooter>
      </Card>
    );
    
    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByText('Descrição')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo principal')).toBeInTheDocument();
    expect(screen.getByText('Rodapé')).toBeInTheDocument();
  });
});

