import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import {HiPencil} from "react-icons/hi"
import { Container, QuestionContainer, AnswerContainer } from './styles';
import { icons } from '../../assets';

export default function QuestionCard({ data, index, language }) {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <Container>
      <QuestionContainer>
        <p>
          <span>{`Q${index + 1}:`}</span> {` ${data[`pergunta_${language}`]}`}
        </p>
        <button
          style={{
            backgroundColor: 'transparent',
            color: '#666666',
            size: '50px',
          }}
        >
          {showAnswer ? (
            <FiChevronUp
              color="#323c47"
              size={24}
              onClick={() => setShowAnswer(!showAnswer)}
            />
          ) : (
            <FiChevronDown
              color="#323c47"
              size={24}
              onClick={() => setShowAnswer(!showAnswer)}
            />
          )}
        </button>
      </QuestionContainer>
      {showAnswer && (
        <AnswerContainer>
          <p>
            <span>R:</span> {` ${data[`resposta_${language}`]}`}
          </p>
          <button>
            <Link
              style={{
                textDecoration: 'none',
              }}
              to={{
                pathname: "/editar-pergunta",
                state: {
                  data,
                },
              }}
            >
              <HiPencil
                color="black"
                opacity={0.24}
              />
            </Link>
          </button>
        </AnswerContainer>
      )}
    </Container>
  );
}
