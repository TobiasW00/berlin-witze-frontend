import React from 'react';
import RichTextEditor from 'react-rte';

function MyStatefulEditor(props){
    return (
      <RichTextEditor
        value={props.value}
        onChange={props.onChange}
      />
    );  
}
export default MyStatefulEditor