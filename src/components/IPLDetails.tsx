/**
 * Custom IPL (Intense Pulsed Light) details page
 *
 * This is a special page designed to be the definitive "is IPL a laser" resource.
 * It has a custom structure different from other technology term pages.
 */

import Link from 'next/link';
import type { TechnologyTermEntry } from '@/lib/equipment';
import { getTermBadgeType } from '@/lib/equipment';
import { ClassificationBadge } from './ClassificationBadge';
import { Disclaimer } from './Disclaimer';
import { Footer } from './Footer';

interface IPLDetailsProps {
  term: TechnologyTermEntry;
}

/** Branded IPL technologies with links */
const brandedIPL = [
  { name: 'BBL (BroadBand Light)', slug: 'bbl', description: "Sciton's premium IPL system" },
  { name: 'AFT (Advanced Fluorescence Technology)', slug: 'aft', description: "Alma's enhanced IPL" },
  { name: 'E-Light', slug: 'e-light', description: 'IPL combined with radiofrequency energy' },
  { name: 'OPT (Optimal Pulse Technology)', slug: 'opt', description: 'A pulse delivery method used in IPL machines' },
  { name: 'DPL (Dynamic Pulse Light)', slug: 'dpl', description: 'Another marketing name for IPL' },
];

/**
 * Custom IPL detail page layout
 */
export function IPLDetails({ term }: IPLDetailsProps) {
  const { name, whatItIs, askYourClinic } = term;

  return (
    <main
      style={{
        backgroundColor: '#FAF9F7',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <article className="mx-auto max-w-2xl px-4 py-8 md:py-12" style={{ position: 'relative', zIndex: 1 }}>
        {/* Back to search link */}
        <nav style={{ marginBottom: '2.5rem' }}>
          <Link
            href="/is-it-a-real-laser"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-[#5E8B7E]"
            style={{ color: '#5A5550' }}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span style={{ letterSpacing: '0.02em' }}>Back to Search</span>
          </Link>
        </nav>

        {/* Classification Badge - prominent, centered */}
        <div className="flex justify-center" style={{ marginBottom: '1.5rem' }}>
          <ClassificationBadge badgeType={getTermBadgeType(term)} />
        </div>

        {/* Term Name */}
        <header className="text-center" style={{ marginBottom: '1.25rem' }}>
          <h1
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: '#2D2D2D',
              lineHeight: 1.1,
            }}
          >
            {name}
          </h1>
        </header>

        {/* Disclaimer - subtle inline notice */}
        <div className="flex justify-center" style={{ marginBottom: '1.5rem' }}>
          <Disclaimer />
        </div>

        {/* Table of Contents */}
        <nav
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.25rem 0.5rem',
            marginBottom: '2.5rem',
            fontSize: '0.875rem',
          }}
        >
          <a href="#quick-answer" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">Quick Answer</a>
          <span style={{ color: '#E8E4DF', padding: '0.5rem 0' }}>·</span>
          <a href="#how-ipl-differs" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">IPL vs Laser</a>
          <span style={{ color: '#E8E4DF', padding: '0.5rem 0' }}>·</span>
          <a href="#why-it-matters" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">Why It Matters</a>
          <span style={{ color: '#E8E4DF', padding: '0.5rem 0' }}>·</span>
          <a href="#branded-ipl" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">Branded IPL</a>
          <span style={{ color: '#E8E4DF', padding: '0.5rem 0' }}>·</span>
          <a href="#is-ipl-worth-it" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">Is IPL Worth It?</a>
          <span style={{ color: '#E8E4DF', padding: '0.5rem 0' }}>·</span>
          <a href="#user-experiences" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">User Experiences</a>
          <span style={{ color: '#E8E4DF', padding: '0.5rem 0' }}>·</span>
          <a href="#what-to-ask" style={{ color: '#5E8B7E', textDecoration: 'none', padding: '0.5rem 0.25rem' }} className="hover:underline">What to Ask</a>
        </nav>

        {/* Quick Answer */}
        <section
          id="quick-answer"
          className="rounded-xl"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E8E4DF',
            padding: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <h2
            style={{
              color: '#5E8B7E',
              fontSize: '0.7rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1rem',
            }}
          >
            Quick Answer
          </h2>
          <p className="leading-relaxed" style={{ color: '#2D2D2D', fontSize: '1.0625rem', lineHeight: 1.7 }}>
            IPL is not a laser. Many clinics call it "laser hair removal," but IPL is a completely different technology. 
            It uses broad-spectrum light. Think of a flashlight shining many wavelengths at once. 
            A real laser focuses a single wavelength directly into the hair follicle.
          </p>
        </section>


        {/* Section 2: How IPL Differs from Laser - prose format */}
        <section id="how-ipl-differs" style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            IPL vs Laser: How They Differ
          </h2>

          {/* Diagram */}
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <img
              src="/ipl-vs-laser.png"
              alt="Diagram comparing IPL broad spectrum light versus real laser single wavelength for hair removal"
              style={{
                width: '100%',
                maxWidth: '420px',
                height: 'auto',
                borderRadius: '0.75rem',
              }}
            />
          </div>

          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            IPL emits multiple wavelengths (typically 500–1200nm) at once in a broad flash. The energy scatters across the skin rather than focusing on the follicle.
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8 }}>
            A real laser concentrates a single wavelength (e.g. 755nm or 810nm) into one beam that penetrates directly to the hair follicle. The energy is precise and consistent.
          </p>




        </section>

        {/* Section 3: Why This Matters for Hair Removal - prose format */}
        <section id="why-it-matters" style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            Why This Matters for Hair Removal
          </h2>
     <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            The difference isn't just technical. It affects your results.
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            IPL typically requires 8–12+ sessions compared to 6–8 for laser. Because IPL energy
            disperses, some follicles don't receive enough energy and survive. A head-to-head
            clinical trial comparing diode laser and IPL on the same patients found the laser
            was more effective at reducing hair. <a href="https://pubmed.ncbi.nlm.nih.gov/25229781/" target="_blank" rel="noopener noreferrer" style={{ fontStyle: 'italic', color: '#5E8B7E' }}>(Lasers in Medical Science, 2014)</a>
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            Laser wavelengths can be chosen specifically for your skin type: 755nm for lighter
            skin, 1064nm for darker skin. IPL's broad spectrum makes it riskier for darker skin
            tones because the scattered light can be absorbed by skin pigment rather than hair pigment.
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            There's also the risk of paradoxical hypertrichosis, where treatment actually
            stimulates new hair growth instead of removing it. Studies have found this occurs
            in roughly 3% of patients, primarily on the face and neck. The risk is higher when
            energy levels are too low to destroy the follicle but enough to stimulate it.
            Because IPL scatters energy less precisely, some follicles may receive this
            "stimulating" dose rather than a destructive one. <a href="https://pubmed.ncbi.nlm.nih.gov/34057666/" target="_blank" rel="noopener noreferrer" style={{ fontStyle: 'italic', color: '#5E8B7E' }}>(American Journal of Clinical Dermatology, 2021)</a>
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8, marginBottom: '1rem' }}>
            Long-term, the gap widens. A systematic review found Alexandrite laser achieved
            35–84% long-term hair reduction, Diode laser 32–69%, while IPL achieved only
            27–52%. <a href="https://www.tandfonline.com/doi/full/10.1080/14764172.2022.2075899" target="_blank" rel="noopener noreferrer" style={{ fontStyle: 'italic', color: '#5E8B7E' }}>(Journal of Cosmetic and Laser Therapy, 2022)</a>
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.8 }}>
            IPL sessions are often cheaper upfront but you need more of them. When you factor
            in the total cost and time, laser frequently works out similar or cheaper in the long run.
          </p>
        </section>

        {/* Section 4: Branded IPL You Might Not Recognize */}
        <section id="branded-ipl" style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            Branded IPL You Might Not Recognize
          </h2>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            These are all IPL technology, despite their marketing names:
          </p>

          <ul
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            style={{ marginBottom: '1.25rem' }}
          >
            {brandedIPL.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/is-it-a-real-laser/${item.slug}`}
                  className="block rounded-xl transition-all hover:border-[#5E8B7E]"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E8E4DF',
                    padding: '0.875rem 1rem',
                    textDecoration: 'none',
                    height: '100%',
                  }}
                >
                  <span style={{ color: '#2D2D2D', fontWeight: 600, fontSize: '0.9375rem', display: 'block' }}>
                    {item.name}
                  </span>
                  <span style={{ color: '#5A5550', fontSize: '0.875rem' }}>{item.description}</span>
                </Link>
              </li>
            ))}
          </ul>

          <p
            className="rounded-xl"
            style={{
              backgroundColor: 'rgba(196, 107, 92, 0.08)',
              border: '1px solid rgba(196, 107, 92, 0.15)',
              padding: '1rem 1.25rem',
              color: '#C46B5C',
              fontWeight: 500,
              lineHeight: 1.6,
              fontSize: '0.9375rem',
            }}
          >
            If your clinic uses any of these, you are receiving IPL treatment, not laser.
          </p>
        </section>

        {/* Section 5: Is IPL Still Worth Considering? */}
        <section id="is-ipl-worth-it" style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            Is IPL Still Worth Considering?
          </h2>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.7, marginBottom: '1rem' }}>
            IPL is a legitimate technology with real uses. It can reduce hair growth, and premium
            devices like Sciton BBL are well-engineered machines.
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.7, marginBottom: '1rem' }}>
            But the evidence gap is real. While long-term hair removal has been demonstrated for
            Alexandrite and Diode lasers, evidence for lasting results from IPL is still
            lacking. <a href="https://pubmed.ncbi.nlm.nih.gov/16405602/" target="_blank" rel="noopener noreferrer" style={{ fontStyle: 'italic', color: '#5E8B7E' }}>(Journal of the European Academy of Dermatology, 2006)</a>
          </p>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.7, marginBottom: '1rem' }}>
          The equipment investment tells a story too. A clinical-grade laser like the Candela GentleMax Pro costs $80,000–$150,000. A quality IPL device costs $15,000–$30,000. Budget IPL machines can be found for as little as $2,000–$3,000. When a clinic charges significantly less than competitors, it's worth asking what equipment they invested in.
           </p>
           <p
            className="leading-relaxed"
            style={{
              color: '#5A5550',
              lineHeight: 1.7,
              marginBottom: '1rem'
            }}
          >
            The issue isn't that IPL exists, it's that consumers deserve to know what technology
            is being used on their skin. If your clinic offers IPL and is transparent about it,
            that's fine. If they call it "laser hair removal", that's misleading.
          </p>

          <p
            className="leading-relaxed"
            style={{
              color: '#5A5550',
              lineHeight: 1.7,
            }}
          >
          This mislabeling isn't limited to clinics. Even Forbes lists IPL devices alongside lasers in their 'best laser hair removal devices' roundup. If major publications can't get the distinction right, it's no surprise consumers don't know what they're paying for.
          </p>
        </section>

        {/* Section 6: What Real Users Say */}
        <section id="user-experiences" style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              color: '#2D2D2D',
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            What Real Users Say
          </h2>
          <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            Across forums and communities, a consistent pattern emerges. Users who tried IPL first
            and laser second overwhelmingly prefer laser for long-term results. Common themes include:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <blockquote
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E4DF',
                borderLeft: '3px solid #5E8B7E',
                borderRadius: '0.5rem',
                padding: '1rem 1.25rem',
                margin: 0,
                fontStyle: 'italic',
                color: '#5A5550',
                lineHeight: 1.7,
              }}
            >
              "IPL needed to be done every 2 months, and even after 1–2 years the frequency didn't
              change. Switched to laser and after 6–8 sessions, I only need treatments once per year."
            </blockquote>
            <blockquote
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E4DF',
                borderLeft: '3px solid #5E8B7E',
                borderRadius: '0.5rem',
                padding: '1rem 1.25rem',
                margin: 0,
                fontStyle: 'italic',
                color: '#5A5550',
                lineHeight: 1.7,
              }}
            >
              "My tech told me IPL is a scam, and after you stop, any hair treated with IPL will
              grow back within weeks."
            </blockquote>
            <blockquote
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E4DF',
                borderLeft: '3px solid #5E8B7E',
                borderRadius: '0.5rem',
                padding: '1rem 1.25rem',
                margin: 0,
                fontStyle: 'italic',
                color: '#5A5550',
                lineHeight: 1.7,
              }}
            >
              "Both work on the same principle but laser uses a much more precise wavelength,
              so more light is targeted at the hair, not the skin."
            </blockquote>
          </div>
        </section>

        {/* Section 7: What to Ask Your Clinic (Ask Your Clinic section) */}
        {askYourClinic && (
          <section
            id="what-to-ask"
            className="rounded-xl"
            style={{
              backgroundColor: 'rgba(94, 139, 126, 0.06)',
              border: '1px solid rgba(94, 139, 126, 0.15)',
              padding: '1.5rem',
              marginBottom: '2.5rem',
            }}
          >
            <h2
              className="flex items-center gap-2"
              style={{
                color: '#5E8B7E',
                fontSize: '1rem',
                fontWeight: 600,
                marginBottom: '1rem',
              }}
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              What to Ask Your Clinic
            </h2>
            <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.7, marginBottom: '1rem' }}>
              If you're unsure what your clinic uses, ask these two questions:
            </p>
            <ol
              style={{
                color: '#2D2D2D',
                paddingLeft: '1.5rem',
                listStyleType: 'decimal',
                marginBottom: '1.25rem',
              }}
            >
              <li style={{ marginBottom: '0.5rem', lineHeight: 1.6, fontWeight: 500 }}>
                "Do you use a laser or an IPL device?"
              </li>
              <li style={{ lineHeight: 1.6, fontWeight: 500 }}>
                "What is the specific brand and model?"
              </li>
            </ol>
            <p className="leading-relaxed" style={{ color: '#5A5550', lineHeight: 1.7 }}>
              Once you have the answer,{' '}
              <Link
                href="/is-it-a-real-laser"
                style={{ color: '#5E8B7E', fontWeight: 500, textDecoration: 'underline' }}
              >
                check if it's a real hair removal laser →
              </Link>
            </p>
          </section>
        )}

        <Footer />
      </article>
    </main>
  );
}
