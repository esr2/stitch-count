import React, { useEffect, useState, useRef, useCallback } from "react";
import { Card, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { ProjectDetails } from "./ProjectDetails";
import "./PatternViewer.scss";

export function PatternViewer(props: { details: ProjectDetails }) {
  const details = props.details;

  const canvasRef = useRef<any>();
  var pdfjsLib = window["pdfjs-dist/build/pdf"];
  // The workerSrc property shall be specified.
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.min.js";

  const [pdfRef, setPdfRef] = useState<any>();
  const [pageRendering, setPageRendering] = useState(false);
  const [pageScale, setPageScale] = useState(1.5);
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const storedPageNum = localStorage.getItem(
      `${details.storageKey}-currentPage`
    );

    return storedPageNum ? parseInt(storedPageNum) : details.pdfStartPage;
  });

  const renderPage = useCallback(
    (pageNum: number, pdf = pdfRef) => {
      pdf &&
        pdf.getPage(pageNum).then(function (page: any) {
          const viewport = page.getViewport({ scale: pageScale });
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
          const pageRenderTask = page.render(renderContext);
          pageRenderTask.promise.then(
            () => {
              setPageRendering(false);
              localStorage.setItem(
                `${details.storageKey}-currentPage`,
                pageNum.toString()
              );
            },
            () => {
              setPageRendering(false);
            }
          );
        });
    },
    [pdfRef, pageScale, details.storageKey]
  );

  useEffect(() => {
    setPageRendering(true);
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
  }, [details.pdfUrl, pdfjsLib]);

  const nextPage = () => {
    if (pageRendering) {
      return;
    }
    if (pdfRef && currentPage < pdfRef.numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (pageRendering) {
      return;
    }
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const zoomIn = () => {
    if (pageScale < 5) {
      setPageScale(pageScale + 0.5);
    }
  };

  const zoomOut = () => {
    if (pageScale > 0.3) {
      setPageScale(pageScale - 0.5);
    }
  };

  return (
    <Card>
      <div className="row align-items-center ">
        <div className="col">
          <Pagination
            className="pagination pagination-lg justify-content-center"
            listClassName="justify-content-center  pagination-lg"
          >
            <PaginationItem>
              <PaginationLink
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  prevPage();
                }}
                tabIndex={-1}
              >
                <i className="fa fa-angle-left" />
                <span className="sr-only">Previous</span>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  nextPage();
                }}
              >
                <i className="fa fa-angle-right" />
                <span className="sr-only">Next</span>
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </div>
        <div className="col">
          <div className="justify-content-center">
            <Pagination
              className="pagination pagination-lg justify-content-center"
              listClassName="justify-content-center  pagination-lg"
            >
              <PaginationItem>
                <PaginationLink
                  href="#pablo"
                  onClick={() => zoomOut()}
                  tabIndex={-1}
                >
                  <i className="fa fa-minus" />
                  <span className="sr-only">Zoom OUt</span>
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#pablo" onClick={() => zoomIn()}>
                  <i className="fa fa-plus" />
                  <span className="sr-only">Zoom In</span>
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef}></canvas>
      <div id="highlight" />
    </Card>
  );
}

export default PatternViewer;
