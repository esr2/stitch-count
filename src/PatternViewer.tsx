import React, { useEffect, useState, useRef, useCallback } from "react";
import { ProjectDetails } from "./ProjectDetails";

export function PatternViewer(props: { details: ProjectDetails }) {
  const details = props.details;

  const canvasRef = useRef<any>();
  var pdfjsLib = window["pdfjs-dist/build/pdf"];
  // The workerSrc property shall be specified.
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.min.js";
  var pdfjsViewer = window["pdfjs-dist/web/pdf_viewer"];

  const [pdfRef, setPdfRef] = useState<any>();
  const [currentPage, setCurrentPage] = useState<any>(1);

  const renderPage = useCallback(
    (pageNum: number, pdf = pdfRef) => {
      pdf &&
        pdf.getPage(pageNum).then(function (page: any) {
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = canvasRef.current;
          if (!canvas) {
            window.console.log("No Canvas");
            return;
          }
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: canvas.getContext("2d"),
            viewport: viewport,
          };
          page.render(renderContext);
        });
    },
    [pdfRef]
  );

  useEffect(() => {
    renderPage(currentPage, pdfRef);
  }, [pdfRef, currentPage, renderPage]);

  useEffect(() => {
    const loadingTask = pdfjsLib.getDocument(details.pdfUrl);
    loadingTask.promise.then(
      (loadedPdf: any) => {
        setPdfRef(loadedPdf);
      },
      (reason: any) => {
        window.console.error(reason);
      }
    );
  }, [props.details.pdfUrl]);

  const nextPage = () =>
    pdfRef && currentPage < pdfRef.numPages && setCurrentPage(currentPage + 1);

  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return <canvas ref={canvasRef}></canvas>;
}

export default PatternViewer;
