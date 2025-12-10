/**
 * Testes para componente Slider
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Slider } from '@/components/ui/slider';

describe('Slider', () => {
  it('deve renderizar slider corretamente', () => {
    const { container } = render(
      <Slider defaultValue={[50]} max={100} step={1} />
    );

    const slider = container.querySelector('[role="slider"]');
    expect(slider).toBeInTheDocument();
  });

  it('deve aceitar valores padrão', () => {
    const { container } = render(
      <Slider defaultValue={[25, 75]} max={100} />
    );

    const slider = container.querySelector('[role="slider"]');
    expect(slider).toBeInTheDocument();
  });
});

