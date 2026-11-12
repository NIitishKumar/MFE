import { ImageResponse } from 'next/og';

export const alt =
  'Madhav Furniture — Luxury Solid Wood & Modern Furniture India';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#241E1A',
          backgroundImage:
            'radial-gradient(circle at top right, #3E3127 0%, #241E1A 60%, #171310 100%)',
          color: '#FDFBF7',
          padding: '64px 72px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontSize: 20,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#C5A059',
              fontWeight: 600,
            }}
          >
            MADHAV FURNITURE • OFFICIAL STORE & SHOWROOM
          </span>
          <span
            style={{
              fontSize: 18,
              color: '#BFB3A4',
            }}
          >
            Sikandrabad (UP) • Pan-India Delivery
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: '940px',
          }}
        >
          <div
            style={{
              fontSize: 66,
              lineHeight: 1.08,
              fontWeight: 600,
              color: '#FDFBF7',
            }}
          >
            Madhav Furniture — Solid Wood, Designer Beds & Luxury Living.
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.4,
              color: '#DDD3C5',
            }}
          >
            Designer double beds, wall matching sets, L-shape sofas, travertine
            dining tables, and bespoke craftsmanship in Sikandrabad & across India.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #443831',
            paddingTop: '24px',
            fontSize: 20,
            color: '#C5A059',
          }}
        >
          <span>10–15 Year Structural Warranty</span>
          <span>White-Glove Pan-India Delivery</span>
          <span>+91 75 0093 1934</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}

