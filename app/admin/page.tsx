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
  status: 'pending' | 'reviewed' | 'interview phase' | 'onboarding' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

interface Position {
  _id: string;
  title: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'applications' | 'positions'>('applications');
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  
  // Positions management state
  const [positions, setPositions] = useState<Position[]>([]);
  const [positionsLoading, setPositionsLoading] = useState(false);
  const [positionsError, setPositionsError] = useState<string | null>(null);
  const [newPositionTitle, setNewPositionTitle] = useState('');
  const [addingPosition, setAddingPosition] = useState(false);

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

  const formatStatus = (status: string) => {
    return status
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return styles.statusPending;
      case 'reviewed':
        return styles.statusReviewed;
      case 'interview phase':
        return styles.statusInterview;
      case 'onboarding':
        return styles.statusOnboarding;
      case 'rejected':
        return styles.statusRejected;
      default:
        return styles.statusPending;
    }
  };

  const updateStatus = async (applicationId: string, newStatus: string) => {
    try {
      setUpdatingStatus(true);
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        // Update the application in the list
        setApplications((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, status: newStatus as Application['status'] } : app
          )
        );

        // Update selected application if it's the one being updated
        if (selectedApplication && selectedApplication._id === applicationId) {
          setSelectedApplication({
            ...selectedApplication,
            status: newStatus as Application['status'],
          });
        }
      } else {
        setError(data.error || 'Failed to update status');
      }
    } catch (err) {
      setError('Failed to update status');
      console.error('Error updating status:', err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedApplication) {
      updateStatus(selectedApplication._id, e.target.value);
    }
  };

  // Positions management functions
  const fetchPositions = async () => {
    try {
      setPositionsLoading(true);
      setPositionsError(null);
      const response = await fetch('/api/positions');
      const data = await response.json();

      if (data.success) {
        setPositions(data.data);
      } else {
        setPositionsError(data.error || 'Failed to load positions');
      }
    } catch (err) {
      setPositionsError('Failed to fetch positions');
      console.error('Error fetching positions:', err);
    } finally {
      setPositionsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'positions') {
      fetchPositions();
    }
  }, [activeTab]);

  const handleAddPosition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPositionTitle.trim()) return;

    try {
      setAddingPosition(true);
      const response = await fetch('/api/positions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newPositionTitle }),
      });

      const data = await response.json();

      if (data.success) {
        setNewPositionTitle('');
        await fetchPositions();
      } else {
        setPositionsError(data.error || 'Failed to add position');
      }
    } catch (err) {
      setPositionsError('Failed to add position');
      console.error('Error adding position:', err);
    } finally {
      setAddingPosition(false);
    }
  };

  const handleDeletePosition = async (id: string) => {
    if (!confirm('Are you sure you want to remove this position? It will no longer appear in the application form.')) {
      return;
    }

    try {
      const response = await fetch(`/api/positions/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        await fetchPositions();
      } else {
        setPositionsError(data.error || 'Failed to remove position');
      }
    } catch (err) {
      setPositionsError('Failed to remove position');
      console.error('Error removing position:', err);
    }
  };

  return (
    <div className={styles.adminPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Admin Dashboard</h1>
          <p className={styles.subtitle}>
            Manage applications and available positions
          </p>
        </header>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'applications' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            Applications ({applications.length})
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'positions' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('positions')}
          >
            Positions
          </button>
        </div>

        {activeTab === 'applications' && (
          <>
            <div className={styles.sectionHeader}>
              <h2>Applications Dashboard</h2>
            </div>

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
                                {formatStatus(application.status)}
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
                              {formatStatus(selectedApplication.status)}
                            </span>
                          </div>

                          <div className={styles.detailContent}>
                            <div className={styles.detailSection}>
                              <h3 className={styles.sectionTitle}>Application Status</h3>
                              <div className={styles.statusUpdateContainer}>
                                <label htmlFor="status-select" className={styles.statusLabel}>
                                  Update Status:
                                </label>
                                <select
                                  id="status-select"
                                  value={selectedApplication.status}
                                  onChange={handleStatusChange}
                                  disabled={updatingStatus}
                                  className={styles.statusSelect}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="reviewed">Reviewed</option>
                                  <option value="interview phase">Interview Phase</option>
                                  <option value="onboarding">Onboarding</option>
                                  <option value="rejected">Rejected</option>
                                </select>
                                {updatingStatus && (
                                  <span className={styles.updatingText}>Updating...</span>
                                )}
                              </div>
                            </div>

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
          </>
        )}

        {activeTab === 'positions' && (
          <div className={styles.positionsSection}>
            <div className={styles.sectionHeader}>
              <h2>Manage Available Positions</h2>
              <p className={styles.sectionSubtitle}>
                Add or remove positions that appear in the application form
              </p>
            </div>

            {positionsError && (
              <div className={styles.error}>{positionsError}</div>
            )}

            <div className={styles.addPositionForm}>
              <form onSubmit={handleAddPosition}>
                <div className={styles.formRow}>
                  <input
                    type="text"
                    value={newPositionTitle}
                    onChange={(e) => setNewPositionTitle(e.target.value)}
                    placeholder="Enter new position title (e.g., Software Engineer)"
                    className={styles.positionInput}
                    required
                  />
                  <button
                    type="submit"
                    disabled={addingPosition || !newPositionTitle.trim()}
                    className={styles.addButton}
                  >
                    {addingPosition ? 'Adding...' : 'Add Position'}
                  </button>
                </div>
              </form>
            </div>

            {positionsLoading && (
              <div className={styles.loading}>Loading positions...</div>
            )}

            {!positionsLoading && (
              <>
                {positions.length === 0 ? (
                  <div className={styles.emptyState}>
                    <p>No positions found. Add your first position above.</p>
                  </div>
                ) : (
                  <div className={styles.positionsList}>
                    {positions.map((position) => (
                      <div key={position._id} className={styles.positionCard}>
                        <div className={styles.positionInfo}>
                          <h3 className={styles.positionTitle}>{position.title}</h3>
                          <span className={styles.positionBadge}>Active</span>
                        </div>
                        <button
                          onClick={() => handleDeletePosition(position._id)}
                          className={styles.deleteButton}
                          title="Remove position"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;

