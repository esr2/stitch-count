import React, { useEffect, useState } from "react";
import { Card, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { ProjectDetails } from "./ProjectDetails";
import "./PatternViewer.scss";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export function PatternViewer(props: { details: ProjectDetails }) {
  const details = props.details;

  pdfjs.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

  const [totalPages, setTotalPages] = useState(0);
  const [pageScale, setPageScale] = useState(1.5);
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const storedPageNum = localStorage.getItem(
      `${details.storageKey}-currentPage`
    );

    return storedPageNum ? parseInt(storedPageNum) : details.pdfStartPage;
  });

  useEffect(() => {
    localStorage.setItem(
      `${details.storageKey}-currentPage`,
      currentPage.toString()
    );
  }, [currentPage]);

  const onDocumentLoadSuccess = (props: { numPages: number }) => {
    setTotalPages(props.numPages);
  };

  const onDocumentLoadFailure = (error: any) => {
    window.console.log("failed document load");
    window.console.log(error);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const zoomIn = () => {
    if (pageScale < 10) {
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
      {/* <canvas ref={canvasRef}></canvas> */}
      <Document
        file={details.pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadFailure}
      >
        <Page pageNumber={currentPage} scale={pageScale} />
      </Document>
      <div id="highlight" />
    </Card>
  );
}

export default PatternViewer;
