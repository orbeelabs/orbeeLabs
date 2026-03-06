import { ImageResponse } from 'next/og';


export const alt = 'Orbee Labs — Marketing Digital e Desenvolvimento Web em BH';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              background: 'linear-gradient(90deg, #f5a623, #f7c948)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: 20,
            }}
          >
            Orbee Labs
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#ffffff',
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            Marketing Digital e Desenvolvimento Web em BH
          </div>
          <div
            style={{
              fontSize: 22,
              color: '#a0a0a0',
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            Metodologia SEO-VX | Sites construidos para o Google desde o codigo | Resultados 3x mais rapidos
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            gap: 40,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ color: '#a0a0a0', fontSize: 18 }}>98+ Lighthouse</span>
          </div>
          <div
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ color: '#a0a0a0', fontSize: 18 }}>Core Web Vitals</span>
          </div>
          <div
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f5a623' }} />
            <span style={{ color: '#a0a0a0', fontSize: 18 }}>orbeelabs.com</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
