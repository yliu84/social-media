import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { postComment } from '../../actions/postActions';

const CommentInputField = ({ postId, user, setComments }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const commentSubmitHandle = async (e) => {
    e.preventDefault();
    setLoading(true);
    await postComment(postId, user, text, setComments, setText);

    setLoading(false);
  };

  return (
    <Form reply onSubmit={commentSubmitHandle}>
      <Form.Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Add Comment'
        action={{
          color: 'blue',
          icon: 'edit',
          loading: loading,
          disabled: text === '' || loading,
        }}
      />
    </Form>
  );
};

export default CommentInputField;
