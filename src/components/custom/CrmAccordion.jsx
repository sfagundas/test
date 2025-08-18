import React, { useState, useRef } from 'react';

const CrmAccordion = ({ content }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className="mt-0 mb-0">
      <div className="text-center mx-auto" style={{ width: 'fit-content' }}>
        <button
          onClick={() => setOpen(!open)}
          className="btn btn-link p-0 border-0"
          aria-expanded={open}
          style={{ 
            lineHeight: '1',
            borderRadius: '50%',
            padding: '8px',
            transition: 'background-color 0.2s ease',
            backgroundColor: 'transparent',
            ':hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.05)'
            }
          }}
        >
          {open ? (
            <i className="bi bi-arrow-bar-up fs-3 d-block"></i>
          ) : (
            <i className="bi bi-arrow-bar-down fs-3 d-block"></i>
          )}
        </button>
      </div>
      <div
        ref={contentRef}
        style={{
          maxHeight: open ? `${contentRef.current?.scrollHeight}px` : '0',
          opacity: open ? '1' : '0',
          transition: `
            max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            opacity 0.2s ease
          `,
          overflow: 'hidden'
        }}
        className="bg-light rounded mt-1 p-2"
      >
        <small className="text-muted">{content}</small>
      </div>
    </div>
  );
};

export default React.memo(CrmAccordion);