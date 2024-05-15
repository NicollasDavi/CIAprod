"use client"
import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  const [pageWidth, setPageWidth] = useState(0);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    const calculatePageWidth = () => {
      const tela = window.innerWidth;
      if(tela > 800){
        const desconto = tela * 0.2;
        return tela - desconto;
      }else{
      const desconto = 0 ;
      return tela;
      }
    };

    const updatePageWidth = () => {
      const width = calculatePageWidth();
      setPageWidth(width);
    };

    updatePageWidth();

    window.addEventListener('resize', updatePageWidth);

    return () => {
      window.removeEventListener('resize', updatePageWidth);
    };
  }, []);

  useEffect(() => {
    const loadPDF = async () => {
      try {
        const loadingTask = pdfjs.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        const totalPages = pdf.numPages;
        setNumPages(totalPages);
      } catch (error) {
        console.error('Erro ao carregar o PDF:', error);
      }
    };

    loadPDF();

  }, [pdfUrl]);

  return (
    <>
    {pageWidth < 800 ? 
        <div className='m-0 p-0' style={{ 
            width: '100vw', 
            height: '100vh', 
            margin: 'auto',
          }}>
            <Document file={pdfUrl} className="text-none">
                {Array.from(new Array(numPages), (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageIndex={index}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    width={pageWidth}
                  />
                ))}
            </Document>
          </div>
          : 
          <div className='m-0 p-0' style={{ 
            width: '80vw', 
            height: '100vh', 
            margin: 'auto',
          }}>
            <Document file={pdfUrl} className="text-none">
                {Array.from(new Array(numPages), (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageIndex={index}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    width={pageWidth}
                  />
                ))}
            </Document>
          </div>}
          </>
  );
  
};

export default PDFViewer;
