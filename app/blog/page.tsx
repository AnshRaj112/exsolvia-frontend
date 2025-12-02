"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './blog.module.scss';

interface Blog {
  _id: string;
  title: string;
  description: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blogs');
      const data = await response.json();

      if (data.success) {
        setBlogs(data.data);
        setError(null);
      } else {
        setError(data.error || 'Failed to load blogs');
      }
    } catch (err) {
      setError('Failed to fetch blogs');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={styles.blogPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Our Blog</h1>
          <p className={styles.subtitle}>
            Stay updated with our latest news, insights, and updates
          </p>
        </header>

        {loading && (
          <div className={styles.loading}>Loading blogs...</div>
        )}

        {error && (
          <div className={styles.error}>Error: {error}</div>
        )}

        {!loading && !error && (
          <>
            {blogs.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No blog posts available at the moment. Check back soon!</p>
              </div>
            ) : (
              <div className={styles.blogsGrid}>
                {blogs.map((blog) => (
                  <article key={blog._id} className={styles.blogCard}>
                    <div className={styles.blogCardContent}>
                      <h2 className={styles.blogTitle}>{blog.title}</h2>
                      <p className={styles.blogDescription}>{blog.description}</p>
                      <div className={styles.blogMeta}>
                        <time className={styles.blogDate}>
                          {formatDate(blog.createdAt)}
                        </time>
                      </div>
                    </div>
                    <Link 
                      href={`/blog/${blog._id}`}
                      className={styles.readMoreButton}
                    >
                      Read More
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

