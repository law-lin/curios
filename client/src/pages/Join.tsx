import React, { useState } from 'react';
import { Heading, Input, Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import useJoinClass from 'hooks/useJoinClass';

interface Params {
  classId: string;
}
function Join() {
  const { classId } = useParams<Params>();
  const [email, setEmail] = useState('');

  const joinClassMutation = useJoinClass(classId);

  const handleJoin = () => {
    joinClassMutation.mutate();
  };

  return (
    <div>
      <Heading>Join Class {classId}</Heading>
      <Input onChange={(e) => setEmail(e.target.value)} />
      <Button onClick={handleJoin}>Join</Button>
    </div>
  );
}

export default Join;
