import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Label = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #f3f3f3;
  margin-bottom: 1rem;
`;

const Spinner = styled.div`
  display: inline-block;
  border: 0.5rem solid #f3f3f3;
  border-top: 0.5rem solid #3498db;
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  animation: ${spinAnimation} 2s linear infinite;
`;

const Loader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

function PleaseWait() {
  return (
    <Loader>
      <Label>Please wait...</Label>
      <Spinner />
    </Loader>
  );
}

export default PleaseWait;