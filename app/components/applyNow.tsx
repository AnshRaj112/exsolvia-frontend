"use client";
import React, { useState, useEffect } from 'react';
import styles from './styles/applyNow.module.scss';

interface Position {
  _id: string;
  title: string;
  isActive: boolean;
}

const ApplyNow: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    resume: '',
    portfolio: '',
    linkedin: '',
    github: '',
    message: '',
  });
  
  const [positions, setPositions] = useState<Position[]>([]);
  const [loadingPositions, setLoadingPositions] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      setLoadingPositions(true);
      const response = await fetch('/api/positions');
      const data = await response.json();

      if (data.success) {
        setPositions(data.data);
      } else {
        console.error('Failed to load positions:', data.error);
      }
    } catch (err) {
      console.error('Error fetching positions:', err);
    } finally {
      setLoadingPositions(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Application submitted successfully! We will get back to you soon.',
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: '',
          resume: '',
          portfolio: '',
          linkedin: '',
          github: '',
          message: '',
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Failed to submit application. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred. Please try again later.',
      });
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="apply" className={styles.applySection}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <span className={styles.titleBase}>Join </span>
          <span className={styles.titleHighlight}>Our Team</span>
        </h1>
        <p className={styles.subtitle}>
          Ready to be part of something amazing? Apply now and help us shape the future.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Full Name <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="John Doe"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="john.doe@example.com"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                Phone <span className={styles.required}>*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="+1 234 567 8900"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="position" className={styles.label}>
                Position <span className={styles.required}>*</span>
              </label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className={styles.input}
                disabled={loadingPositions}
              >
                <option value="">
                  {loadingPositions ? 'Loading positions...' : 'Select a position'}
                </option>
                {positions.map((position) => (
                  <option key={position._id} value={position.title}>
                    {position.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="resume" className={styles.label}>
                Resume URL <span className={styles.required}>*</span>
              </label>
              <input
                type="url"
                id="resume"
                name="resume"
                value={formData.resume}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="https://example.com/resume.pdf"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="portfolio" className={styles.label}>Portfolio URL</label>
              <input
                type="url"
                id="portfolio"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                className={styles.input}
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="linkedin" className={styles.label}>LinkedIn Profile</label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className={styles.input}
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="github" className={styles.label}>GitHub Profile</label>
              <input
                type="url"
                id="github"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className={styles.input}
                placeholder="https://github.com/username"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>Additional Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={styles.textarea}
              placeholder="Anything else you'd like us to know?"
            />
          </div>

          {submitStatus.type && (
            <div
              className={
                submitStatus.type === 'success'
                  ? styles.successMessage
                  : styles.errorMessage
              }
            >
              {submitStatus.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ApplyNow;

