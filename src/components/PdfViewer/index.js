import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Document} from 'react-pdf';
import Lottie from 'react-lottie';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import * as pdfjs from 'pdfjs-dist/es5/build/pdf';
import { pdfjsworker } from 'pdfjs-dist/es5/build/pdf.worker.entry';

import Example from '../../assets/others/sample.pdf';
import {
  Container,
  ContentContainer,
  TitleContainer,
  IconButton,
  PdfContainer,
  LoadingContainer,
  Subtitle,
  PaginationContainer,
  StyledPage
} from './styles';
import { icons, animations } from '../../assets';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsworker;

export default function PdfViewer({ data, route }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  function onDocumentLoadSuccess({ numPages }) {
    setLoading(false);
    setNumPages(numPages);
  }

  function renderLoader() {
    return (
      <LoadingContainer>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: animations.redLoadingBalls,
          }}
          height={125}
          width={125}
        />
        <Subtitle>Carregando...</Subtitle>
      </LoadingContainer>
    );
  }

  function renderError() {
    return (
      <LoadingContainer error>
        <HiOutlineEmojiSad size={150} color={'#323c47'} />
        <Subtitle style={{ marginTop: 22, color: '#323c47' }}>
          Erro ao carregar pdf...
        </Subtitle>
      </LoadingContainer>
    );
  }
 
  return (
    <Container>
      <ContentContainer>
        <TitleContainer>
          <h1>{data.titulo}</h1>
          <Link
            to={{
              pathname: route,
              state: {
                data,
              },
            }}
          >
            <IconButton>{icons.edit}</IconButton>
          </Link>
        </TitleContainer>
        <PdfContainer>
          <div loading={loading}>
            <Document
              error={renderError}
              loading={renderLoader}
              onLoadSuccess={onDocumentLoadSuccess}
              
              file={{
                url: `https://storage-fluxo.nyc3.digitaloceanspaces.com/laparc/${data.file_name}`,
              }}
            >
              <StyledPage
                pageNumber={pageNumber}
                
              />
            </Document>
          </div>
          {loading === false && (
            <PaginationContainer>
              {pageNumber > 1 && (
                <button onClick={() => setPageNumber(pageNumber - 1)}>
                  <MdKeyboardArrowLeft color={'black'} />
                </button>
              )}
              <p>
                Página {pageNumber} de {numPages}
              </p>
              {pageNumber < numPages && (
                <button onClick={() => setPageNumber(pageNumber + 1)}>
                  <MdKeyboardArrowRight color={'black'} />
                </button>
              )}
            </PaginationContainer>
          )}
        </PdfContainer>
      </ContentContainer>
    </Container>
  );
}
