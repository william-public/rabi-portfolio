"use client"

import { useEffect } from 'react'

export function FaviconHelper() {
  useEffect(() => {
    try {
      // Force favicon refresh by removing and re-adding link elements
      const links = document.querySelectorAll("link[rel*='icon']");
      links.forEach(link => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
      
      // Add favicon link manually
      const link = document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = '/favicon.ico?v=' + new Date().getTime(); // Add timestamp to bust cache
      
      const head = document.getElementsByTagName('head')[0];
      if (head) {
        head.appendChild(link);
      }
    } catch (error) {
      console.warn('Favicon update failed:', error);
    }
  }, []);
  
  return null;
}
