"use client";
import React, { useEffect, useState } from 'react';
import styles from './styles/team.module.scss';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

interface TeamMember {
  _id: string;
  name: string;
  position: string;
  image: string;
  githubLink?: string;
  linkedinLink?: string;
  fact: string;
}

const Team: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/team');
      const data = await response.json();
      
      if (data.success) {
        setTeamMembers(data.data);
        setError(null);
      } else {
        setError(data.error || 'Failed to load team members');
      }
    } catch (err) {
      setError('Failed to fetch team members');
      console.error('Error fetching team members:', err);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section id="team" className={styles.teamSection}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <span className={styles.titleBase}>Our </span>
          <span className={styles.titleHighlight}>Team</span>
        </h1>
        <p className={styles.subtitle}>
          Meet the talented individuals who make EXSOLVIA possible.
        </p>

        {loading && <div className={styles.loading}>Loading team members...</div>}
        
        {error && <div className={styles.error}>Error: {error}</div>}
        
        {!loading && !error && (
          <div className={styles.teamGrid}>
            {teamMembers.length === 0 ? (
              <div className={styles.loading}>No team members found. Add some via the API!</div>
            ) : (
              teamMembers.map((member) => (
                <div key={member._id} className={styles.teamCard}>
                  <div className={styles.imageWrapper}>
                    {member.image ? (
                      <>
                        <img
                          src={member.image}
                          alt={member.name}
                          className={styles.memberImage}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const placeholder = target.nextElementSibling as HTMLElement;
                            if (placeholder) placeholder.style.display = 'flex';
                          }}
                        />
                        <div className={styles.placeholderImage} style={{ display: 'none' }}>
                          {getInitials(member.name)}
                        </div>
                      </>
                    ) : (
                      <div className={styles.placeholderImage}>
                        {getInitials(member.name)}
                      </div>
                    )}
                  </div>
                  
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberPosition}>{member.position}</p>
                  
                  <div className={styles.socialLinks}>
                    {member.githubLink && (
                      <a
                        href={member.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label={`${member.name}'s GitHub`}
                      >
                        <FaGithub size={18} />
                      </a>
                    )}
                    {member.linkedinLink && (
                      <a
                        href={member.linkedinLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <FaLinkedin size={18} />
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;

