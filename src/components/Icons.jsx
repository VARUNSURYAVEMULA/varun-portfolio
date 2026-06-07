import React from 'react';

export const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export const BehanceIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M14.496 11.238c-.803-.509-2.024-.954-3.522-.954H6.012v10.15h5.45c1.884 0 3.238-.598 3.99-1.39.736-.78.966-1.745.966-2.81 0-1.232-.346-2.352-1.922-2.827v-.044c1.196-.34 1.74-1.392 1.74-2.58 0-.962-.326-1.74-1.74-2.545zM9.54 12.39h1.34c1.106 0 1.638.384 1.638 1.107 0 .804-.54 1.116-1.638 1.116H9.54v-2.223zm1.53 4.88H9.54v-2.42h1.61c1.23 0 1.84.42 1.84 1.22 0 .804-.61 1.2-1.92 1.2zm8.56-4.52c0-1.89-1.29-3.24-3.23-3.24-2.04 0-3.37 1.34-3.37 3.38 0 2.06 1.33 3.4 3.46 3.4 1.64 0 2.76-.78 3.14-2.14h-1.42c-.22.61-.83.92-1.66.92-1.07 0-1.68-.6-1.84-1.54h4.91c.01-.16.01-.4.01-.78zm-3.24-1.96c.92 0 1.54.54 1.7 1.38h-3.34c.16-.84.78-1.38 1.64-1.38zM14.62 7.02h4.51V8.5h-4.51z"/>
  </svg>
);

export const MailIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
