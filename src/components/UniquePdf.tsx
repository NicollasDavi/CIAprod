// src/components/PDF.tsx
"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PDFViewerProps {
  pdfUrl: any;
}

const PDF: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  const [width, setWidth] = useState<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth * 2);
      }
    };

    window.addEventListener('resize', updateWidth);
    updateWidth();

    return () => {
      window.removeEventListener('resize', updateWidth);
    }
  }, []);

  useEffect(() => {
    const reloadPage = () => {
      window.location.reload();
    };

    window.addEventListener('resize', reloadPage);

    return () => {
      window.removeEventListener('resize', reloadPage);
    }
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', margin: 'auto' }}>
      <Document file={pdfUrl} className="text-none">
        <Page
          pageNumber={1}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          width={width} // Ajuste a largura conforme necessário
        />
      </Document>
    </div>
  );
};

export default PDF;
