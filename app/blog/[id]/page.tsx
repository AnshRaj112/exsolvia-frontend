"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './blogDetail.module.scss';

interface Blog {
  _id: string;
  title: string;
  description: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blogs/${id}`);
      const data = await response.json();

      if (data.success) {
        setBlog(data.data);
        setError(null);
      } else {
        setError(data.error || 'Blog not found');
      }
    } catch (err) {
      setError('Failed to fetch blog');
      console.error('Error fetching blog:', err);
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

  if (loading) {
    return (
      <div className={styles.blogDetailPage}>
        <div className={styles.container}>
          <div className={styles.loading}>Loading blog...</div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className={styles.blogDetailPage}>
        <div className={styles.container}>
          <div className={styles.error}>{error || 'Blog not found'}</div>
          <Link href="/blog" className={styles.backLink}>
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.blogDetailPage}>
      <div className={styles.container}>
        <Link href="/blog" className={styles.backLink}>
          ← Back to Blog
        </Link>

        <article className={styles.blogArticle}>
          <header className={styles.blogHeader}>
            <h1 className={styles.blogTitle}>{blog.title}</h1>
            <div className={styles.blogMeta}>
              <time className={styles.blogDate}>
                Published: {formatDate(blog.createdAt)}
              </time>
              {blog.updatedAt !== blog.createdAt && (
                <time className={styles.blogDate}>
                  Updated: {formatDate(blog.updatedAt)}
                </time>
              )}
            </div>
            {blog.description && (
              <p className={styles.blogDescription}>{blog.description}</p>
            )}
          </header>

          <div className={styles.blogContent}>
            {blog.content.split('\n').map((paragraph, index) => (
              <p key={index}>
                {paragraph || '\u00A0'}
              </p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}

