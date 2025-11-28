"use client";
import React, { useEffect, useState } from 'react';
import styles from './admin.module.scss';

interface Application {
  _id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  resume: string;
  coverLetter?: string;
  portfolio?: string;
  linkedin?: string;
  github?: string;
  message?: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

const AdminPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/applications');
      const data = await response.json();

      if (data.success) {
        setApplications(data.data);
        setError(null);
      } else {
        setError(data.error || 'Failed to load applications');
      }
    } catch (err) {
      setError('Failed to fetch applications');
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return styles.statusPending;
      case 'reviewed':
        return styles.statusReviewed;
      case 'accepted':
        return styles.statusAccepted;
      case 'rejected':
        return styles.statusRejected;
      default:
        return styles.statusPending;
    }
  };

  return (
    <div className={styles.adminPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Applications Dashboard</h1>
          <p className={styles.subtitle}>
            View and manage all job applications ({applications.length} total)
          </p>
        </header>

        {loading && (
          <div className={styles.loading}>Loading applications...</div>
        )}

        {error && (
          <div className={styles.error}>Error: {error}</div>
        )}

        {!loading && !error && (
          <>
            {applications.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No applications found.</p>
              </div>
            ) : (
              <div className={styles.content}>
                <div className={styles.listContainer}>
                  <div className={styles.applicationList}>
                    {applications.map((application) => (
                      <div
                        key={application._id}
                        className={`${styles.applicationCard} ${
                          selectedApplication?._id === application._id
                            ? styles.active
                            : ''
                        }`}
                        onClick={() => setSelectedApplication(application)}
                      >
                        <div className={styles.cardHeader}>
                          <h3 className={styles.applicantName}>{application.name}</h3>
                          <span
                            className={`${styles.statusBadge} ${getStatusBadgeClass(
                              application.status
                            )}`}
                          >
                            {application.status}
                          </span>
                        </div>
                        <p className={styles.applicantEmail}>{application.email}</p>
                        <p className={styles.applicantPosition}>{application.position}</p>
                        <p className={styles.applicantDate}>
                          Applied: {formatDate(application.createdAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.detailContainer}>
                  {selectedApplication ? (
                    <div className={styles.applicationDetail}>
                      <div className={styles.detailHeader}>
                        <h2 className={styles.detailTitle}>
                          {selectedApplication.name}
                        </h2>
                        <span
                          className={`${styles.statusBadge} ${getStatusBadgeClass(
                            selectedApplication.status
                          )}`}
                        >
                          {selectedApplication.status}
                        </span>
                      </div>

                      <div className={styles.detailContent}>
                        <div className={styles.detailSection}>
                          <h3 className={styles.sectionTitle}>Contact Information</h3>
                          <div className={styles.detailRow}>
                            <strong>Email:</strong>
                            <a
                              href={`mailto:${selectedApplication.email}`}
                              className={styles.link}
                            >
                              {selectedApplication.email}
                            </a>
                          </div>
                          <div className={styles.detailRow}>
                            <strong>Phone:</strong>
                            <span>{selectedApplication.phone}</span>
                          </div>
                          <div className={styles.detailRow}>
                            <strong>Position:</strong>
                            <span>{selectedApplication.position}</span>
                          </div>
                        </div>

                        <div className={styles.detailSection}>
                          <h3 className={styles.sectionTitle}>Links & Resources</h3>
                          <div className={styles.detailRow}>
                            <strong>Resume:</strong>
                            <a
                              href={selectedApplication.resume}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.link}
                            >
                              View Resume
                            </a>
                          </div>
                          {selectedApplication.portfolio && (
                            <div className={styles.detailRow}>
                              <strong>Portfolio:</strong>
                              <a
                                href={selectedApplication.portfolio}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.link}
                              >
                                View Portfolio
                              </a>
                            </div>
                          )}
                          {selectedApplication.linkedin && (
                            <div className={styles.detailRow}>
                              <strong>LinkedIn:</strong>
                              <a
                                href={selectedApplication.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.link}
                              >
                                View Profile
                              </a>
                            </div>
                          )}
                          {selectedApplication.github && (
                            <div className={styles.detailRow}>
                              <strong>GitHub:</strong>
                              <a
                                href={selectedApplication.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.link}
                              >
                                View Profile
                              </a>
                            </div>
                          )}
                        </div>

                        {selectedApplication.message && (
                          <div className={styles.detailSection}>
                            <h3 className={styles.sectionTitle}>Additional Message</h3>
                            <p className={styles.detailText}>
                              {selectedApplication.message}
                            </p>
                          </div>
                        )}

                        <div className={styles.detailSection}>
                          <h3 className={styles.sectionTitle}>Timeline</h3>
                          <div className={styles.detailRow}>
                            <strong>Applied:</strong>
                            <span>{formatDate(selectedApplication.createdAt)}</span>
                          </div>
                          {selectedApplication.updatedAt !== selectedApplication.createdAt && (
                            <div className={styles.detailRow}>
                              <strong>Last Updated:</strong>
                              <span>{formatDate(selectedApplication.updatedAt)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.emptyDetail}>
                      <p>Select an application to view details</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;

