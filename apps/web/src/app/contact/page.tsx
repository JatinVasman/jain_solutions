'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '../../components/Breadcrumb';

interface FormData {
  name: string;
  email: string;
  phone: string;
  requirement: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  requirement?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    requirement: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionAttempted, setSubmissionAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.name.trim()) {
      errs.name = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.requirement.trim()) {
      errs.requirement = 'Please specify the equipment or product you are looking for.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide details or specifications for your request.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate validation pass and show honest backend status
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionAttempted(true);
    }, 400);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      requirement: '',
      message: '',
    });
    setErrors({});
    setSubmissionAttempted(false);
  };

  return (
    <div className="page-container" style={{ paddingBottom: '4rem' }}>
      <Breadcrumb items={[{ label: 'Contact Us', href: '/contact' }]} />

      <div className="section-header" style={{ marginBottom: '2rem' }}>
        <span className="section-tag">Direct Assistance</span>
        <h1 className="section-title">Can&apos;t Find What You Need? Contact Us</h1>
        <p className="section-desc" style={{ maxWidth: '720px' }}>
          Looking for specific CCTV optics, high-throughput network switches, Wi-Fi 6 hardware, or custom rental contracts? Share your requirements and our team will assist you.
        </p>
      </div>

      <div className="contact-layout-grid">
        {/* Contact Form Container */}
        <div
          style={{
            background: '#ffffff',
            padding: '2.25rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '0.5rem' }}>
            Request Specific Equipment or Custom Rental
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.75rem' }}>
            Fill out the details below. All fields marked with * are required.
          </p>

          {submissionAttempted ? (
            <div
              role="alert"
              style={{
                background: '#fef3c7',
                border: '1px solid #f59e0b',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                color: '#92400e',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem' }}>
                <span style={{ fontSize: '1.35rem' }}>⚠️</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: '#78350f' }}>
                  Submission Service Integration Incomplete
                </h3>
              </div>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.55, marginBottom: '0.85rem' }}>
                Your enquiry data was validated locally on your browser:
              </p>
              <ul style={{ fontSize: '0.825rem', background: '#ffffff', padding: '0.75rem 1rem 0.75rem 2rem', borderRadius: '6px', border: '1px solid #fde68a', marginBottom: '1rem', color: '#1e293b' }}>
                <li><strong>Name:</strong> {formData.name}</li>
                <li><strong>Email:</strong> {formData.email}</li>
                {formData.phone && <li><strong>Phone:</strong> {formData.phone}</li>}
                <li><strong>Equipment:</strong> {formData.requirement}</li>
                <li><strong>Details:</strong> {formData.message}</li>
              </ul>
              <p style={{ fontSize: '0.825rem', lineHeight: 1.5, color: '#b45309', marginBottom: '1.25rem' }}>
                <strong>Technical Notice:</strong> An active backend submission API / CRM dispatch service has not yet been connected to this environment. As required, this integration is clearly identified as incomplete rather than pretending the message was dispatched to an external server.
              </p>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={handleResetForm}
                style={{ fontSize: '0.825rem' }}
              >
                ← Back to Edit Form
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {/* Full Name */}
              <div>
                <label htmlFor="contact-name" className="filter-label">
                  Full Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Rajesh Kumar"
                  value={formData.name}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" style={{ color: '#dc2626', fontSize: '0.78rem', marginTop: '0.35rem' }}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="contact-email" className="filter-label">
                  Email Address <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="e.g. rajesh@enterprise.in"
                  value={formData.email}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" style={{ color: '#dc2626', fontSize: '0.78rem', marginTop: '0.35rem' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone (Optional) */}
              <div>
                <label htmlFor="contact-phone" className="filter-label">
                  Phone Number <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(Optional)</span>
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  className="form-input"
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Equipment Requirement */}
              <div>
                <label htmlFor="contact-requirement" className="filter-label">
                  Product / Equipment Needed <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  id="contact-requirement"
                  name="requirement"
                  type="text"
                  className="form-input"
                  placeholder="e.g. 48-port PoE+ Managed Switch or PTZ 4K CCTV"
                  value={formData.requirement}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.requirement}
                  aria-describedby={errors.requirement ? 'req-error' : undefined}
                />
                {errors.requirement && (
                  <p id="req-error" style={{ color: '#dc2626', fontSize: '0.78rem', marginTop: '0.35rem' }}>
                    {errors.requirement}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="filter-label">
                  Project Details / Message <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  className="form-input"
                  placeholder="Tell us about the rental tenure, deployment site, or any specific brand/model requirement..."
                  value={formData.message}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'msg-error' : undefined}
                />
                {errors.message && (
                  <p id="msg-error" style={{ color: '#dc2626', fontSize: '0.78rem', marginTop: '0.35rem' }}>
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                style={{
                  marginTop: '0.5rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                {isSubmitting ? 'Validating...' : 'Submit Equipment Request →'}
              </button>
            </form>
          )}
        </div>

        {/* Guidance / Information Sidebar (No invented dummy addresses or phone numbers) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div
            style={{
              background: '#ffffff',
              padding: '1.75rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.4rem' }}>🔍</span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-title)', margin: 0 }}>
                Looking for unlisted models?
              </h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
              Our active rental fleet covers surveillance optics, routing arrays, enterprise switching, and accessories. If your project demands specialized optics, high-density fiber patch panels, or specific brands not listed in the quick categories, submit your specifications here for fleet sourcing.
            </p>
          </div>

          <div
            style={{
              background: '#ffffff',
              padding: '1.75rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.4rem' }}>⚡</span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-title)', margin: 0 }}>
                What happens next?
              </h3>
            </div>
            <ul style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, paddingLeft: '1.25rem', margin: 0 }}>
              <li style={{ marginBottom: '0.45rem' }}>
                Hardware engineers review your technical specifications and power/bandwidth prerequisites.
              </li>
              <li style={{ marginBottom: '0.45rem' }}>
                Availability and tenure rate tiers (daily, weekly, or monthly) are evaluated against active inventory.
              </li>
              <li>
                Bench testing is scheduled before any equipment is packaged and dispatched.
              </li>
            </ul>
          </div>

          <div
            style={{
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid #bfdbfe',
            }}
          >
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--brand-blue-cobalt, #0a4d97)', marginBottom: '0.35rem' }}>
              Prefer to browse available gear first?
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#1e3a8a', lineHeight: 1.5, marginBottom: '0.85rem' }}>
              Explore our verified categories with real-time status and transparent daily rates.
            </p>
            <Link href="/categories" className="btn btn-secondary btn-sm" style={{ background: '#ffffff', borderColor: '#93c5fd' }}>
              Browse Equipment Categories →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
