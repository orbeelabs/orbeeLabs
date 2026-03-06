import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

interface OGImageOptions {
  title: string;
  subtitle: string;
  badge?: string;
}

export function generateOGImage({ title, subtitle, badge }: OGImageOptions) {
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
          {badge && (
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: '#f5a623',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                marginBottom: 20,
                padding: '6px 20px',
                border: '2px solid #f5a623',
                borderRadius: 30,
              }}
            >
              {badge}
            </div>
          )}
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: 16,
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#a0a0a0',
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            gap: 16,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              background: 'linear-gradient(90deg, #f5a623, #f7c948)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Orbee Labs
          </div>
          <div style={{ fontSize: 20, color: '#555' }}>|</div>
          <div style={{ fontSize: 18, color: '#a0a0a0' }}>orbeelabs.com</div>
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
