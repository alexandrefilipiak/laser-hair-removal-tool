'use client';

import { useState } from 'react';

const ROLE_OPTIONS = [
  { value: '', label: 'Select one...' },
  { value: 'clinic-owner', label: 'Clinic owner' },
  { value: 'laser-technician', label: 'Laser technician' },
  { value: 'industry-professional', label: 'Industry professional' },
  { value: 'consumer', label: 'Consumer' },
  { value: 'other', label: 'Other' },
];

export function ContactForm() {
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!role || !message || !email) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all fields.',
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter a valid email address.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role, message, email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus({
        type: 'success',
        message: 'Message sent! We\'ll get back to you soon.',
      });
      setRole('');
      setMessage('');
      setEmail('');
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '0.875rem 1rem',
    fontSize: '1rem',
    border: '1px solid #E8E4DF',
    borderRadius: '0.5rem',
    backgroundColor: '#FFFFFF',
    color: '#2D2D2D',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.9375rem',
    fontWeight: 500,
    color: '#2D2D2D',
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '480px' }}>
      {/* Role dropdown */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="role" style={labelStyle}>
          Who are you?
        </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            ...inputStyle,
            cursor: 'pointer',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235A5550'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1rem center',
            backgroundSize: '1.25rem',
            paddingRight: '3rem',
          }}
          className="focus:border-[#5E8B7E] focus:ring-2 focus:ring-[rgba(94,139,126,0.15)]"
          required
        >
          {ROLE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message textarea */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="message" style={labelStyle}>
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share a tip, report an issue, or ask a question..."
          rows={5}
          style={{
            ...inputStyle,
            resize: 'vertical',
            minHeight: '120px',
          }}
          className="focus:border-[#5E8B7E] focus:ring-2 focus:ring-[rgba(94,139,126,0.15)]"
          required
        />
      </div>

      {/* Email input */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="email" style={labelStyle}>
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          style={inputStyle}
          className="focus:border-[#5E8B7E] focus:ring-2 focus:ring-[rgba(94,139,126,0.15)]"
          autoComplete="email"
          required
        />
      </div>

      {/* Status message */}
      {submitStatus.type && (
        <div
          role="alert"
          style={{
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
            backgroundColor: submitStatus.type === 'success' ? 'rgba(94, 139, 126, 0.1)' : 'rgba(196, 107, 92, 0.1)',
            border: `1px solid ${submitStatus.type === 'success' ? 'rgba(94, 139, 126, 0.3)' : 'rgba(196, 107, 92, 0.3)'}`,
            color: submitStatus.type === 'success' ? '#5E8B7E' : '#C46B5C',
            fontSize: '0.9375rem',
          }}
        >
          {submitStatus.message}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          padding: '0.875rem 1.5rem',
          fontSize: '1rem',
          fontWeight: 600,
          color: '#FFFFFF',
          backgroundColor: isSubmitting ? '#9DB5AD' : '#5E8B7E',
          border: 'none',
          borderRadius: '9999px',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s',
        }}
        className="hover:bg-[#4A7566]"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
